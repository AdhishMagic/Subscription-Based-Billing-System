const BaseRepository = require('./BaseRepository');
const { Product } = require('../models');

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }

    async search(query, options = {}) {
        const filter = query
            ? { name: { $regex: query, $options: 'i' } }
            : {};
        return this.findAll(filter, options);
    }

    async findByType(type, options = {}) {
        return this.findAll({ type }, options);
    }
}

module.exports = new ProductRepository();
