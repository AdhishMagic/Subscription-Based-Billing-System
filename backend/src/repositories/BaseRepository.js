const { PAGINATION } = require('../utils/constants');

/**
 * Base Repository encapsulates common Mongoose CRUD operations.
 * Domain repositories extend this to add specific queries.
 */
class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll(filter = {}, options = {}) {
        const {
            page = PAGINATION.DEFAULT_PAGE,
            limit = PAGINATION.DEFAULT_LIMIT,
            sort = { createdAt: -1 },
            select = '',
            populate = '',
        } = options;

        const skip = (page - 1) * limit;
        const [docs, total] = await Promise.all([
            this.model
                .find(filter)
                .select(select)
                .populate(populate)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean(),
            this.model.countDocuments(filter),
        ]);

        return { docs, total, page, limit };
    }

    async findById(id, options = {}) {
        const { select = '', populate = '' } = options;
        return this.model.findById(id).select(select).populate(populate).lean();
    }

    async findOne(filter, options = {}) {
        const { select = '', populate = '' } = options;
        return this.model.findOne(filter).select(select).populate(populate);
    }

    async create(data) {
        const doc = await this.model.create(data);
        return doc.toObject();
    }

    async updateById(id, data) {
        return this.model
            .findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .lean();
    }

    async deleteById(id) {
        return this.model.findByIdAndDelete(id).lean();
    }

    async count(filter = {}) {
        return this.model.countDocuments(filter);
    }
}

module.exports = BaseRepository;
