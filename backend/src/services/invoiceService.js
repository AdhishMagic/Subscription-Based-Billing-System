const { invoiceRepository } = require('../repositories');
const AppError = require('../utils/AppError');
const { INVOICE_STATUS } = require('../utils/constants');

class InvoiceService {
    async getAll(query = {}) {
        const { search, status, page, limit, sort } = query;
        const filter = {};
        if (status) filter.status = status;

        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        return invoiceRepository.search(search, filter, options);
    }

    async getById(id) {
        const invoice = await invoiceRepository.findById(id);
        if (!invoice) throw AppError.notFound('Invoice not found');
        return invoice;
    }

    async create(data) {
        const invoiceNumber = await invoiceRepository.getNextNumber();
        return invoiceRepository.create({
            ...data,
            invoiceNumber,
            status: data.status || INVOICE_STATUS.DRAFT,
        });
    }

    async update(id, data) {
        const invoice = await invoiceRepository.updateById(id, data);
        if (!invoice) throw AppError.notFound('Invoice not found');
        return invoice;
    }

    async delete(id) {
        const invoice = await invoiceRepository.deleteById(id);
        if (!invoice) throw AppError.notFound('Invoice not found');
        return invoice;
    }

    async markPaid(id) {
        const invoice = await invoiceRepository.updateById(id, {
            status: INVOICE_STATUS.PAID,
        });
        if (!invoice) throw AppError.notFound('Invoice not found');
        return invoice;
    }

    async send(id) {
        const invoice = await invoiceRepository.findById(id);
        if (!invoice) throw AppError.notFound('Invoice not found');
        // In production: integrate with email service
        return invoiceRepository.updateById(id, {
            status: INVOICE_STATUS.SENT,
        });
    }
}

module.exports = new InvoiceService();
