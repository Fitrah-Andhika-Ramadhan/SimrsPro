import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User, Clock, PhoneCall, ShieldAlert, CheckCircle } from 'lucide-react';

const LiveChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      sender: 'system', 
      text: 'Selamat datang di SIMRS Internal Live Chat. Sambungan dienkripsi secara end-to-end.',
      time: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      sender: 'it-support',
      name: 'Budi (IT Support)',
      text: 'Halo Dok, perbaikan jaringan di Poliklinik sudah selesai. Silakan cek apakah sistem antrean sudah berjalan normal?',
      time: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage = {
      sender: 'user',
      name: 'Anda',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate auto-reply from IT or Staff after 2 seconds
    setTimeout(() => {
      const autoReply = {
        sender: 'it-support',
        name: 'Siska (Helpdesk)',
        text: 'Baik, pesan Anda sudah diterima. Kami akan segera menindaklanjuti laporan ini. Tiket #SIMRS-' + Math.floor(Math.random() * 9000 + 1000) + ' telah dibuat.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 150px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={24} color="var(--accent-primary)" /> Internal Live Chat
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Komunikasi instan antar staf medis dan departemen IT SIMRS.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <ShieldAlert size={16} /> Lapor Insiden
          </button>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '9999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <span style={{ width: '8px', height: '8px', background: '#34d399', borderRadius: '50%', display: 'inline-block' }}></span> Online
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Sidebar Contacts */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
            Departemen
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(37, 99, 235, 0.1)', borderLeft: '3px solid var(--accent-primary)', borderRadius: '0 8px 8px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'var(--accent-primary)', color: 'white', padding: '0.25rem', borderRadius: '50%' }}>
                <MessageSquare size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>IT Helpdesk</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Online (2 Staf)</div>
              </div>
            </div>

            <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.7 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem', borderRadius: '50%' }}>
                <PhoneCall size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Farmasi Pusat</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Offline</div>
              </div>
            </div>

            <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.7 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem', borderRadius: '50%' }}>
                <User size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Lab Radiologi</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sibuk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', background: 'rgba(10, 17, 40, 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                IT
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', margin: 0 }}>IT Helpdesk</h3>
                <span style={{ fontSize: '0.75rem', color: '#34d399' }}>Budi & Siska merespons dalam ±2 menit</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: msg.sender === 'system' ? 'center' : (msg.sender === 'user' ? 'flex-end' : 'flex-start'),
                marginBottom: '0.5rem'
              }}>
                
                {msg.sender === 'system' ? (
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {msg.text}
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', padding: '0 0.5rem' }}>
                      {msg.name} • {msg.time}
                    </div>
                    <div style={{ 
                      background: msg.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                      padding: '0.75rem 1rem', 
                      borderRadius: '12px', 
                      maxWidth: '75%',
                      border: msg.sender === 'user' ? 'none' : '1px solid var(--glass-border)',
                      lineHeight: 1.5,
                      borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                      borderTopLeftRadius: msg.sender === 'it-support' ? '2px' : '12px',
                    }}>
                      {msg.text}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(10, 17, 40, 0.5)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem' }}>
              <input 
                type="text" 
                className="input-control" 
                style={{ flex: 1, margin: 0, background: 'rgba(255,255,255,0.05)' }} 
                placeholder="Ketik pesan untuk Helpdesk..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }} disabled={!message.trim()}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveChat;
