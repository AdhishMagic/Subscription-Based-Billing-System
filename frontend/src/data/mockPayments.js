export const mockPayments = [
    {
        id: 'PAY-0001',
        invoiceId: 'INV-2025-0047',
        customerId: 'cust_003',
        customerName: 'Initech',
        method: 'Credit Card',
        amount: 550,
        date: '2025-02-10',
        status: 'Completed',
        reference: 'TXN-987654'
    },
    {
        id: 'PAY-0002',
        invoiceId: 'INV-2025-0046',
        customerId: 'cust_002',
        customerName: 'Globex Inc',
        method: 'Bank Transfer',
        amount: 500,
        date: '2025-02-28',
        status: 'Pending',
        reference: 'WIREQ-10023'
    },
    {
        id: 'PAY-0003',
        invoiceId: 'INV-2025-0048',
        customerId: 'cust_004',
        customerName: 'Stark Industries',
        method: 'Crypto',
        amount: 25000,
        date: '2025-03-01',
        status: 'Completed',
        reference: 'ETH-TX-9988'
    },
    {
        id: 'PAY-0004',
        invoiceId: 'INV-2025-0048',
        customerId: 'cust_004',
        customerName: 'Stark Industries',
        method: 'Credit Card',
        amount: 15000,
        date: '2025-03-05',
        status: 'Failed',
        reference: 'ERR-INSUFF-FUNDS'
    }
];
