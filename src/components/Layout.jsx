import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Activity, Users, Calendar, Settings, LogOut, LayoutDashboard, Pill, CreditCard, Stethoscope, Microscope, BedDouble, BarChart2, Bot, MessageCircle } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'user';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const navItems = [
    { path: '/app/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/app/ai-copilot', icon: <Bot size={20} color="var(--accent-glow)" />, label: 'AI Copilot' },
    { path: '/app/patients', icon: <Users size={20} />, label: 'Patients' },
    { path: '/app/inpatient', icon: <BedDouble size={20} />, label: 'Inpatient (IGD)' },
    { path: '/app/appointments', icon: <Calendar size={20} />, label: 'Appointments' },
    { path: '/app/doctors', icon: <Stethoscope size={20} />, label: 'Doctors' },
    { path: '/app/pharmacy', icon: <Pill size={20} />, label: 'Pharmacy' },
    { path: '/app/laboratory', icon: <Microscope size={20} />, label: 'Laboratory' },
    { path: '/app/billing', icon: <CreditCard size={20} />, label: 'Billing' },
    { path: '/app/reports', icon: <BarChart2 size={20} />, label: 'Reports & Analytics' },
  ];

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Activity size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.025em' }}>SIMRS Pro</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Hospital Management</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'white' : 'var(--text-secondary)',
                background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
              })}
            >
              {item.icon}
              <span style={{ fontWeight: 500 }}>{item.label}</span>
            </NavLink>
          ))}
          
          {userRole === 'admin' && (
            <NavLink
              to="/app/settings"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'white' : 'var(--text-secondary)',
                background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
              })}
            >
              <Settings size={20} />
              <span style={{ fontWeight: 500 }}>Settings (Admin)</span>
            </NavLink>
          )}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
          <button 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-danger)',
              cursor: 'pointer',
              borderRadius: 'var(--radius-md)',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={20} />
            <span style={{ fontWeight: 500, fontSize: '1rem' }}>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content animate-fade-in">
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Here's what's happening at your hospital today.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{userRole === 'admin' ? 'Dr. Admin' : 'Staff User'}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'capitalize' }}>{userRole} Role</p>
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--accent-primary)'
            }}>
              <Users size={20} />
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
