const { subscriptionRepository, invoiceRepository, paymentRepository } = require('../repositories');
const { SUBSCRIPTION_STATUS, INVOICE_STATUS, PAYMENT_STATUS } = require('../utils/constants');

class ReportService {
    async getDashboardStats() {
        const [
            activeSubscriptions,
            totalSubscriptions,
            statusCounts,
        ] = await Promise.all([
            subscriptionRepository.count({ status: SUBSCRIPTION_STATUS.ACTIVE }),
            subscriptionRepository.count(),
            subscriptionRepository.getStatusCounts(),
        ]);

        const invoices = await invoiceRepository.findAll({}, { limit: 1000 });
        const payments = await paymentRepository.findAll(
            { status: PAYMENT_STATUS.COMPLETED },
            { limit: 10000 }
        );

        const totalRevenue = payments.docs.reduce((sum, p) => sum + p.amount, 0);
        const overdueInvoices = await invoiceRepository.count({
            status: INVOICE_STATUS.OVERDUE,
        });

        return {
            activeSubscriptions,
            totalSubscriptions,
            totalRevenue,
            overdueInvoices,
            statusCounts,
        };
    }

    async getRevenueReport(query = {}) {
        const payments = await paymentRepository.findAll(
            { status: PAYMENT_STATUS.COMPLETED },
            { limit: 10000, sort: { date: 1 } }
        );

        // Group by month
        const monthly = {};
        payments.docs.forEach((p) => {
            const key = new Date(p.date).toISOString().slice(0, 7); // YYYY-MM
            monthly[key] = (monthly[key] || 0) + p.amount;
        });

        return Object.entries(monthly).map(([month, revenue]) => ({
            month,
            revenue,
        }));
    }

    async getSubscriptionReport() {
        return subscriptionRepository.getStatusCounts();
    }
}

module.exports = new ReportService();
