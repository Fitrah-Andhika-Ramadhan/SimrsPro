import React, { useState } from 'react';
import { CreditCard, FileText, Download, DollarSign, Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const Billing = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, invId: 'INV-2026-001', patient: 'Sarah Jenkins', date: '2026-05-15', amount: '450000', status: 'Paid', method: 'Insurance (BPJS)' },
    { id: 2, invId: 'INV-2026-002', patient: 'Michael Chen', date: '2026-05-15', amount: '1250000', status: 'Pending', method: 'Cash' },
    { id: 3, invId: 'INV-2026-003', patient: 'Emily Rodriguez', date: '2026-05-14', amount: '850000', status: 'Paid', method: 'Credit Card' },
    { id: 4, invId: 'INV-2026-004', patient: 'James Wilson', date: '2026-05-14', amount: '320000', status: 'Paid', method: 'Debit' },
    { id: 5, invId: 'INV-2026-005', patient: 'David Kim', date: '2026-05-13', amount: '210000', status: 'Overdue', method: 'Insurance (Private)' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInv, setCurrentInv] = useState(null);
  const [formData, setFormData] = useState({ invId: '', patient: '', date: '', amount: '', status: 'Pending', method: 'Cash' });

  const filteredInvoices = invoices.filter(inv => 
    inv.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.invId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const handleOpenModal = (inv = null) => {
    if (inv) {
      setCurrentInv(inv);
      setFormData(inv);
    } else {
      setCurrentInv(null);
      setFormData({ 
        invId: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`, 
        patient: '', date: new Date().toISOString().split('T')[0], amount: '', status: 'Pending', method: 'Cash' 
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentInv(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentInv) {
      setInvoices(invoices.map(i => i.id === currentInv.id ? { ...formData, id: currentInv.id } : i));
    } else {
      setInvoices([...invoices, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(i => i.id !== id));
    }
  };

  // Calculate totals
  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + parseInt(curr.amount), 0);
  const pendingRevenue = invoices.filter(i => i.status === 'Pending').reduce((acc, curr) => acc + parseInt(curr.amount), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Billing & Kasir</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-secondary)', borderRadius: 'var(--radius-md)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>{formatRupiah(totalRevenue)}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Paid Revenue</p>
          </div>
        </div>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)', borderRadius: 'var(--radius-md)' }}>
            <CreditCard size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>{formatRupiah(pendingRevenue)}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pending Payments</p>
          </div>
        </div>
      </div>

      <div className="glass-panel card">
        <div style={{ position: 'relative', width: '300px', marginBottom: '1.5rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            className="input-control" 
            style={{ width: '100%', paddingLeft: '2.5rem' }}
            placeholder="Search by Patient or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} color="var(--text-secondary)" /> {inv.invId}
                  </td>
                  <td>{inv.patient}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{inv.date}</td>
                  <td style={{ fontWeight: 600 }}>{formatRupiah(inv.amount)}</td>
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
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: '#60a5fa' }} onClick={() => handleOpenModal(inv)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--accent-danger)' }} onClick={() => handleDelete(inv.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel card modal-content">
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{currentInv ? 'Edit Invoice' : 'New Invoice'}</h3>
              <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-secondary)' }} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Invoice ID</label>
                  <input type="text" className="input-control" value={formData.invId} disabled style={{ opacity: 0.7 }} />
                </div>
                <div className="input-group">
                  <label>Date</label>
                  <input type="date" className="input-control" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                </div>
              </div>
              <div className="input-group">
                <label>Patient Name</label>
                <input type="text" className="input-control" value={formData.patient} onChange={e => setFormData({...formData, patient: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Amount (IDR)</label>
                <input type="number" className="input-control" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Payment Method</label>
                  <select className="input-control" value={formData.method} onChange={e => setFormData({...formData, method: e.target.value})}>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit">Debit</option>
                    <option value="Insurance (BPJS)">Insurance (BPJS)</option>
                    <option value="Insurance (Private)">Insurance (Private)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <select className="input-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" style={{ background: 'var(--bg-tertiary)', color: 'white' }} onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
