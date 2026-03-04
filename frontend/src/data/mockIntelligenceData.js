export const mockNotifications = [
    {
        id: 'NOT-0001',
        type: 'SUCCESS',
        module: 'Subscription',
        title: 'Subscription Activated',
        message: 'Subscription SUB-2025-0042 is now active.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        isRead: false,
        link: '/subscriptions' // In real app, /subscriptions/SUB-2025-0042
    },
    {
        id: 'NOT-0002',
        type: 'DANGER',
        module: 'Invoice',
        title: 'Invoice Overdue',
        message: 'Invoice INV-0045 is overdue by 3 days.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        isRead: false,
        link: '/invoices'
    },
    {
        id: 'NOT-0003',
        type: 'INFO',
        module: 'Payment',
        title: 'Payment Received',
        message: 'Payment of $1,250.00 received for INV-0042.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        isRead: true,
        link: '/payments'
    },
    {
        id: 'NOT-0004',
        type: 'WARNING',
        module: 'Discount',
        title: 'Discount Expiring',
        message: 'Summer Promo (20% OFF) expires in 2 days.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        isRead: true,
        link: '/discounts'
    }
];

export const mockSearchIndex = {
    Subscriptions: [
        { id: 'SUB-2025-0042', label: 'Pro Plan - John Corp', status: 'Active', path: '/subscriptions' },
        { id: 'SUB-2025-0089', label: 'Enterprise - Tech Solutions', status: 'Trial', path: '/subscriptions' },
    ],
    Invoices: [
        { id: 'INV-2025-0009', label: 'Invoice for March ($500.00)', status: 'Paid', path: '/invoices' },
        { id: 'INV-0045', label: 'Invoice for February ($1,250.00)', status: 'Overdue', path: '/invoices' },
    ],
    Customers: [
        { id: 'CUS-1021', label: 'John Corp', status: 'Active', path: '/customers' },
        { id: 'CUS-1045', label: 'Tech Solutions LLC', status: 'Active', path: '/customers' },
    ],
    Products: [
        { id: 'PRD-001', label: 'Pro Workspace Seat', status: 'Active', path: '/products' },
        { id: 'PRD-002', label: 'Cloud Storage 1TB', status: 'Active', path: '/products' },
    ]
};

export const mockDefaultCommands = [
    { id: 'CMD-001', label: 'Create Subscription', group: 'Quick Actions', icon: 'Plus', action: 'NAVIGATE', path: '/subscriptions/new' },
    { id: 'CMD-002', label: 'Create Invoice', group: 'Quick Actions', icon: 'DocumentText', action: 'NAVIGATE', path: '/invoices/new' },
    { id: 'CMD-003', label: 'View Reports', group: 'Navigation', icon: 'ChartBar', action: 'NAVIGATE', path: '/reports' },
    { id: 'CMD-004', label: 'Go to Products', group: 'Navigation', icon: 'Cube', action: 'NAVIGATE', path: '/products' },
    { id: 'CMD-005', label: 'Switch Theme', group: 'System', icon: 'Moon', action: 'TOGGLE_THEME' },
];

export const mockActivityTimeline = [
    {
        id: 'ACT-001',
        type: 'SUCCESS',
        module: 'Subscription',
        action: 'Subscription Created',
        actor: 'Admin',
        details: 'Created Subscription SUB-2025-0042 for John Corp.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
        id: 'ACT-002',
        type: 'INFO',
        module: 'Payment',
        action: 'Payment Processed',
        actor: 'System',
        details: 'Auto-charged $1,250.00 for Invoice INV-0042.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
        id: 'ACT-003',
        type: 'DANGER',
        module: 'Invoice',
        action: 'Invoice Overdue',
        actor: 'System',
        details: 'Invoice INV-0045 marked as Overdue.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
        id: 'ACT-004',
        type: 'WARNING',
        module: 'Discount',
        action: 'Discount Created',
        actor: 'Admin',
        details: 'Created Summer Promo (20% OFF) discount.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    }
];
