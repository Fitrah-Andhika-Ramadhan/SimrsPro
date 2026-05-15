import React from 'react';
import { BedDouble, Users, UserPlus, DoorOpen } from 'lucide-react';

const Inpatient = () => {
  const wards = [
    { id: 'W-A01', type: 'ICU', capacity: 10, occupied: 8, nurse: 'Nurse Ratched' },
    { id: 'W-B01', type: 'General', capacity: 20, occupied: 15, nurse: 'Nurse Joy' },
    { id: 'W-C01', type: 'Pediatric', capacity: 15, occupied: 12, nurse: 'Nurse Chapel' },
    { id: 'W-D01', type: 'Maternity', capacity: 10, occupied: 4, nurse: 'Nurse Hathaway' },
  ];

  const patients = [
    { name: 'Sarah Jenkins', ward: 'W-A01', bed: 'Bed 03', admission: '2026-05-10', status: 'Stable' },
    { name: 'David Kim', ward: 'W-B01', bed: 'Bed 12', admission: '2026-05-12', status: 'Critical' },
    { name: 'Emily Rodriguez', ward: 'W-D01', bed: 'Bed 01', admission: '2026-05-14', status: 'Discharging' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Inpatient Management (Rawat Inap)</h2>
        <button className="btn btn-primary">
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
            
            {/* Progress Bar */}
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
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
                  <td>
                    <button className="btn" style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', fontSize: '0.75rem' }}>
                      Transfer
                    </button>
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

export default Inpatient;
