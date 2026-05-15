import React, { useState } from 'react';
import { Pill, Search, Plus, AlertTriangle, Package } from 'lucide-react';

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol 500mg', category: 'Analgesic', stock: 1250, price: 'Rp 5.000', expiry: '2027-08-10', status: 'In Stock' },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 45, price: 'Rp 15.000', expiry: '2025-11-20', status: 'Low Stock' },
    { id: 3, name: 'Omeprazole 20mg', category: 'Antacid', stock: 320, price: 'Rp 20.000', expiry: '2026-05-15', status: 'In Stock' },
    { id: 4, name: 'Vitamin C 1000mg', category: 'Supplement', stock: 0, price: 'Rp 35.000', expiry: '2026-12-01', status: 'Out of Stock' },
    { id: 5, name: 'Ibuprofen 400mg', category: 'NSAID', stock: 850, price: 'Rp 12.000', expiry: '2028-01-10', status: 'In Stock' },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Pharmacy Inventory</h2>
        <button className="btn btn-primary">
          <Plus size={18} /> Add Medicine
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
            <Package size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>2,465</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Items</p>
          </div>
        </div>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)', borderRadius: 'var(--radius-md)' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>12</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Low Stock Items</p>
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
              </tr>
            </thead>
            <tbody>
              {medicines.map(med => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
