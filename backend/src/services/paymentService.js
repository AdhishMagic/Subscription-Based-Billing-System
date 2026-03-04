const { paymentRepository, invoiceRepository } = require('../repositories');
const AppError = require('../utils/AppError');
const { PAYMENT_STATUS, INVOICE_STATUS } = require('../utils/constants');

class PaymentService {
    async getAll(query = {}) {
        const { status, page, limit, sort } = query;
        const filter = {};
        if (status) filter.status = status;

        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        return paymentRepository.findAll(filter, options);
    }

    async getById(id) {
        const payment = await paymentRepository.findById(id);
        if (!payment) throw AppError.notFound('Payment not found');
        return payment;
    }

    async create(data) {
        const payment = await paymentRepository.create({
            ...data,
            status: data.status || PAYMENT_STATUS.COMPLETED,
            date: data.date || new Date(),
            reference: data.reference || `REF-${Date.now()}`,
        });

        // Update invoice status based on payments
        if (data.invoiceId && payment.status === PAYMENT_STATUS.COMPLETED) {
            await this._reconcileInvoice(data.invoiceId);
        }

        return payment;
    }

    async refund(id) {
        const payment = await paymentRepository.findById(id);
        if (!payment) throw AppError.notFound('Payment not found');
        if (payment.status !== PAYMENT_STATUS.COMPLETED) {
            throw AppError.badRequest('Only completed payments can be refunded');
        }

        const refunded = await paymentRepository.updateById(id, {
            status: PAYMENT_STATUS.REFUNDED,
        });

        // Reconcile invoice after refund
        if (payment.invoiceId) {
            await this._reconcileInvoice(payment.invoiceId);
        }

        return refunded;
    }

    async _reconcileInvoice(invoiceId) {
        const invoice = await invoiceRepository.findById(invoiceId);
        if (!invoice) return;

        const payments = await paymentRepository.findByInvoice(invoiceId);
        const totalPaid = payments
            .filter((p) => p.status === PAYMENT_STATUS.COMPLETED)
            .reduce((sum, p) => sum + p.amount, 0);

        let newStatus = invoice.status;
        if (totalPaid >= invoice.total) {
            newStatus = INVOICE_STATUS.PAID;
        } else if (totalPaid > 0) {
            newStatus = INVOICE_STATUS.PARTIALLY_PAID;
        }

        if (newStatus !== invoice.status) {
            await invoiceRepository.updateById(invoiceId, { status: newStatus });
        }
    }
}

module.exports = new PaymentService();
