const BaseRepository = require('./BaseRepository');
const { Subscription } = require('../models');

class SubscriptionRepository extends BaseRepository {
    constructor() {
        super(Subscription);
    }

    async findByNumber(subscriptionNumber) {
        return this.model.findOne({ subscriptionNumber }).lean();
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
                { subscriptionNumber: { $regex: query, $options: 'i' } },
                { customerName: { $regex: query, $options: 'i' } },
                { planName: { $regex: query, $options: 'i' } },
            ];
        }
        return this.findAll(searchFilter, options);
    }

    async getStatusCounts() {
        const counts = await this.model.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        return counts.reduce((acc, { _id, count }) => {
            acc[_id] = count;
            return acc;
        }, {});
    }

    async getNextNumber() {
        const last = await this.model
            .findOne({}, { subscriptionNumber: 1 })
            .sort({ createdAt: -1 })
            .lean();

        if (!last || !last.subscriptionNumber) return 'SUB-2025-0001';
        const num = parseInt(last.subscriptionNumber.split('-').pop(), 10);
        return `SUB-2025-${String(num + 1).padStart(4, '0')}`;
    }
}

module.exports = new SubscriptionRepository();
