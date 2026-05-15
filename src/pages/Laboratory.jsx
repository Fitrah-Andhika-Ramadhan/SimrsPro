import React, { useState } from 'react';
import { Microscope, FileSearch, Search, Plus, CheckCircle, Clock } from 'lucide-react';

const Laboratory = () => {
  const [labTests, setLabTests] = useState([
    { id: 'LAB-001', patient: 'Sarah Jenkins', test: 'Complete Blood Count', doctor: 'Dr. Smith', date: '2026-05-15', status: 'Completed', result: 'Normal' },
    { id: 'LAB-002', patient: 'Michael Chen', test: 'Lipid Panel', doctor: 'Dr. Adams', date: '2026-05-15', status: 'In Progress', result: '-' },
    { id: 'LAB-003', patient: 'Emily Rodriguez', test: 'Urinalysis', doctor: 'Dr. Lee', date: '2026-05-16', status: 'Pending', result: '-' },
    { id: 'LAB-004', patient: 'James Wilson', test: 'X-Ray Chest', doctor: 'Dr. Smith', date: '2026-05-14', status: 'Completed', result: 'Abnormal' },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Laboratory & Diagnostics</h2>
        <button className="btn btn-primary">
          <Plus size={18} /> New Test Request
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(37, 99, 235, 0.2)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
            <Microscope size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>24</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Tests Today</p>
          </div>
        </div>
        <div className="glass-panel card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)', borderRadius: 'var(--radius-md)' }}>
            <Clock size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem' }}>8</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pending Results</p>
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
              </tr>
            </thead>
            <tbody>
              {labTests.map(test => (
                <tr key={test.id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{test.id}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Laboratory;
