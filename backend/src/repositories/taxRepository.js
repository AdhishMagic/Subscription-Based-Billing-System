const BaseRepository = require('./BaseRepository');
const { Tax } = require('../models');

class TaxRepository extends BaseRepository {
    constructor() {
        super(Tax);
    }

    async findActive(options = {}) {
        return this.findAll({ status: 'active' }, options);
    }
}

module.exports = new TaxRepository();
