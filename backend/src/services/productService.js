const { productRepository } = require('../repositories');
const AppError = require('../utils/AppError');

class ProductService {
    async getAll(query = {}) {
        const { search, type, page, limit, sort } = query;
        const filter = {};
        if (type) filter.type = type;
        if (search) filter.name = { $regex: search, $options: 'i' };

        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        return productRepository.findAll(filter, options);
    }

    async getById(id) {
        const product = await productRepository.findById(id);
        if (!product) throw AppError.notFound('Product not found');
        return product;
    }

    async create(data) {
        return productRepository.create(data);
    }

    async update(id, data) {
        const product = await productRepository.updateById(id, data);
        if (!product) throw AppError.notFound('Product not found');
        return product;
    }

    async delete(id) {
        const product = await productRepository.deleteById(id);
        if (!product) throw AppError.notFound('Product not found');
        return product;
    }
}

module.exports = new ProductService();
