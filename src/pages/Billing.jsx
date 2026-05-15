import React from 'react';
import { CreditCard, FileText, Download, DollarSign } from 'lucide-react';

const Billing = () => {
  const invoices = [
    { id: 'INV-2026-001', patient: 'Sarah Jenkins', date: '2026-05-15', amount: 'Rp 450.000', status: 'Paid', method: 'Insurance (BPJS)' },
    { id: 'INV-2026-002', patient: 'Michael Chen', date: '2026-05-15', amount: 'Rp 1.250.000', status: 'Pending', method: 'Cash' },
    { id: 'INV-2026-003', patient: 'Emily Rodriguez', date: '2026-05-14', amount: 'Rp 850.000', status: 'Paid', method: 'Credit Card' },
    { id: 'INV-2026-004', patient: 'James Wilson', date: '2026-05-14', amount: 'Rp 320.000', status: 'Paid', method: 'Debit' },
    { id: 'INV-2026-005', patient: 'David Kim', date: '2026-05-13', amount: 'Rp 2.100.000', status: 'Overdue', method: 'Insurance (Private)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Billing & Kasir</h2>
        <button className="btn btn-primary">
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-secondary)', borderRadius: 'var(--radius-md)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>Rp 12.4M</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Revenue Today</p>
          </div>
        </div>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)', borderRadius: 'var(--radius-md)' }}>
            <CreditCard size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>Rp 3.2M</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pending Payments</p>
          </div>
        </div>
      </div>

      <div className="glass-panel card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Invoices</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} color="var(--text-secondary)" /> {inv.id}
                  </td>
                  <td>{inv.patient}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{inv.date}</td>
                  <td style={{ fontWeight: 600 }}>{inv.amount}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{inv.method}</td>
                  <td>
                    <span className={`badge badge-${inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'danger'}`} style={{
                      background: inv.status === 'Overdue' ? 'rgba(239, 68, 68, 0.2)' : undefined,
                      color: inv.status === 'Overdue' ? '#f87171' : undefined,
                      border: inv.status === 'Overdue' ? '1px solid rgba(239, 68, 68, 0.3)' : undefined,
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: '#60a5fa' }}>
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Add Plus icon import since it's used
import { Plus } from 'lucide-react';

export default Billing;
