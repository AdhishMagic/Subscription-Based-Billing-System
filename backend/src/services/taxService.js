const { taxRepository } = require('../repositories');
const AppError = require('../utils/AppError');

class TaxService {
    async getAll(query = {}) {
        const { status, page, limit, sort } = query;
        const filter = {};
        if (status) filter.status = status;

        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        return taxRepository.findAll(filter, options);
    }

    async getById(id) {
        const tax = await taxRepository.findById(id);
        if (!tax) throw AppError.notFound('Tax not found');
        return tax;
    }

    async create(data) {
        return taxRepository.create(data);
    }

    async update(id, data) {
        const tax = await taxRepository.updateById(id, data);
        if (!tax) throw AppError.notFound('Tax not found');
        return tax;
    }

    async delete(id) {
        const tax = await taxRepository.deleteById(id);
        if (!tax) throw AppError.notFound('Tax not found');
        return tax;
    }
}

module.exports = new TaxService();
