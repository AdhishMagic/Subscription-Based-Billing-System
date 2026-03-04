const BaseRepository = require('./BaseRepository');
const { Payment } = require('../models');

class PaymentRepository extends BaseRepository {
    constructor() {
        super(Payment);
    }

    async findByInvoice(invoiceId) {
        return this.model.find({ invoiceId }).lean();
    }

    async findByCustomer(customerId, options = {}) {
        return this.findAll({ customerId }, options);
    }

    async getCompletedTotalForInvoice(invoiceId) {
        const result = await this.model.aggregate([
            { $match: { invoiceId, status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);
        return result.length > 0 ? result[0].total : 0;
    }
}

module.exports = new PaymentRepository();
