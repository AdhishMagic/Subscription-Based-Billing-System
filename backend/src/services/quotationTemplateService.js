const { quotationTemplateRepository } = require('../repositories');
const AppError = require('../utils/AppError');

class QuotationTemplateService {
    async getAll(query = {}) {
        const { search, page, limit, sort } = query;
        const filter = {};
        if (search) filter.name = { $regex: search, $options: 'i' };

        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        return quotationTemplateRepository.findAll(filter, options);
    }

    async getById(id) {
        const template = await quotationTemplateRepository.findById(id);
        if (!template) throw AppError.notFound('Template not found');
        return template;
    }

    async create(data) {
        return quotationTemplateRepository.create(data);
    }

    async update(id, data) {
        const template = await quotationTemplateRepository.updateById(id, data);
        if (!template) throw AppError.notFound('Template not found');
        return template;
    }

    async delete(id) {
        const template = await quotationTemplateRepository.deleteById(id);
        if (!template) throw AppError.notFound('Template not found');
        return template;
    }
}

module.exports = new QuotationTemplateService();
