import React, { useState, useEffect } from 'react';
import { Users, Ticket, Monitor, Printer, Clock, BellRing, ArrowRight, UserPlus, Stethoscope, Pill, CreditCard, Activity } from 'lucide-react';

const QueueSystem = () => {
  // Mock initial queue data
  const initialQueues = {
    umum: { name: 'Poli Umum', prefix: 'A', currentServing: 24, totalWaiting: 5, icon: <Stethoscope size={24} /> },
    gigi: { name: 'Poli Gigi', prefix: 'B', currentServing: 12, totalWaiting: 3, icon: <Activity size={24} /> },
    anak: { name: 'Poli Anak', prefix: 'C', currentServing: 8, totalWaiting: 2, icon: <UserPlus size={24} /> },
    farmasi: { name: 'Apotek / Farmasi', prefix: 'F', currentServing: 45, totalWaiting: 8, icon: <Pill size={24} /> },
    kasir: { name: 'Kasir / Billing', prefix: 'K', currentServing: 30, totalWaiting: 4, icon: <CreditCard size={24} /> },
  };

  const [queues, setQueues] = useState(initialQueues);
  const [myTicket, setMyTicket] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [calledTicket, setCalledTicket] = useState(null);

  // Simulate ticket calling every 15-20 seconds for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly pick a queue to advance
      const queueKeys = Object.keys(queues);
      const randomKey = queueKeys[Math.floor(Math.random() * queueKeys.length)];
      
      setQueues(prev => {
        const queue = prev[randomKey];
        if (queue.totalWaiting > 0) {
          const nextServing = queue.currentServing + 1;
          
          // Show calling notification
          setCalledTicket(`${queue.prefix}-${nextServing.toString().padStart(3, '0')}`);
          setTimeout(() => setCalledTicket(null), 5000);
          
          return {
            ...prev,
            [randomKey]: {
              ...queue,
              currentServing: nextServing,
              totalWaiting: queue.totalWaiting - 1
            }
          };
        }
        return prev;
      });
    }, 12000); // Trigger a call every 12 seconds for the wow effect

    return () => clearInterval(interval);
  }, [queues]);

  const handleTakeTicket = (key) => {
    setIsPrinting(true);
    
    setTimeout(() => {
      const queue = queues[key];
      const newTicketNumber = queue.currentServing + queue.totalWaiting + 1;
      
      const ticket = {
        department: queue.name,
        number: `${queue.prefix}-${newTicketNumber.toString().padStart(3, '0')}`,
        currentServing: `${queue.prefix}-${queue.currentServing.toString().padStart(3, '0')}`,
        waitingCount: queue.totalWaiting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      };
      
      // Update queue state
      setQueues(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          totalWaiting: prev[key].totalWaiting + 1
        }
      }));
      
      setMyTicket(ticket);
      setIsPrinting(false);
    }, 1500); // 1.5s print delay
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', paddingBottom: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Ticket size={28} color="var(--accent-primary)" /> Sistem Antrean Terpadu
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Kiosk Pengambilan Nomor Antrean & Monitor Panggilan (Real-time)</p>
        </div>
        
        {/* Calling Notification Banner */}
        {calledTicket && (
          <div style={{ 
            background: 'var(--accent-primary)', color: 'white', padding: '0.5rem 1.5rem', 
            borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem',
            animation: 'pulse 1.5s infinite', fontWeight: 'bold', boxShadow: '0 0 15px rgba(37,99,235,0.5)'
          }}>
            <BellRing size={20} />
            PANGGILAN KEPADA NOMOR: {calledTicket}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
        
        {/* LEFT PANEL: KIOSK TICKET MACHINE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel card" style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Pilih Layanan Rumah Sakit</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Sentuh salah satu tombol di bawah untuk mengambil tiket antrean Anda.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {Object.entries(queues).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleTakeTicket(key)}
                  disabled={isPrinting}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: isPrinting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    if(!isPrinting) {
                      e.currentTarget.style.background = 'rgba(37, 99, 235, 0.1)';
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if(!isPrinting) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{ 
                    width: '60px', height: '60px', borderRadius: '50%', 
                    background: 'rgba(37, 99, 235, 0.15)', color: 'var(--accent-glow)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {data.icon}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>{data.name}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>Menunggu: {data.totalWaiting} orang</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* MONITOR WAITING ROOM (BOTTOM) */}
          <div className="glass-panel card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <Monitor size={20} color="var(--accent-secondary)" />
              <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Layar Monitor Antrean (Live)</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
              {Object.entries(queues).map(([key, data]) => (
                <div key={key} style={{ 
                  background: 'rgba(10, 17, 40, 0.6)', borderRadius: '12px', padding: '1rem',
                  borderTop: `3px solid var(--accent-primary)`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {data.name}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', letterSpacing: '2px' }}>
                    {data.prefix}-{data.currentServing.toString().padStart(3, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: TICKET RESULT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="glass-panel card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
            
            {isPrinting ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <Printer size={48} className="floating" color="var(--accent-primary)" />
                <p>Mencetak tiket antrean Anda...</p>
              </div>
            ) : myTicket ? (
              <div style={{ 
                background: 'white', width: '100%', borderRadius: '8px', padding: '1.5rem',
                color: '#1e293b', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                position: 'relative'
              }}>
                {/* Ticket Styling */}
                <div style={{ borderBottom: '2px dashed #cbd5e1', paddingBottom: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>SIMRS Pro Hospital</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Jl. Kesehatan Raya No. 123</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>{myTicket.date} • {myTicket.time}</p>
                </div>
                
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' }}>
                    {myTicket.department}
                  </p>
                  <h1 style={{ margin: 0, fontSize: '3.5rem', fontWeight: '900', color: '#2563eb', letterSpacing: '2px' }}>
                    {myTicket.number}
                  </h1>
                </div>
                
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '6px', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Antrean Dilayani:</span>
                    <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{myTicket.currentServing}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Sisa Antrean:</span>
                    <span style={{ fontWeight: 'bold', color: '#ef4444' }}>{myTicket.waitingCount} Orang</span>
                  </div>
                </div>
                
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <p style={{ margin: 0 }}>Harap menunggu panggilan.</p>
                  <p style={{ margin: '0.25rem 0 0 0' }}>Budayakan antre untuk kenyamanan bersama.</p>
                </div>
                
                {/* Decorative cutouts */}
                <div style={{ position: 'absolute', top: '50%', left: '-10px', width: '20px', height: '20px', background: 'var(--bg-primary)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', top: '50%', right: '-10px', width: '20px', height: '20px', background: 'var(--bg-primary)', borderRadius: '50%' }}></div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <Ticket size={64} style={{ opacity: 0.2, margin: '0 auto 1rem auto' }} />
                <p>Tiket Anda akan muncul di sini</p>
              </div>
            )}
            
          </div>
          
          {myTicket && !isPrinting && (
            <button 
              onClick={() => setMyTicket(null)}
              className="btn"
              style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
            >
              Ambil Tiket Baru
            </button>
          )}
          
        </div>

      </div>
    </div>
  );
};

export default QueueSystem;
