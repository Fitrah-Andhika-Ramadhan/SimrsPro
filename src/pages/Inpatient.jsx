import React, { useState } from 'react';
import { BedDouble, Users, UserPlus, DoorOpen, Edit2, Trash2, X } from 'lucide-react';

const Inpatient = () => {
  const wards = [
    { id: 'W-A01', type: 'ICU', capacity: 10, occupied: 8, nurse: 'Nurse Ratched' },
    { id: 'W-B01', type: 'General', capacity: 20, occupied: 15, nurse: 'Nurse Joy' },
    { id: 'W-C01', type: 'Pediatric', capacity: 15, occupied: 12, nurse: 'Nurse Chapel' },
    { id: 'W-D01', type: 'Maternity', capacity: 10, occupied: 4, nurse: 'Nurse Hathaway' },
  ];

  const [patients, setPatients] = useState([
    { id: 1, name: 'Sarah Jenkins', ward: 'W-A01', bed: 'Bed 03', admission: '2026-05-10', status: 'Stable' },
    { id: 2, name: 'David Kim', ward: 'W-B01', bed: 'Bed 12', admission: '2026-05-12', status: 'Critical' },
    { id: 3, name: 'Emily Rodriguez', ward: 'W-D01', bed: 'Bed 01', admission: '2026-05-14', status: 'Discharging' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [formData, setFormData] = useState({ name: '', ward: 'W-B01', bed: '', admission: '', status: 'Stable' });

  const handleOpenModal = (patient = null) => {
    if (patient) {
      setCurrentPatient(patient);
      setFormData(patient);
    } else {
      setCurrentPatient(null);
      setFormData({ name: '', ward: 'W-B01', bed: '', admission: new Date().toISOString().split('T')[0], status: 'Stable' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentPatient) {
      setPatients(patients.map(p => p.id === currentPatient.id ? { ...formData, id: currentPatient.id } : p));
    } else {
      setPatients([...patients, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this patient from Inpatient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Inpatient Management (Rawat Inap)</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <UserPlus size={18} /> Admit Patient
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {wards.map(ward => (
          <div key={ward.id} className="glass-panel card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem 1rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '0 0 0 var(--radius-md)', fontSize: '0.75rem', fontWeight: 600 }}>
              {ward.type}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <DoorOpen size={20} color="var(--accent-secondary)" />
              <h3 style={{ fontSize: '1.25rem' }}>{ward.id}</h3>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Occupancy</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{ward.occupied} / {ward.capacity}</span>
            </div>
            
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ 
                width: `${(ward.occupied / ward.capacity) * 100}%`, 
                height: '100%', 
                background: (ward.occupied / ward.capacity) > 0.8 ? 'var(--accent-danger)' : 'var(--accent-primary)',
                transition: 'var(--transition)'
              }}></div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <Users size={14} /> Head: {ward.nurse}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Current Inpatients</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Ward</th>
                <th>Bed</th>
                <th>Admission Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td style={{ fontWeight: 500 }}>{patient.name}</td>
                  <td>{patient.ward}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{patient.bed}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{patient.admission}</td>
                  <td>
                    <span className={`badge badge-${patient.status === 'Stable' ? 'success' : patient.status === 'Critical' ? 'danger' : 'info'}`} style={{
                      background: patient.status === 'Discharging' ? 'rgba(59, 130, 246, 0.2)' : undefined,
                      color: patient.status === 'Discharging' ? '#60a5fa' : undefined,
                      border: patient.status === 'Discharging' ? '1px solid rgba(59, 130, 246, 0.3)' : undefined,
                    }}>
                      {patient.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: '#60a5fa' }} onClick={() => handleOpenModal(patient)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--accent-danger)' }} onClick={() => handleDelete(patient.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No inpatients found.
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
              <h3 style={{ fontSize: '1.25rem' }}>{currentPatient ? 'Edit Inpatient' : 'Admit Patient'}</h3>
              <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-secondary)' }} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label>Patient Name</label>
                <input type="text" className="input-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Ward</label>
                  <select className="input-control" value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})}>
                    {wards.map(w => <option key={w.id} value={w.id}>{w.id} - {w.type}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Bed Number (e.g. Bed 05)</label>
                  <input type="text" className="input-control" value={formData.bed} onChange={e => setFormData({...formData, bed: e.target.value})} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Admission Date</label>
                  <input type="date" className="input-control" value={formData.admission} onChange={e => setFormData({...formData, admission: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <select className="input-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Stable">Stable</option>
                    <option value="Critical">Critical</option>
                    <option value="Discharging">Discharging</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" style={{ background: 'var(--bg-tertiary)', color: 'white' }} onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Inpatient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inpatient;
