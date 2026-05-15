import React, { useState } from 'react';
import { Bot, Sparkles, Send, FileText, Activity } from 'lucide-react';

const AICopilot = () => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello, Dr. Admin. I am your GCP-powered Medical AI Assistant. You can ask me to analyze lab results, predict patient bed occupancy, or check drug interactions.' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages([...messages, { role: 'user', text: query }]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "Based on the clinical database, the symptoms suggest a possible viral infection. Recommend ordering a Complete Blood Count (CBC).";
      if (query.toLowerCase().includes('lab')) {
        aiResponse = "Analyzing Lab LAB-004 (X-Ray Chest): Abnormalities detected in the lower right lobe. Recommend follow-up CT Scan and pulmonology consultation.";
      } else if (query.toLowerCase().includes('stock')) {
        aiResponse = "Pharmacy Alert: Vitamin C 1000mg is currently Out of Stock. Amoxicillin 250mg is at critical levels (45 units). Would you like me to draft a restock order?";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 150px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={24} color="var(--accent-primary)" /> SIMRS AI Copilot
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Next-gen clinical decision support system.</p>
        </div>
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '9999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <Sparkles size={16} /> Online
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Chat Interface */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: '1rem', 
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'rgba(37, 99, 235, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: msg.role === 'user' ? '1px solid var(--glass-border)' : '1px solid var(--accent-primary)'
                }}>
                  {msg.role === 'user' ? <FileText size={16} /> : <Bot size={18} color="var(--accent-glow)" />}
                </div>
                <div style={{ 
                  background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'rgba(10, 17, 40, 0.5)',
                  padding: '1rem', borderRadius: '12px', maxWidth: '80%',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)',
                  lineHeight: 1.5,
                  borderTopLeftRadius: msg.role === 'ai' ? '2px' : '12px',
                  borderTopRightRadius: msg.role === 'user' ? '2px' : '12px',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-primary)' }}>
                  <Bot size={18} color="var(--accent-glow)" />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', gap: '0.25rem' }}>
                  <span className="floating">.</span><span className="floating delay-1">.</span><span className="floating delay-2">.</span>
                </div>
              </div>
            )}
          </div>
          
          <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(10, 17, 40, 0.5)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem' }}>
              <input 
                type="text" 
                className="input-control" 
                style={{ flex: 1, margin: 0 }} 
                placeholder="Ask AI about patients, lab results, or pharmacy stock..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--accent-secondary)" /> Smart Suggestions
          </h3>
          {[
            "Summarize LAB-004 results",
            "Check current pharmacy stock",
            "Predict bed occupancy for next week",
            "Check interactions for Amoxicillin"
          ].map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => setQuery(prompt)}
              style={{ 
                textAlign: 'left', padding: '0.875rem', background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)', cursor: 'pointer', transition: 'var(--transition)',
                fontSize: '0.875rem'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              "{prompt}"
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AICopilot;
