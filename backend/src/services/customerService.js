const { customerRepository } = require('../repositories');
const AppError = require('../utils/AppError');

class CustomerService {
    async getAll(query = {}) {
        const { search, page, limit, sort } = query;
        const filter = {};
        if (search) filter.name = { $regex: search, $options: 'i' };

        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        return customerRepository.findAll(filter, options);
    }

    async getById(id) {
        const customer = await customerRepository.findById(id);
        if (!customer) throw AppError.notFound('Customer not found');
        return customer;
    }

    async create(data) {
        return customerRepository.create(data);
    }

    async update(id, data) {
        const customer = await customerRepository.updateById(id, data);
        if (!customer) throw AppError.notFound('Customer not found');
        return customer;
    }

    async delete(id) {
        const customer = await customerRepository.deleteById(id);
        if (!customer) throw AppError.notFound('Customer not found');
        return customer;
    }
}

module.exports = new CustomerService();
