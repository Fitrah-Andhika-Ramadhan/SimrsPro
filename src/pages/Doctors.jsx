import React, { useState } from 'react';
import { User, Phone, Mail, Award, Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Smith', spec: 'Cardiologist', exp: '15 Years', phone: '+62 811-1111-2222', email: 'sarah.smith@simrs.com', status: 'Available' },
    { id: 2, name: 'Dr. John Adams', spec: 'Neurologist', exp: '12 Years', phone: '+62 812-3333-4444', email: 'john.adams@simrs.com', status: 'In Surgery' },
    { id: 3, name: 'Dr. Emily Lee', spec: 'Pediatrician', exp: '8 Years', phone: '+62 813-5555-6666', email: 'emily.lee@simrs.com', status: 'Available' },
    { id: 4, name: 'Dr. Michael Chen', spec: 'Orthopedic', exp: '20 Years', phone: '+62 814-7777-8888', email: 'michael.chen@simrs.com', status: 'Off Duty' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: '', spec: '', exp: '', phone: '', email: '', status: 'Available' });

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.spec.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (doctor = null) => {
    if (doctor) {
      setCurrentDoctor(doctor);
      setFormData(doctor);
    } else {
      setCurrentDoctor(null);
      setFormData({ name: '', spec: '', exp: '', phone: '', email: '', status: 'Available' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDoctor(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentDoctor) {
      setDoctors(doctors.map(d => d.id === currentDoctor.id ? { ...formData, id: currentDoctor.id } : d));
    } else {
      setDoctors([...doctors, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(d => d.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Medical Staff Directory</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button onClick={() => handleOpenModal(doc)} style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: '0.25rem' }}><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(doc.id)} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0.25rem' }}><Trash2 size={16} /></button>
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
            </div>
          </div>
        ))}
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel card modal-content">
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{currentDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
              <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-secondary)' }} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label>Doctor Name</label>
                <input type="text" className="input-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Specialty</label>
                  <input type="text" className="input-control" value={formData.spec} onChange={e => setFormData({...formData, spec: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Experience (e.g. 5 Years)</label>
                  <input type="text" className="input-control" value={formData.exp} onChange={e => setFormData({...formData, exp: e.target.value})} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="text" className="input-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" className="input-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                </div>
              </div>
              <div className="input-group">
                <label>Status</label>
                <select className="input-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Available">Available</option>
                  <option value="In Surgery">In Surgery</option>
                  <option value="Off Duty">Off Duty</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" style={{ background: 'var(--bg-tertiary)', color: 'white' }} onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
