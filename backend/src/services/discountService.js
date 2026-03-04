const { discountRepository } = require('../repositories');
const AppError = require('../utils/AppError');

class DiscountService {
    async getAll(query = {}) {
        const { status, page, limit, sort } = query;
        const filter = {};
        if (status) filter.status = status;

        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        return discountRepository.findAll(filter, options);
    }

    async getById(id) {
        const discount = await discountRepository.findById(id);
        if (!discount) throw AppError.notFound('Discount not found');
        return discount;
    }

    async create(data) {
        return discountRepository.create(data);
    }

    async update(id, data) {
        const discount = await discountRepository.updateById(id, data);
        if (!discount) throw AppError.notFound('Discount not found');
        return discount;
    }

    async delete(id) {
        const discount = await discountRepository.deleteById(id);
        if (!discount) throw AppError.notFound('Discount not found');
        return discount;
    }
}

module.exports = new DiscountService();
