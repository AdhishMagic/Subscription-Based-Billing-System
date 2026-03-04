const BaseRepository = require('./BaseRepository');
const { Invoice } = require('../models');

class InvoiceRepository extends BaseRepository {
    constructor() {
        super(Invoice);
    }

    async findByNumber(invoiceNumber) {
        return this.model.findOne({ invoiceNumber }).lean();
    }

    async findByCustomer(customerId, options = {}) {
        return this.findAll({ customerId }, options);
    }

    async findByStatus(status, options = {}) {
        return this.findAll({ status }, options);
    }

    async search(query, filter = {}, options = {}) {
        const searchFilter = { ...filter };
        if (query) {
            searchFilter.$or = [
                { invoiceNumber: { $regex: query, $options: 'i' } },
                { customerName: { $regex: query, $options: 'i' } },
            ];
        }
        return this.findAll(searchFilter, options);
    }

    async getNextNumber() {
        const last = await this.model
            .findOne({}, { invoiceNumber: 1 })
            .sort({ createdAt: -1 })
            .lean();

        if (!last || !last.invoiceNumber) return 'INV-2025-0001';
        const num = parseInt(last.invoiceNumber.split('-').pop(), 10);
        return `INV-2025-${String(num + 1).padStart(4, '0')}`;
    }
}

module.exports = new InvoiceRepository();
