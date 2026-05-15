import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const Patients = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Sarah Jenkins', dob: '1985-04-12', gender: 'Female', phone: '+62 812-3456-7890', status: 'Active' },
    { id: 2, name: 'Michael Chen', dob: '1979-11-23', gender: 'Male', phone: '+62 813-9876-5432', status: 'Active' },
    { id: 3, name: 'Emily Rodriguez', dob: '1992-08-05', gender: 'Female', phone: '+62 856-1122-3344', status: 'Inactive' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [formData, setFormData] = useState({ name: '', dob: '', gender: 'Male', phone: '', status: 'Active' });

  // Filter patients based on search
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.phone.includes(searchTerm)
  );

  const handleOpenModal = (patient = null) => {
    if (patient) {
      setCurrentPatient(patient);
      setFormData(patient);
    } else {
      setCurrentPatient(null);
      setFormData({ name: '', dob: '', gender: 'Male', phone: '', status: 'Active' });
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
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            className="input-control" 
            style={{ width: '100%', paddingLeft: '2.5rem' }}
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Patient
        </button>
      </div>

      <div className="glass-panel card table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>#{patient.id.toString().slice(-4)}</td>
                <td style={{ fontWeight: 500 }}>{patient.name}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{patient.dob}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{patient.gender}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{patient.phone}</td>
                <td>
                  <span className={`badge badge-${patient.status === 'Active' ? 'success' : 'warning'}`}>
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
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel card modal-content">
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{currentPatient ? 'Edit Patient' : 'Add New Patient'}</h3>
              <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-secondary)' }} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="input-control" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date" 
                    className="input-control" 
                    value={formData.dob} 
                    onChange={e => setFormData({...formData, dob: e.target.value})}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label>Gender</label>
                  <select 
                    className="input-control" 
                    value={formData.gender} 
                    onChange={e => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  className="input-control" 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Status</label>
                <select 
                  className="input-control" 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" style={{ background: 'var(--bg-tertiary)', color: 'white' }} onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
