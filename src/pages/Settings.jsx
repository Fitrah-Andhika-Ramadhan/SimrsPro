import React, { useState } from 'react';
import { Save, Building, Globe, Shield, Database, Users } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    hospitalName: 'SIMRS Pro Regional Hospital',
    email: 'contact@simrspro.com',
    phone: '+62 800-1234-5678',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    gcpSync: true,
    autoBackup: true,
    timezone: 'Asia/Jakarta'
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings successfully updated!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>System Settings</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage hospital preferences and system configurations.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Settings Navigation */}
        <div className="glass-panel card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'general', label: 'General Info', icon: <Building size={18} /> },
            { id: 'system', label: 'System & GCP', icon: <Database size={18} /> },
            { id: 'security', label: 'Security', icon: <Shield size={18} /> },
            { id: 'users', label: 'User Management', icon: <Users size={18} /> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: activeTab === tab.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'var(--transition)',
                fontWeight: activeTab === tab.id ? 500 : 400,
                borderLeft: activeTab === tab.id ? '3px solid var(--accent-primary)' : '3px solid transparent'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Forms */}
        <div className="glass-panel card" style={{ padding: '2rem' }}>
          
          {activeTab === 'general' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                Hospital Information
              </h3>
              <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Hospital/Clinic Name</label>
                  <input 
                    type="text" 
                    className="input-control" 
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Contact Email</label>
                  <input 
                    type="email" 
                    className="input-control" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    className="input-control" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Address</label>
                  <textarea 
                    className="input-control" 
                    rows="3" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                System & Cloud Integrations (GCP)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>Google Cloud Firestore Sync</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Automatically sync patient and appointment data to GCP.</p>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.gcpSync} onChange={(e) => setFormData({...formData, gcpSync: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>Automated Daily Backups</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Backup database to GCP Storage Bucket at 00:00 every day.</p>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.autoBackup} onChange={(e) => setFormData({...formData, autoBackup: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                  </label>
                </div>

                <div className="input-group" style={{ marginTop: '1rem' }}>
                  <label>System Timezone</label>
                  <select 
                    className="input-control" 
                    value={formData.timezone}
                    onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                  >
                    <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                    <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                    <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                Security Settings
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Enforce strict security policies for staff access.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn" style={{ background: 'var(--bg-tertiary)', width: 'fit-content' }}>Force Password Reset for All Users</button>
                <button className="btn" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', width: 'fit-content' }}>Enable Two-Factor Authentication (2FA)</button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                <h3 style={{ fontSize: '1.25rem' }}>User Management</h3>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>+ Add User</button>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
                    <th style={{ padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Role</th>
                    <th style={{ padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ fontWeight: 500 }}>Dr. Admin</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@simrs.com</div>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>Administrator</td>
                    <td style={{ padding: '1rem 0.75rem' }}><span className="badge badge-success">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ fontWeight: 500 }}>Staff User</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>user@simrs.com</div>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>Receptionist</td>
                    <td style={{ padding: '1rem 0.75rem' }}><span className="badge badge-success">Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
