const BaseRepository = require('./BaseRepository');
const { Discount } = require('../models');

class DiscountRepository extends BaseRepository {
    constructor() {
        super(Discount);
    }

    async findActive(options = {}) {
        return this.findAll({ status: 'active' }, options);
    }
}

module.exports = new DiscountRepository();
