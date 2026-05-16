import React, { useState } from 'react';
import { Pill, Search, Plus, AlertTriangle, Package, Edit2, Trash2, X } from 'lucide-react';

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol 500mg', category: 'Analgesic', stock: 1250, price: 'Rp 5.000', expiry: '2027-08-10', status: 'In Stock' },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 45, price: 'Rp 15.000', expiry: '2025-11-20', status: 'Low Stock' },
    { id: 3, name: 'Omeprazole 20mg', category: 'Antacid', stock: 320, price: 'Rp 20.000', expiry: '2026-05-15', status: 'In Stock' },
    { id: 4, name: 'Vitamin C 1000mg', category: 'Supplement', stock: 0, price: 'Rp 35.000', expiry: '2026-12-01', status: 'Out of Stock' },
    { id: 5, name: 'Ibuprofen 400mg', category: 'NSAID', stock: 850, price: 'Rp 12.000', expiry: '2028-01-10', status: 'In Stock' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMed, setCurrentMed] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', stock: 0, price: '', expiry: '', status: 'In Stock' });

  const filteredMeds = medicines.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (med = null) => {
    if (med) {
      setCurrentMed(med);
      setFormData(med);
    } else {
      setCurrentMed(null);
      setFormData({ name: '', category: '', stock: 0, price: '', expiry: '', status: 'In Stock' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentMed(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Auto calculate status based on stock
    let updatedStatus = formData.status;
    const stockNum = parseInt(formData.stock);
    if (stockNum === 0) updatedStatus = 'Out of Stock';
    else if (stockNum < 50) updatedStatus = 'Low Stock';
    else updatedStatus = 'In Stock';

    const finalData = { ...formData, status: updatedStatus };

    if (currentMed) {
      setMedicines(medicines.map(m => m.id === currentMed.id ? { ...finalData, id: currentMed.id } : m));
    } else {
      setMedicines([...medicines, { ...finalData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(m => m.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Pharmacy Inventory</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Medicine
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
            <Package size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>{medicines.reduce((acc, curr) => acc + parseInt(curr.stock), 0)}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Items</p>
          </div>
        </div>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)', borderRadius: 'var(--radius-md)' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>{medicines.filter(m => m.status === 'Low Stock' || m.status === 'Out of Stock').length}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Low/Out of Stock</p>
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
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Stock Level</th>
                <th>Price / Unit</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeds.map(med => (
                <tr key={med.id}>
                  <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Pill size={16} color="var(--accent-primary)" /> {med.name}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{med.category}</td>
                  <td style={{ fontWeight: 500 }}>{med.stock}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{med.price}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{med.expiry}</td>
                  <td>
                    <span className={`badge badge-${med.status === 'In Stock' ? 'success' : med.status === 'Low Stock' ? 'warning' : 'danger'}`} style={{
                      background: med.status === 'Out of Stock' ? 'rgba(239, 68, 68, 0.2)' : undefined,
                      color: med.status === 'Out of Stock' ? '#f87171' : undefined,
                      border: med.status === 'Out of Stock' ? '1px solid rgba(239, 68, 68, 0.3)' : undefined,
                    }}>
                      {med.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: '#60a5fa' }} onClick={() => handleOpenModal(med)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--accent-danger)' }} onClick={() => handleDelete(med.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMeds.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No medicines found.
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
              <h3 style={{ fontSize: '1.25rem' }}>{currentMed ? 'Edit Medicine' : 'Add New Medicine'}</h3>
              <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-secondary)' }} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label>Medicine Name</label>
                <input type="text" className="input-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Category</label>
                  <input type="text" className="input-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Stock Quantity</label>
                  <input type="number" className="input-control" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Price (e.g. Rp 15.000)</label>
                  <input type="text" className="input-control" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Expiry Date</label>
                  <input type="date" className="input-control" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} required />
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" style={{ background: 'var(--bg-tertiary)', color: 'white' }} onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Medicine</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pharmacy;
