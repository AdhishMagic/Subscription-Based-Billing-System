const { subscriptionRepository } = require('../repositories');
const AppError = require('../utils/AppError');
const { STATUS_FLOW, SUBSCRIPTION_STATUS } = require('../utils/constants');

class SubscriptionService {
    async getAll(query = {}) {
        const { search, status, page, limit, sort } = query;
        const filter = {};
        if (status) filter.status = status;

        const options = { page, limit };
        if (sort) {
            const [field, dir] = sort.split(':');
            options.sort = { [field]: dir === 'desc' ? -1 : 1 };
        }

        return subscriptionRepository.search(search, filter, options);
    }

    async getById(id) {
        const sub = await subscriptionRepository.findById(id);
        if (!sub) throw AppError.notFound('Subscription not found');
        return sub;
    }

    async create(data, userName = 'System') {
        const subscriptionNumber = await subscriptionRepository.getNextNumber();
        const subscription = await subscriptionRepository.create({
            ...data,
            subscriptionNumber,
            status: SUBSCRIPTION_STATUS.DRAFT,
            activity: [
                {
                    action: 'Subscription created',
                    user: userName,
                    timestamp: new Date(),
                },
            ],
        });
        return subscription;
    }

    async update(id, data) {
        const subscription = await subscriptionRepository.updateById(id, data);
        if (!subscription) throw AppError.notFound('Subscription not found');
        return subscription;
    }

    async delete(id) {
        const subscription = await subscriptionRepository.deleteById(id);
        if (!subscription) throw AppError.notFound('Subscription not found');
        return subscription;
    }

    async transitionStatus(id, userName = 'System') {
        const subscription = await subscriptionRepository.findById(id);
        if (!subscription) throw AppError.notFound('Subscription not found');

        const currentIndex = STATUS_FLOW.indexOf(subscription.status);
        if (currentIndex === -1 || currentIndex >= STATUS_FLOW.length - 1) {
            throw AppError.badRequest(
                `Cannot transition from "${subscription.status}" — already at final status`
            );
        }

        const nextStatus = STATUS_FLOW[currentIndex + 1];
        const actionLabels = {
            quotation: 'Converted to quotation',
            confirmed: 'Quotation confirmed',
            active: 'Subscription activated',
            closed: 'Subscription closed',
        };

        const activity = [
            ...(subscription.activity || []),
            {
                action: actionLabels[nextStatus] || `Status changed to ${nextStatus}`,
                user: userName,
                timestamp: new Date(),
            },
        ];

        return subscriptionRepository.updateById(id, {
            status: nextStatus,
            activity,
        });
    }

    async pause(id, userName = 'System') {
        const subscription = await subscriptionRepository.findById(id);
        if (!subscription) throw AppError.notFound('Subscription not found');
        if (subscription.status !== SUBSCRIPTION_STATUS.ACTIVE) {
            throw AppError.badRequest('Only active subscriptions can be paused');
        }

        const activity = [
            ...(subscription.activity || []),
            { action: 'Subscription paused', user: userName, timestamp: new Date() },
        ];

        return subscriptionRepository.updateById(id, {
            status: 'paused',
            activity,
        });
    }

    async resume(id, userName = 'System') {
        const subscription = await subscriptionRepository.findById(id);
        if (!subscription) throw AppError.notFound('Subscription not found');
        if (subscription.status !== 'paused') {
            throw AppError.badRequest('Only paused subscriptions can be resumed');
        }

        const activity = [
            ...(subscription.activity || []),
            { action: 'Subscription resumed', user: userName, timestamp: new Date() },
        ];

        return subscriptionRepository.updateById(id, {
            status: SUBSCRIPTION_STATUS.ACTIVE,
            activity,
        });
    }

    async cancel(id, userName = 'System') {
        const subscription = await subscriptionRepository.findById(id);
        if (!subscription) throw AppError.notFound('Subscription not found');

        const activity = [
            ...(subscription.activity || []),
            { action: 'Subscription cancelled', user: userName, timestamp: new Date() },
        ];

        return subscriptionRepository.updateById(id, {
            status: SUBSCRIPTION_STATUS.CLOSED,
            activity,
        });
    }

    async getStatusCounts() {
        return subscriptionRepository.getStatusCounts();
    }
}

module.exports = new SubscriptionService();
