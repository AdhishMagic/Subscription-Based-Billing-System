const BaseRepository = require('./BaseRepository');
const { Customer } = require('../models');

class CustomerRepository extends BaseRepository {
    constructor() {
        super(Customer);
    }

    async findByEmail(email) {
        return this.model.findOne({ email }).lean();
    }

    async search(query, options = {}) {
        const filter = query
            ? { name: { $regex: query, $options: 'i' } }
            : {};
        return this.findAll(filter, options);
    }
}

module.exports = new CustomerRepository();
