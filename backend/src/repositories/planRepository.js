const BaseRepository = require('./BaseRepository');
const { Plan } = require('../models');

class PlanRepository extends BaseRepository {
    constructor() {
        super(Plan);
    }

    async search(query, options = {}) {
        const filter = query
            ? { name: { $regex: query, $options: 'i' } }
            : {};
        return this.findAll(filter, options);
    }

    async findByBillingPeriod(period, options = {}) {
        return this.findAll({ billingPeriod: period }, options);
    }
}

module.exports = new PlanRepository();
