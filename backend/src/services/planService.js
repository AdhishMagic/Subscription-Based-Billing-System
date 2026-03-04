const { planRepository } = require('../repositories');
const AppError = require('../utils/AppError');

class PlanService {
    async getAll(query = {}) {
        const { search, billingPeriod, status, page, limit, sort } = query;
        const filter = {};
        if (billingPeriod) filter.billingPeriod = billingPeriod;
        if (search) filter.name = { $regex: search, $options: 'i' };

        // Status is virtual, so we handle it post-query if needed
        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        const result = await planRepository.findAll(filter, options);

        // Filter by virtual status if requested
        if (status) {
            const now = new Date();
            result.docs = result.docs.filter((plan) => {
                const planStatus = !plan.endDate
                    ? 'active'
                    : new Date(plan.endDate) >= now
                        ? 'active'
                        : 'expired';
                return planStatus === status;
            });
            result.total = result.docs.length;
        }

        return result;
    }

    async getById(id) {
        const plan = await planRepository.findById(id);
        if (!plan) throw AppError.notFound('Plan not found');
        return plan;
    }

    async create(data) {
        return planRepository.create(data);
    }

    async update(id, data) {
        const plan = await planRepository.updateById(id, data);
        if (!plan) throw AppError.notFound('Plan not found');
        return plan;
    }

    async delete(id) {
        const plan = await planRepository.deleteById(id);
        if (!plan) throw AppError.notFound('Plan not found');
        return plan;
    }
}

module.exports = new PlanService();
