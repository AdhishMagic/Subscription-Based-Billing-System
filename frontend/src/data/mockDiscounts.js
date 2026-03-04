export const mockDiscounts = [
    {
        id: 'DISC-1001',
        name: 'Spring Promo 2025',
        type: 'percentage', // 'percentage' | 'fixed'
        value: 15,
        minPurchaseAmount: 500,
        minQuantity: 0,
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        usageLimit: 100,
        usageCount: 45,
        appliesTo: ['subscriptions'], // 'products' and/or 'subscriptions'
        status: 'active', // 'active', 'scheduled', 'expired', 'limit_reached'
    },
    {
        id: 'DISC-1002',
        name: 'Welcome Bonus',
        type: 'fixed',
        value: 50,
        minPurchaseAmount: 100,
        minQuantity: 1,
        startDate: '2024-01-01',
        endDate: '2028-12-31',
        usageLimit: null, // Unlimited
        usageCount: 1200,
        appliesTo: ['products', 'subscriptions'],
        status: 'active',
    },
    {
        id: 'DISC-1003',
        name: 'Black Friday 2026',
        type: 'percentage',
        value: 30,
        minPurchaseAmount: 0,
        minQuantity: 0,
        startDate: '2026-11-20',
        endDate: '2026-11-30',
        usageLimit: 500,
        usageCount: 0,
        appliesTo: ['products'],
        status: 'scheduled',
    },
    {
        id: 'DISC-1004',
        name: 'Flash Sale (Internal)',
        type: 'fixed',
        value: 15,
        minPurchaseAmount: 50,
        minQuantity: 2,
        startDate: '2023-05-01',
        endDate: '2023-05-02',
        usageLimit: 50,
        usageCount: 50,
        appliesTo: ['products'],
        status: 'limit_reached',
    }
];
