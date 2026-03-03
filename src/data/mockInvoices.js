import { round, calculateTax } from '../utils/math';

export const mockInvoices = [
    {
        id: 'INV-2025-0045',
        customerId: 'cust_001',
        customerName: 'Acme Corp',
        customerEmail: 'billing@acmecorp.com',
        customerAddress: '123 Business Rd, Tech City, TC 90210',
        issueDate: '2025-03-01',
        dueDate: '2025-03-15',
        status: 'draft',
        currency: 'USD',
        taxRate: 10,
        lines: [
            { id: 'line_1', description: 'Cloud Hosting - Enterprise Plan', quantity: 1, unitPrice: 2000 },
            { id: 'line_2', description: 'Dedicated Support (March)', quantity: 1, unitPrice: 500 }
        ],
        get subtotal() {
            return round(this.lines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0));
        },
        get taxAmount() {
            return calculateTax(this.subtotal, this.taxRate);
        },
        get total() {
            return round(this.subtotal + this.taxAmount);
        },
        paymentHistory: []
    },
    {
        id: 'INV-2025-0046',
        customerId: 'cust_002',
        customerName: 'Globex Inc',
        customerEmail: 'finance@globex.com',
        customerAddress: '456 Global Ave, World City, WC 10001',
        issueDate: '2025-02-15',
        dueDate: '2025-03-01',
        status: 'overdue',
        currency: 'USD',
        taxRate: 5,
        lines: [
            { id: 'line_1', description: 'Data Analytics Tool - Pro', quantity: 5, unitPrice: 100 },
            { id: 'line_2', description: 'API Access', quantity: 1, unitPrice: 1000 }
        ],
        get subtotal() {
            return round(this.lines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0));
        },
        get taxAmount() {
            return calculateTax(this.subtotal, this.taxRate);
        },
        get total() {
            return round(this.subtotal + this.taxAmount);
        },
        paymentHistory: []
    },
    {
        id: 'INV-2025-0047',
        customerId: 'cust_003',
        customerName: 'Initech',
        customerEmail: 'accounts@initech.dev',
        customerAddress: '789 Innovation Dr, Silicon Valley, CA 94000',
        issueDate: '2025-02-01',
        dueDate: '2025-02-15',
        status: 'paid',
        currency: 'USD',
        taxRate: 10,
        lines: [
            { id: 'line_1', description: 'Software License - Teams', quantity: 10, unitPrice: 50 }
        ],
        get subtotal() {
            return round(this.lines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0));
        },
        get taxAmount() {
            return calculateTax(this.subtotal, this.taxRate);
        },
        get total() {
            return round(this.subtotal + this.taxAmount);
        },
        paymentHistory: [
            { id: 'pay_1', date: '2025-02-10', method: 'Credit Card', amount: 550, reference: 'TXN-987654' }
        ]
    },
    {
        id: 'INV-2025-0048',
        customerId: 'cust_004',
        customerName: 'Stark Industries',
        customerEmail: 'tony@stark.com',
        customerAddress: '10880 Malibu Point, Malibu, CA 90265',
        issueDate: '2025-03-05',
        dueDate: '2025-03-20',
        status: 'confirmed',
        currency: 'USD',
        taxRate: 0,
        lines: [
            { id: 'line_1', description: 'AI Defense System Setup', quantity: 1, unitPrice: 100000 }
        ],
        get subtotal() {
            return round(this.lines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0));
        },
        get taxAmount() {
            return calculateTax(this.subtotal, this.taxRate);
        },
        get total() {
            return round(this.subtotal + this.taxAmount);
        },
        paymentHistory: []
    }
];
