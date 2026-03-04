/**
 * Database Seed Script
 * Seeds all collections with realistic data derived from the frontend mock data.
 * Run: npm run seed
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const {
    User,
    Product,
    Plan,
    Customer,
    Subscription,
    Invoice,
    Payment,
    Discount,
    Tax,
    QuotationTemplate,
} = require('../models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/subbill';

// ─── Seed Data ──────────────────────────────────────────────────────────────

const users = [
    {
        name: 'Admin User',
        email: 'admin@subbill.dev',
        password: 'Admin@123!',
        role: 'admin',
    },
    {
        name: 'Internal User',
        email: 'internal@subbill.dev',
        password: 'Internal@123!',
        role: 'internal',
    },
    {
        name: 'Portal User',
        email: 'portal@subbill.dev',
        password: 'Portal@123!',
        role: 'portal',
    },
];

const customers = [
    { name: 'John Enterprises', email: 'john@enterprises.com' },
    { name: 'Acme Corporation', email: 'billing@acmecorp.com', address: '123 Business Rd, Tech City, TC 90210' },
    { name: 'TechNova Solutions', email: 'finance@technova.io' },
    { name: 'GlobalSync Ltd', email: 'accounts@globalsync.com' },
    { name: 'Pinnacle Digital', email: 'admin@pinnacledigital.co' },
    { name: 'Vertex Industries', email: 'billing@vertexind.com' },
    { name: 'CloudBridge Inc', email: 'ops@cloudbridge.io' },
    { name: 'NorthStar Media', email: 'finance@northstarmedia.com' },
    { name: 'Orion Dynamics', email: 'accounts@oriondyn.com' },
    { name: 'BlueShift Analytics', email: 'admin@blueshift.ai' },
];

const products = [
    { name: 'ViaTunnel Pro Suite', type: 'saas', salesPrice: 299.99, costPrice: 89, isRecurring: true, variants: [{ attribute: 'Plan', value: 'Starter', extraPrice: 0 }, { attribute: 'Plan', value: 'Business', extraPrice: 200 }, { attribute: 'Plan', value: 'Enterprise', extraPrice: 500 }] },
    { name: 'Cloud Storage Unlimited', type: 'saas', salesPrice: 49.99, costPrice: 12.5, isRecurring: true, variants: [{ attribute: 'Storage', value: '100 GB', extraPrice: 0 }, { attribute: 'Storage', value: '500 GB', extraPrice: 25 }, { attribute: 'Storage', value: '2 TB', extraPrice: 80 }] },
    { name: 'API Gateway License', type: 'license', salesPrice: 1499, costPrice: 420, isRecurring: false, variants: [] },
    { name: 'Premium Support Package', type: 'service', salesPrice: 199, costPrice: 65, isRecurring: true, variants: [{ attribute: 'Tier', value: 'Standard', extraPrice: 0 }, { attribute: 'Tier', value: 'Priority', extraPrice: 150 }] },
    { name: 'SSL Certificate', type: 'addon', salesPrice: 79, costPrice: 18, isRecurring: true, variants: [{ attribute: 'Type', value: 'Standard', extraPrice: 0 }, { attribute: 'Type', value: 'Wildcard', extraPrice: 120 }, { attribute: 'Type', value: 'EV', extraPrice: 250 }] },
    { name: 'Dedicated Server', type: 'hardware', salesPrice: 2499, costPrice: 1200, isRecurring: false, variants: [{ attribute: 'CPU', value: '8-Core', extraPrice: 0 }, { attribute: 'CPU', value: '16-Core', extraPrice: 800 }] },
    { name: 'Architecture Review', type: 'consulting', salesPrice: 3500, costPrice: 1500, isRecurring: false, variants: [] },
    { name: 'Email Marketing Suite', type: 'saas', salesPrice: 129, costPrice: 32, isRecurring: true, variants: [{ attribute: 'Contacts', value: '5,000', extraPrice: 0 }, { attribute: 'Contacts', value: '25,000', extraPrice: 70 }] },
    { name: 'CDN Bandwidth Pack', type: 'addon', salesPrice: 59, costPrice: 15, isRecurring: true, variants: [] },
    { name: 'Data Analytics Platform', type: 'saas', salesPrice: 449, costPrice: 145, isRecurring: true, variants: [{ attribute: 'Brand', value: 'Odoo', extraPrice: 560 }, { attribute: 'Brand', value: 'Metabase', extraPrice: 0 }] },
    { name: 'DevOps Toolchain License', type: 'license', salesPrice: 899, costPrice: 280, isRecurring: false, variants: [] },
    { name: 'Managed Database Service', type: 'service', salesPrice: 349, costPrice: 110, isRecurring: true, variants: [{ attribute: 'Engine', value: 'PostgreSQL', extraPrice: 0 }, { attribute: 'Engine', value: 'MongoDB', extraPrice: 50 }] },
    { name: 'Load Balancer', type: 'hardware', salesPrice: 1899, costPrice: 850, isRecurring: false, variants: [] },
    { name: 'Security Audit Service', type: 'consulting', salesPrice: 5000, costPrice: 2200, isRecurring: false, variants: [{ attribute: 'Scope', value: 'Basic', extraPrice: 0 }, { attribute: 'Scope', value: 'Comprehensive', extraPrice: 3000 }] },
    { name: 'CI/CD Pipeline Pro', type: 'saas', salesPrice: 199, costPrice: 55, isRecurring: true, variants: [{ attribute: 'Builds', value: '500/mo', extraPrice: 0 }, { attribute: 'Builds', value: 'Unlimited', extraPrice: 300 }] },
    { name: 'Log Management Add-on', type: 'addon', salesPrice: 39, costPrice: 8, isRecurring: true, variants: [] },
    { name: 'Custom Integration Service', type: 'service', salesPrice: 750, costPrice: 300, isRecurring: false, variants: [] },
    { name: 'Enterprise Firewall', type: 'hardware', salesPrice: 3999, costPrice: 1800, isRecurring: false, variants: [{ attribute: 'Throughput', value: '1 Gbps', extraPrice: 0 }, { attribute: 'Throughput', value: '10 Gbps', extraPrice: 2000 }] },
    { name: 'VPN Gateway', type: 'saas', salesPrice: 89, costPrice: 22, isRecurring: true, variants: [] },
    { name: 'White-label License', type: 'license', salesPrice: 4999, costPrice: 1500, isRecurring: false, variants: [{ attribute: 'Users', value: 'Up to 100', extraPrice: 0 }, { attribute: 'Users', value: 'Unlimited', extraPrice: 5000 }] },
    { name: 'Monitoring Dashboard', type: 'saas', salesPrice: 159, costPrice: 40, isRecurring: true, variants: [] },
    { name: 'Backup & Recovery Service', type: 'service', salesPrice: 249, costPrice: 75, isRecurring: true, variants: [{ attribute: 'Retention', value: '7 Days', extraPrice: 0 }, { attribute: 'Retention', value: '90 Days', extraPrice: 180 }] },
    { name: 'DDoS Protection Add-on', type: 'addon', salesPrice: 149, costPrice: 45, isRecurring: true, variants: [] },
    { name: 'Network Switch 48-Port', type: 'hardware', salesPrice: 1299, costPrice: 600, isRecurring: false, variants: [] },
    { name: 'Migration Consulting', type: 'consulting', salesPrice: 7500, costPrice: 3200, isRecurring: false, variants: [{ attribute: 'Complexity', value: 'Standard', extraPrice: 0 }, { attribute: 'Complexity', value: 'Complex', extraPrice: 5000 }] },
];

const plans = [
    { name: 'Starter Monthly', price: 29.99, billingPeriod: 'monthly', minQuantity: 1, startDate: '2025-01-01', endDate: null, options: { autoClose: false, closable: true, pausable: true, renewable: true } },
    { name: 'Business Annual', price: 299, billingPeriod: 'yearly', minQuantity: 5, startDate: '2025-02-01', endDate: null, options: { autoClose: false, closable: true, pausable: false, renewable: true } },
    { name: 'Enterprise Weekly', price: 149, billingPeriod: 'weekly', minQuantity: 10, startDate: '2025-03-01', endDate: '2026-03-01', options: { autoClose: true, closable: true, pausable: true, renewable: true } },
    { name: 'Trial Daily', price: 0.99, billingPeriod: 'daily', minQuantity: 1, startDate: '2025-04-01', endDate: '2025-04-15', options: { autoClose: true, closable: false, pausable: false, renewable: false } },
    { name: 'Pro Monthly', price: 79.99, billingPeriod: 'monthly', minQuantity: 1, startDate: '2025-05-01', endDate: null, options: { autoClose: false, closable: true, pausable: true, renewable: true } },
    { name: 'Scale Yearly', price: 599, billingPeriod: 'yearly', minQuantity: 25, startDate: '2025-06-01', endDate: '2026-06-01', options: { autoClose: false, closable: true, pausable: false, renewable: true } },
    { name: 'Micro Weekly', price: 9.99, billingPeriod: 'weekly', minQuantity: 1, startDate: '2025-07-01', endDate: '2025-08-01', options: { autoClose: true, closable: true, pausable: false, renewable: false } },
    { name: 'Premium Daily', price: 4.99, billingPeriod: 'daily', minQuantity: 1, startDate: '2025-08-01', endDate: null, options: { autoClose: false, closable: true, pausable: true, renewable: true } },
    { name: 'Team Monthly', price: 199, billingPeriod: 'monthly', minQuantity: 10, startDate: '2025-09-01', endDate: null, options: { autoClose: false, closable: true, pausable: true, renewable: true } },
    { name: 'Seasonal Quarterly', price: 149, billingPeriod: 'monthly', minQuantity: 3, startDate: '2025-10-01', endDate: '2025-12-31', options: { autoClose: true, closable: false, pausable: false, renewable: false } },
    { name: 'Growth Annual', price: 999, billingPeriod: 'yearly', minQuantity: 50, startDate: '2025-11-01', endDate: '2026-11-01', options: { autoClose: false, closable: true, pausable: true, renewable: true } },
    { name: 'Budget Weekly', price: 4.99, billingPeriod: 'weekly', minQuantity: 1, startDate: '2025-12-01', endDate: null, options: { autoClose: false, closable: true, pausable: true, renewable: true } },
    { name: 'Unlimited Monthly', price: 499, billingPeriod: 'monthly', minQuantity: 1, startDate: '2026-01-01', endDate: null, options: { autoClose: false, closable: true, pausable: false, renewable: true } },
    { name: 'Flash Daily', price: 1.99, billingPeriod: 'daily', minQuantity: 1, startDate: '2026-02-01', endDate: '2026-02-15', options: { autoClose: true, closable: false, pausable: false, renewable: false } },
    { name: 'Corporate Yearly', price: 2499, billingPeriod: 'yearly', minQuantity: 100, startDate: '2026-01-15', endDate: '2027-01-15', options: { autoClose: false, closable: true, pausable: true, renewable: true } },
];

const discounts = [
    { name: 'Spring Promo 2025', type: 'percentage', value: 15, minPurchaseAmount: 500, minQuantity: 0, startDate: '2025-01-01', endDate: '2025-03-31', usageLimit: 100, usageCount: 45, appliesTo: ['subscriptions'], status: 'active' },
    { name: 'Welcome Bonus', type: 'fixed', value: 50, minPurchaseAmount: 100, minQuantity: 1, startDate: '2024-01-01', endDate: '2028-12-31', usageLimit: null, usageCount: 1200, appliesTo: ['products', 'subscriptions'], status: 'active' },
    { name: 'Black Friday 2026', type: 'percentage', value: 30, minPurchaseAmount: 0, minQuantity: 0, startDate: '2026-11-20', endDate: '2026-11-30', usageLimit: 500, usageCount: 0, appliesTo: ['products'], status: 'scheduled' },
    { name: 'Flash Sale (Internal)', type: 'fixed', value: 15, minPurchaseAmount: 50, minQuantity: 2, startDate: '2023-05-01', endDate: '2023-05-02', usageLimit: 50, usageCount: 50, appliesTo: ['products'], status: 'limit_reached' },
];

const taxes = [
    { name: 'Standard VAT', type: 'VAT', rate: 20, appliesTo: 'all', status: 'active', effectiveDate: '2024-01-01' },
    { name: 'Reduced Sales Tax', type: 'Sales Tax', rate: 5.5, appliesTo: 'products', status: 'active', effectiveDate: '2024-01-01' },
    { name: 'Digital Service Tax', type: 'Service Tax', rate: 3, appliesTo: 'subscriptions', status: 'scheduled', effectiveDate: '2026-06-01' },
    { name: 'Legacy Custom Tax', type: 'Custom', rate: 15, appliesTo: 'all', status: 'inactive', effectiveDate: '2020-01-01' },
    { name: 'Zero-Rated Goods', type: 'Sales Tax', rate: 0, appliesTo: 'products', status: 'active', effectiveDate: '2024-01-01' },
];

// ─── Seed Runner ────────────────────────────────────────────────────────────

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✓ Connected to MongoDB');

        // Clear all collections
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Plan.deleteMany(),
            Customer.deleteMany(),
            Subscription.deleteMany(),
            Invoice.deleteMany(),
            Payment.deleteMany(),
            Discount.deleteMany(),
            Tax.deleteMany(),
            QuotationTemplate.deleteMany(),
        ]);
        console.log('✓ Cleared all collections');

        // Seed users
        const seededUsers = await User.create(users);
        console.log(`✓ Seeded ${seededUsers.length} users`);

        // Seed customers
        const seededCustomers = await Customer.create(customers);
        console.log(`✓ Seeded ${seededCustomers.length} customers`);

        // Seed products
        const seededProducts = await Product.create(products);
        console.log(`✓ Seeded ${seededProducts.length} products`);

        // Seed plans
        const seededPlans = await Plan.create(plans);
        console.log(`✓ Seeded ${seededPlans.length} plans`);

        // Seed discounts
        const seededDiscounts = await Discount.create(discounts);
        console.log(`✓ Seeded ${seededDiscounts.length} discounts`);

        // Seed taxes
        const seededTaxes = await Tax.create(taxes);
        console.log(`✓ Seeded ${seededTaxes.length} taxes`);

        // Build lookup maps for relational seeding
        const customerMap = {};
        seededCustomers.forEach((c) => { customerMap[c.name] = c; });

        const productMap = {};
        seededProducts.forEach((p) => { productMap[p.name] = p; });

        const planMap = {};
        seededPlans.forEach((p) => { planMap[p.name] = p; });

        // Seed subscriptions (with proper ObjectId references)
        const subscriptionDefs = [
            {
                subscriptionNumber: 'SUB-2025-0001',
                customerName: 'John Enterprises', planName: 'Pro Monthly',
                status: 'active', startDate: '2025-06-01', expirationDate: '2026-06-01', paymentTerms: 'net-30',
                lineNames: [
                    { product: 'ViaTunnel Pro Suite', quantity: 5, taxRate: 18 },
                    { product: 'Premium Support Package', quantity: 5, taxRate: 18 },
                    { product: 'SSL Certificate', quantity: 1, taxRate: 18 },
                ],
            },
            {
                subscriptionNumber: 'SUB-2025-0002',
                customerName: 'Acme Corporation', planName: 'Corporate Yearly',
                status: 'active', startDate: '2025-03-15', expirationDate: '2026-03-15', paymentTerms: 'net-60',
                lineNames: [
                    { product: 'Data Analytics Platform', quantity: 10, taxRate: 18 },
                    { product: 'CI/CD Pipeline Pro', quantity: 10, taxRate: 18 },
                    { product: 'Backup & Recovery Service', quantity: 5, taxRate: 18 },
                    { product: 'DDoS Protection Add-on', quantity: 1, taxRate: 18 },
                ],
            },
            {
                subscriptionNumber: 'SUB-2025-0003',
                customerName: 'TechNova Solutions', planName: 'Team Monthly',
                status: 'quotation', startDate: '2026-03-01', expirationDate: '2027-03-01', paymentTerms: 'net-30',
                lineNames: [
                    { product: 'Email Marketing Suite', quantity: 3, taxRate: 12 },
                    { product: 'Monitoring Dashboard', quantity: 2, taxRate: 12 },
                ],
            },
            {
                subscriptionNumber: 'SUB-2025-0004',
                customerName: 'GlobalSync Ltd', planName: 'Business Annual',
                status: 'confirmed', startDate: '2026-04-01', expirationDate: '2027-04-01', paymentTerms: 'net-45',
                lineNames: [
                    { product: 'ViaTunnel Pro Suite', quantity: 20, taxRate: 18 },
                    { product: 'Premium Support Package', quantity: 20, taxRate: 18 },
                    { product: 'CDN Bandwidth Pack', quantity: 10, taxRate: 18 },
                ],
            },
            {
                subscriptionNumber: 'SUB-2025-0005',
                customerName: 'Pinnacle Digital', planName: 'Starter Monthly',
                status: 'draft', startDate: '2026-03-15', expirationDate: '2027-03-15', paymentTerms: 'due-on-receipt',
                lineNames: [
                    { product: 'Cloud Storage Unlimited', quantity: 2, taxRate: 8 },
                    { product: 'Log Management Add-on', quantity: 1, taxRate: 8 },
                ],
            },
            {
                subscriptionNumber: 'SUB-2025-0006',
                customerName: 'Vertex Industries', planName: 'Growth Annual',
                status: 'closed', startDate: '2024-08-01', expirationDate: '2025-08-01', paymentTerms: 'net-30',
                lineNames: [
                    { product: 'Data Analytics Platform', quantity: 5, taxRate: 18 },
                    { product: 'VPN Gateway', quantity: 10, taxRate: 18 },
                ],
            },
        ];

        const seededSubscriptions = [];
        for (const def of subscriptionDefs) {
            const cust = customerMap[def.customerName];
            const plan = planMap[def.planName];
            if (!cust || !plan) continue;

            const orderLines = def.lineNames.map((ln) => {
                const prod = productMap[ln.product];
                return prod
                    ? { productId: prod._id, productName: prod.name, quantity: ln.quantity, unitPrice: prod.salesPrice, taxRate: ln.taxRate }
                    : null;
            }).filter(Boolean);

            const sub = await Subscription.create({
                subscriptionNumber: def.subscriptionNumber,
                customerId: cust._id,
                customerName: cust.name,
                planId: plan._id,
                planName: plan.name,
                status: def.status,
                startDate: def.startDate,
                expirationDate: def.expirationDate,
                paymentTerms: def.paymentTerms,
                orderLines,
                activity: [{ action: 'Subscription created', user: 'Seed Script', timestamp: new Date() }],
            });
            seededSubscriptions.push(sub);
        }
        console.log(`✓ Seeded ${seededSubscriptions.length} subscriptions`);

        // Seed invoices
        const invoiceDefs = [
            {
                invoiceNumber: 'INV-2025-0045', customerName: 'Acme Corporation',
                issueDate: '2025-03-01', dueDate: '2025-03-15', status: 'draft', taxRate: 10,
                lines: [
                    { description: 'Cloud Hosting - Enterprise Plan', quantity: 1, unitPrice: 2000 },
                    { description: 'Dedicated Support (March)', quantity: 1, unitPrice: 500 },
                ],
            },
            {
                invoiceNumber: 'INV-2025-0046', customerName: 'TechNova Solutions',
                issueDate: '2025-02-15', dueDate: '2025-03-01', status: 'overdue', taxRate: 5,
                lines: [
                    { description: 'Data Analytics Tool - Pro', quantity: 5, unitPrice: 100 },
                    { description: 'API Access', quantity: 1, unitPrice: 1000 },
                ],
            },
            {
                invoiceNumber: 'INV-2025-0047', customerName: 'TechNova Solutions',
                issueDate: '2025-02-01', dueDate: '2025-02-15', status: 'paid', taxRate: 10,
                lines: [
                    { description: 'Software License - Teams', quantity: 10, unitPrice: 50 },
                ],
            },
            {
                invoiceNumber: 'INV-2025-0048', customerName: 'GlobalSync Ltd',
                issueDate: '2025-03-05', dueDate: '2025-03-20', status: 'confirmed', taxRate: 0,
                lines: [
                    { description: 'AI Defense System Setup', quantity: 1, unitPrice: 100000 },
                ],
            },
        ];

        const seededInvoices = [];
        for (const def of invoiceDefs) {
            const cust = customerMap[def.customerName];
            if (!cust) continue;
            const inv = await Invoice.create({
                invoiceNumber: def.invoiceNumber,
                customerId: cust._id,
                customerName: cust.name,
                customerEmail: cust.email,
                customerAddress: cust.address || '',
                issueDate: def.issueDate,
                dueDate: def.dueDate,
                status: def.status,
                currency: 'USD',
                taxRate: def.taxRate,
                lines: def.lines,
            });
            seededInvoices.push(inv);
        }
        console.log(`✓ Seeded ${seededInvoices.length} invoices`);

        // Invoice lookup
        const invoiceMap = {};
        seededInvoices.forEach((i) => { invoiceMap[i.invoiceNumber] = i; });

        // Seed payments
        const paymentDefs = [
            { invoiceNumber: 'INV-2025-0047', customerName: 'TechNova Solutions', method: 'Credit Card', amount: 550, date: '2025-02-10', status: 'completed', reference: 'TXN-987654' },
            { invoiceNumber: 'INV-2025-0046', customerName: 'TechNova Solutions', method: 'Bank Transfer', amount: 500, date: '2025-02-28', status: 'pending', reference: 'WIREQ-10023' },
            { invoiceNumber: 'INV-2025-0048', customerName: 'GlobalSync Ltd', method: 'Crypto', amount: 25000, date: '2025-03-01', status: 'completed', reference: 'ETH-TX-9988' },
            { invoiceNumber: 'INV-2025-0048', customerName: 'GlobalSync Ltd', method: 'Credit Card', amount: 15000, date: '2025-03-05', status: 'failed', reference: 'ERR-INSUFF-FUNDS' },
        ];

        const seededPayments = [];
        for (const def of paymentDefs) {
            const inv = invoiceMap[def.invoiceNumber];
            const cust = customerMap[def.customerName];
            if (!inv || !cust) continue;
            const pay = await Payment.create({
                invoiceId: inv._id,
                customerId: cust._id,
                customerName: cust.name,
                method: def.method,
                amount: def.amount,
                date: def.date,
                status: def.status,
                reference: def.reference,
            });
            seededPayments.push(pay);
        }
        console.log(`✓ Seeded ${seededPayments.length} payments`);

        // Seed quotation templates
        const templateDefs = [
            {
                name: 'Starter Monthly Plan', validityDays: 30,
                planName: 'Starter Monthly',
                lines: [
                    { product: 'Cloud Storage Unlimited', quantity: 1, unitPrice: 49.99, taxRate: 18 },
                    { product: 'Premium Support Package', quantity: 1, unitPrice: 19, taxRate: 18 },
                ],
            },
            {
                name: 'Pro Development Bundle', validityDays: 30,
                planName: 'Pro Monthly',
                lines: [
                    { product: 'ViaTunnel Pro Suite', quantity: 5, unitPrice: 299.99, taxRate: 18 },
                    { product: 'CI/CD Pipeline Pro', quantity: 5, unitPrice: 199, taxRate: 18 },
                    { product: 'Monitoring Dashboard', quantity: 5, unitPrice: 159, taxRate: 18 },
                ],
            },
            {
                name: 'Enterprise Security Suite', validityDays: 365,
                planName: 'Corporate Yearly',
                lines: [
                    { product: 'ViaTunnel Pro Suite', quantity: 50, unitPrice: 299.99, taxRate: 18 },
                    { product: 'VPN Gateway', quantity: 25, unitPrice: 89, taxRate: 18 },
                    { product: 'DDoS Protection Add-on', quantity: 10, unitPrice: 149, taxRate: 18 },
                    { product: 'Backup & Recovery Service', quantity: 25, unitPrice: 249, taxRate: 18 },
                ],
            },
        ];

        const seededTemplates = [];
        for (const def of templateDefs) {
            const plan = planMap[def.planName];
            if (!plan) continue;
            const productLines = def.lines.map((ln) => {
                const prod = productMap[ln.product];
                return prod
                    ? { productId: prod._id, productName: prod.name, quantity: ln.quantity, unitPrice: ln.unitPrice, taxRate: ln.taxRate }
                    : null;
            }).filter(Boolean);

            const tmpl = await QuotationTemplate.create({
                name: def.name,
                validityDays: def.validityDays,
                recurringPlanId: plan._id,
                recurringPlanName: plan.name,
                productLines,
            });
            seededTemplates.push(tmpl);
        }
        console.log(`✓ Seeded ${seededTemplates.length} quotation templates`);

        console.log('\n🎉 Database seeded successfully!\n');
        console.log('Login credentials:');
        console.log('  Admin:    admin@subbill.dev    / Admin@123!');
        console.log('  Internal: internal@subbill.dev / Internal@123!');
        console.log('  Portal:   portal@subbill.dev   / Portal@123!\n');
    } catch (error) {
        console.error('Seed failed:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

seed();
