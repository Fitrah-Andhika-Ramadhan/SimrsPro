import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, FileText, Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Sarah Jenkins', doctor: 'Dr. Smith', date: '2026-05-16', time: '10:00 AM', status: 'Scheduled', type: 'Checkup' },
    { id: 2, patient: 'Michael Chen', doctor: 'Dr. Adams', date: '2026-05-16', time: '11:30 AM', status: 'Scheduled', type: 'Follow-up' },
    { id: 3, patient: 'Emily Rodriguez', doctor: 'Dr. Lee', date: '2026-05-15', time: '02:15 PM', status: 'Completed', type: 'Consultation' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [formData, setFormData] = useState({ patient: '', doctor: '', date: '', time: '', status: 'Scheduled', type: 'Checkup' });

  const filteredApps = appointments.filter(app => 
    app.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (app = null) => {
    if (app) {
      setCurrentApp(app);
      setFormData(app);
    } else {
      setCurrentApp(null);
      setFormData({ patient: '', doctor: '', date: '', time: '', status: 'Scheduled', type: 'Checkup' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentApp(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentApp) {
      setAppointments(appointments.map(a => a.id === currentApp.id ? { ...formData, id: currentApp.id } : a));
    } else {
      setAppointments([...appointments, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const markDone = (id) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Completed' } : a));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Appointment Schedule</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> New Appointment
        </button>
      </div>

      <div style={{ position: 'relative', width: '300px', marginBottom: '0.5rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          className="input-control" 
          style={{ width: '100%', paddingLeft: '2.5rem' }}
          placeholder="Search by patient or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredApps.map(app => (
          <div key={app.id} className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
            
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleOpenModal(app)} style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer' }}><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(app.id)} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{app.patient}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={14} /> {app.doctor}
                </p>
              </div>
              <span className={`badge badge-${app.status === 'Completed' ? 'success' : app.status === 'Cancelled' ? 'danger' : 'info'}`} style={{
                background: app.status === 'Scheduled' ? 'rgba(59, 130, 246, 0.2)' : undefined,
                color: app.status === 'Scheduled' ? '#60a5fa' : undefined,
                border: app.status === 'Scheduled' ? '1px solid rgba(59, 130, 246, 0.3)' : undefined,
              }}>
                {app.status}
              </span>
            </div>

            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <CalendarIcon size={16} color="var(--accent-primary)" />
                <span>{app.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Clock size={16} color="var(--accent-warning)" />
                <span>{app.time}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <FileText size={16} />
              <span>Type: {app.type}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button onClick={() => handleOpenModal(app)} className="btn" style={{ flex: 1, background: 'var(--bg-tertiary)', color: 'white', padding: '0.5rem' }}>Reschedule</button>
              {app.status !== 'Completed' && (
                <button onClick={() => markDone(app.id)} className="btn" style={{ flex: 1, background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '0.5rem' }}>Mark Done</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel card modal-content">
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{currentApp ? 'Edit Appointment' : 'New Appointment'}</h3>
              <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-secondary)' }} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label>Patient Name</label>
                <input type="text" className="input-control" value={formData.patient} onChange={e => setFormData({...formData, patient: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Doctor Name</label>
                <input type="text" className="input-control" value={formData.doctor} onChange={e => setFormData({...formData, doctor: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Date</label>
                  <input type="date" className="input-control" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Time</label>
                  <input type="time" className="input-control" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Type</label>
                  <select className="input-control" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="Checkup">Checkup</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Surgery">Surgery</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <select className="input-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" style={{ background: 'var(--bg-tertiary)', color: 'white' }} onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
