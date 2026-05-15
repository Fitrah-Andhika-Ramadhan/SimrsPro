import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, HeartPulse, Shield, Zap, Database, BarChart3, Users, Stethoscope } from 'lucide-react';

const LandingPage = () => {
  return (
    <>
      <div className="mesh-bg"></div>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Navigation */}
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1.5rem 5%', 
          background: 'rgba(5, 10, 21, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--glass-border)',
          position: 'fixed',
          width: '100%',
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <Activity size={24} color="white" />
            </div>
            <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.025em', color: 'white' }}>SIMRS Pro</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" className="btn" style={{ color: 'var(--text-secondary)' }}>
              Staff Login
            </Link>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
              Patient Portal <ArrowRight size={16} />
            </Link>
          </div>
        </nav>

        {/* Hero Section (Asymmetric) */}
        <main style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: '10rem 5% 4rem',
          position: 'relative'
        }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '4rem', 
            maxWidth: '1300px', 
            width: '100%',
            alignItems: 'center',
            marginBottom: '6rem'
          }}>
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', background: 'rgba(37, 99, 235, 0.1)', 
                color: 'var(--accent-glow)', borderRadius: '9999px',
                fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem',
                border: '1px solid rgba(37, 99, 235, 0.2)'
              }}>
                <Zap size={14} /> System v2.0 is Live
              </div>
              
              <h1 style={{ fontSize: '4.5rem', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                Next-Gen <br />
                <span className="text-gradient-accent">Healthcare</span> <br />
                Intelligence.
              </h1>
              
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '500px', lineHeight: 1.6 }}>
                Abandon legacy constraints. Orchestrate your entire medical facility with a cloud-native platform designed for speed, security, and scale.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/login" className="btn btn-primary" style={{ padding: '1.125rem 2.5rem', fontSize: '1.125rem' }}>
                  Enter System
                </Link>
                <Link to="/login" className="btn" style={{ padding: '1.125rem 2.5rem', fontSize: '1.125rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                  View Demo
                </Link>
              </div>
            </div>

            {/* Right Content - Abstract Dashboard Mockup */}
            <div className="animate-fade-in-up delay-2" style={{ position: 'relative', height: '500px' }}>
              {/* Main Floating Card */}
              <div className="glass-panel floating" style={{ 
                position: 'absolute', top: '20px', right: '0', 
                width: '80%', padding: '2rem', zIndex: 2,
                background: 'rgba(10, 17, 40, 0.6)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ width: '40%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                  <div style={{ width: '20%', height: '12px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ flex: 1, height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}></div>
                  <div style={{ flex: 1, height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}></div>
                  <div style={{ flex: 1, height: '80px', background: 'rgba(37, 99, 235, 0.2)', borderRadius: '8px', border: '1px solid var(--accent-primary)' }}></div>
                </div>
                <div style={{ width: '100%', height: '150px', background: 'linear-gradient(to top, rgba(37, 99, 235, 0.1), transparent)', borderRadius: '8px', borderBottom: '2px solid var(--accent-primary)' }}></div>
              </div>

              {/* Secondary Floating Card */}
              <div className="glass-panel floating-delayed" style={{ 
                position: 'absolute', bottom: '20px', left: '0', 
                width: '60%', padding: '1.5rem', zIndex: 3,
                background: 'rgba(16, 23, 42, 0.8)',
                border: '1px solid rgba(20, 184, 166, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-teal)' }}></div>
                  <div>
                    <div style={{ width: '120px', height: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '4px', marginBottom: '6px' }}></div>
                    <div style={{ width: '80px', height: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status</span>
                  <span className="badge badge-success">Recovered</span>
                </div>
              </div>

              {/* Decorative Blur behind mockup */}
              <div style={{ 
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '300px', height: '300px', background: 'var(--accent-primary)',
                filter: 'blur(100px)', opacity: 0.2, zIndex: 1
              }}></div>
            </div>
          </div>

          {/* Bento Box Features Section */}
          <div style={{ maxWidth: '1300px', width: '100%', marginTop: '4rem' }} className="animate-fade-in-up delay-3">
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Enterprise Architecture.</h2>
            
            <div className="bento-grid">
              
              <div className="bento-item bento-col-2 bento-row-2" style={{ background: 'linear-gradient(145deg, rgba(16,23,42,0.9), rgba(5,10,21,0.9))' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}><Database size={40} /></div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>GCP Native Integration</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6, flex: 1 }}>
                  Built from the ground up to leverage Google Cloud Platform. Enjoy sub-millisecond latency for patient queries, infinite scaling during peak hours, and military-grade encryption for all medical records.
                </p>
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(37,99,235,0.1)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>Uptime SLA</span>
                  <span style={{ color: 'white' }}>99.999%</span>
                </div>
              </div>

              <div className="bento-item" style={{ borderTop: '2px solid var(--accent-teal)' }}>
                <div style={{ color: 'var(--accent-teal)', marginBottom: '1rem' }}><HeartPulse size={32} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>EMR System</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Advanced Electronic Medical Records with complete audit trails.</p>
              </div>

              <div className="bento-item">
                <div style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }}><BarChart3 size={32} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Live Analytics</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Real-time telemetry on hospital revenue, bed occupancy, and staff load.</p>
              </div>

              <div className="bento-item bento-col-2" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--accent-warning)', marginBottom: '1rem' }}><Shield size={32} /></div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Role-Based Access Control</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Granular permissions for Admins, Doctors, Pharmacists, and Receptionists.</p>
                </div>
                <div style={{ display: 'flex', gap: '-10px' }}>
                  {/* Avatar pile simulation */}
                  {[1,2,3].map(i => (
                    <div key={i} style={{ 
                      width: '48px', height: '48px', borderRadius: '50%', 
                      background: `var(--bg-tertiary)`, border: '2px solid var(--bg-primary)',
                      marginLeft: i > 1 ? '-16px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}><Users size={20} color="var(--text-secondary)" /></div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
        
        <footer style={{ padding: '2.5rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Activity size={18} /> <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>SIMRS Pro</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Advanced Healthcare Systems. Powered by GCP.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
