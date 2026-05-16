import React, { useState } from 'react';
import { Microscope, FileSearch, Search, Plus, CheckCircle, Clock, Edit2, Trash2, X } from 'lucide-react';

const Laboratory = () => {
  const [labTests, setLabTests] = useState([
    { id: 1, labId: 'LAB-001', patient: 'Sarah Jenkins', test: 'Complete Blood Count', doctor: 'Dr. Smith', date: '2026-05-15', status: 'Completed', result: 'Normal' },
    { id: 2, labId: 'LAB-002', patient: 'Michael Chen', test: 'Lipid Panel', doctor: 'Dr. Adams', date: '2026-05-15', status: 'In Progress', result: '-' },
    { id: 3, labId: 'LAB-003', patient: 'Emily Rodriguez', test: 'Urinalysis', doctor: 'Dr. Lee', date: '2026-05-16', status: 'Pending', result: '-' },
    { id: 4, labId: 'LAB-004', patient: 'James Wilson', test: 'X-Ray Chest', doctor: 'Dr. Smith', date: '2026-05-14', status: 'Completed', result: 'Abnormal' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [formData, setFormData] = useState({ labId: '', patient: '', test: '', doctor: '', date: '', status: 'Pending', result: '-' });

  const filteredTests = labTests.filter(test => 
    test.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    test.labId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (test = null) => {
    if (test) {
      setCurrentTest(test);
      setFormData(test);
    } else {
      setCurrentTest(null);
      setFormData({ 
        labId: `LAB-00${labTests.length + 1}`, 
        patient: '', test: '', doctor: '', date: new Date().toISOString().split('T')[0], status: 'Pending', result: '-' 
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTest(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentTest) {
      setLabTests(labTests.map(t => t.id === currentTest.id ? { ...formData, id: currentTest.id } : t));
    } else {
      setLabTests([...labTests, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lab request?')) {
      setLabTests(labTests.filter(t => t.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Laboratory & Diagnostics</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> New Test Request
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(37, 99, 235, 0.2)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
            <Microscope size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>{labTests.length}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Tests</p>
          </div>
        </div>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)', borderRadius: 'var(--radius-md)' }}>
            <Clock size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>{labTests.filter(t => t.status !== 'Completed').length}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pending / In Progress</p>
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
                <th>Lab ID</th>
                <th>Patient Name</th>
                <th>Test Type</th>
                <th>Requested By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Result</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map(test => (
                <tr key={test.id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{test.labId}</td>
                  <td style={{ fontWeight: 500 }}>{test.patient}</td>
                  <td>{test.test}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{test.doctor}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{test.date}</td>
                  <td>
                    <span className={`badge badge-${test.status === 'Completed' ? 'success' : test.status === 'In Progress' ? 'warning' : 'danger'}`} style={{
                      background: test.status === 'Pending' ? 'rgba(239, 68, 68, 0.2)' : undefined,
                      color: test.status === 'Pending' ? '#f87171' : undefined,
                      border: test.status === 'Pending' ? '1px solid rgba(239, 68, 68, 0.3)' : undefined,
                    }}>
                      {test.status}
                    </span>
                  </td>
                  <td>
                    {test.result === '-' ? (
                      <span style={{ color: 'var(--text-muted)' }}>Awaiting</span>
                    ) : test.result === 'Normal' ? (
                      <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14} /> Normal</span>
                    ) : (
                      <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FileSearch size={14} /> Abnormal</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: '#60a5fa' }} onClick={() => handleOpenModal(test)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--accent-danger)' }} onClick={() => handleDelete(test.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTests.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No lab tests found.
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
              <h3 style={{ fontSize: '1.25rem' }}>{currentTest ? 'Edit Lab Request' : 'New Lab Request'}</h3>
              <button className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-secondary)' }} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Lab ID</label>
                  <input type="text" className="input-control" value={formData.labId} disabled style={{ opacity: 0.7 }} />
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
                <label>Test Type (e.g. Complete Blood Count)</label>
                <input type="text" className="input-control" value={formData.test} onChange={e => setFormData({...formData, test: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Requested By (Doctor)</label>
                <input type="text" className="input-control" value={formData.doctor} onChange={e => setFormData({...formData, doctor: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Status</label>
                  <select className="input-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Result</label>
                  <select className="input-control" value={formData.result} onChange={e => setFormData({...formData, result: e.target.value})}>
                    <option value="-">- (Awaiting)</option>
                    <option value="Normal">Normal</option>
                    <option value="Abnormal">Abnormal</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" style={{ background: 'var(--bg-tertiary)', color: 'white' }} onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Test Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Laboratory;
