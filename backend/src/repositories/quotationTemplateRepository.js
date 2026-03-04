const BaseRepository = require('./BaseRepository');
const { QuotationTemplate } = require('../models');

class QuotationTemplateRepository extends BaseRepository {
    constructor() {
        super(QuotationTemplate);
    }

    async search(query, options = {}) {
        const filter = query
            ? { name: { $regex: query, $options: 'i' } }
            : {};
        return this.findAll(filter, options);
    }
}

module.exports = new QuotationTemplateRepository();
