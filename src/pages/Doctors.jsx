import React from 'react';
import { User, Phone, Mail, Award, Plus, Search } from 'lucide-react';

const Doctors = () => {
  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', spec: 'Cardiologist', exp: '15 Years', phone: '+62 811-1111-2222', email: 'sarah.smith@simrs.com', status: 'Available' },
    { id: 2, name: 'Dr. John Adams', spec: 'Neurologist', exp: '12 Years', phone: '+62 812-3333-4444', email: 'john.adams@simrs.com', status: 'In Surgery' },
    { id: 3, name: 'Dr. Emily Lee', spec: 'Pediatrician', exp: '8 Years', phone: '+62 813-5555-6666', email: 'emily.lee@simrs.com', status: 'Available' },
    { id: 4, name: 'Dr. Michael Chen', spec: 'Orthopedic', exp: '20 Years', phone: '+62 814-7777-8888', email: 'michael.chen@simrs.com', status: 'Off Duty' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Medical Staff Directory</h2>
        <button className="btn btn-primary">
          <Plus size={18} /> Add Doctor
        </button>
      </div>

      <div style={{ position: 'relative', width: '300px', marginBottom: '0.5rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          className="input-control" 
          style={{ width: '100%', paddingLeft: '2.5rem' }}
          placeholder="Search by name or specialty..."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {doctors.map(doc => (
          <div key={doc.id} className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--accent-primary)'
              }}>
                <User size={30} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem' }}>{doc.name}</h3>
                <p style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 500 }}>{doc.spec}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Award size={16} /> Experience: {doc.exp}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Phone size={16} /> {doc.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Mail size={16} /> {doc.email}
              </div>
            </div>

            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`badge badge-${doc.status === 'Available' ? 'success' : doc.status === 'Off Duty' ? 'warning' : 'danger'}`} style={{
                background: doc.status === 'In Surgery' ? 'rgba(239, 68, 68, 0.2)' : undefined,
                color: doc.status === 'In Surgery' ? '#f87171' : undefined,
                border: doc.status === 'In Surgery' ? '1px solid rgba(239, 68, 68, 0.3)' : undefined,
              }}>
                {doc.status}
              </span>
              <button className="btn" style={{ padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', fontSize: '0.875rem' }}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
