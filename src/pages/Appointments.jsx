import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, FileText } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Sarah Jenkins', doctor: 'Dr. Smith', date: '2026-05-16', time: '10:00 AM', status: 'Scheduled', type: 'Checkup' },
    { id: 2, patient: 'Michael Chen', doctor: 'Dr. Adams', date: '2026-05-16', time: '11:30 AM', status: 'Scheduled', type: 'Follow-up' },
    { id: 3, patient: 'Emily Rodriguez', doctor: 'Dr. Lee', date: '2026-05-15', time: '02:15 PM', status: 'Completed', type: 'Consultation' },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Appointment Schedule</h2>
        <button className="btn btn-primary">
          <CalendarIcon size={18} /> New Appointment
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {appointments.map(app => (
          <div key={app.id} className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{app.patient}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={14} /> {app.doctor}
                </p>
              </div>
              <span className={`badge badge-${app.status === 'Completed' ? 'success' : 'info'}`} style={{
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
              <button className="btn" style={{ flex: 1, background: 'var(--bg-tertiary)', color: 'white', padding: '0.5rem' }}>Reschedule</button>
              <button className="btn" style={{ flex: 1, background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '0.5rem' }}>Mark Done</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
