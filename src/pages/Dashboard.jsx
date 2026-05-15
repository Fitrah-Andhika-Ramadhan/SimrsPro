import React from 'react';
import { Users, Calendar, Activity, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Patients', value: '1,248', icon: <Users size={24} />, color: 'var(--accent-primary)', trend: '+12%' },
    { label: 'Appointments Today', value: '42', icon: <Calendar size={24} />, color: 'var(--accent-secondary)', trend: '+5%' },
    { label: 'Active Staff', value: '86', icon: <Activity size={24} />, color: 'var(--accent-warning)', trend: '0%' },
    { label: 'Revenue (Monthly)', value: '$124k', icon: <TrendingUp size={24} />, color: '#8b5cf6', trend: '+18%' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel card" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '-20px', 
              right: '-20px', 
              width: '100px', 
              height: '100px', 
              background: `radial-gradient(circle, ${stat.color} 0%, transparent 70%)`,
              opacity: 0.1,
              borderRadius: '50%'
            }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ 
                background: `${stat.color}20`, 
                color: stat.color, 
                padding: '0.75rem', 
                borderRadius: 'var(--radius-md)' 
              }}>
                {stat.icon}
              </div>
              <span className="badge" style={{ 
                background: stat.trend.startsWith('+') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                color: stat.trend.startsWith('+') ? '#34d399' : 'var(--text-secondary)'
              }}>
                {stat.trend}
              </span>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Charts Placeholder */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1.5rem' 
      }}>
        <div className="glass-panel card">
          <div className="card-header">
            <h3 style={{ fontSize: '1.125rem' }}>Recent Appointments</h3>
            <button className="btn" style={{ background: 'transparent', color: 'var(--accent-primary)', fontSize: '0.875rem', padding: '0.5rem' }}>View All</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Sarah Jenkins', doc: 'Dr. Smith', time: 'Today, 10:00 AM', status: 'Completed', type: 'success' },
                  { name: 'Michael Chen', doc: 'Dr. Adams', time: 'Today, 11:30 AM', status: 'In Progress', type: 'warning' },
                  { name: 'Emily Rodriguez', doc: 'Dr. Lee', time: 'Today, 02:15 PM', status: 'Scheduled', type: 'default' },
                  { name: 'James Wilson', doc: 'Dr. Smith', time: 'Tomorrow, 09:00 AM', status: 'Scheduled', type: 'default' }
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{row.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{row.doc}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{row.time}</td>
                    <td>
                      <span className={`badge badge-${row.type === 'default' ? 'info' : row.type}`} style={{
                        background: row.type === 'default' ? 'rgba(59, 130, 246, 0.2)' : undefined,
                        color: row.type === 'default' ? '#60a5fa' : undefined,
                        border: row.type === 'default' ? '1px solid rgba(59, 130, 246, 0.3)' : undefined,
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel card">
          <div className="card-header">
            <h3 style={{ fontSize: '1.125rem' }}>System Status</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></div>
                <span style={{ fontSize: '0.875rem' }}>GCP Database</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Connected</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></div>
                <span style={{ fontSize: '0.875rem' }}>Authentication API</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Operational</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-warning)' }}></div>
                <span style={{ fontSize: '0.875rem' }}>Storage Bucket</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>90% Full</span>
            </div>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <h4 style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#60a5fa' }}>GCP Integration Ready</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Firebase config structure is set up in src/firebase.js. Update the config with your GCP credentials to enable cloud syncing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
