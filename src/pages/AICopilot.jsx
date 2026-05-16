import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Send, FileText, Activity, Key, CheckCircle, AlertCircle } from 'lucide-react';
import Anthropic from '@anthropic-ai/sdk';

const AICopilot = () => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello, Dr. Admin. I am your Medical AI Assistant powered by Anthropic Claude. I can assist you with patient data analysis, medical summaries, and system predictions.' }
  ]);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);

  useEffect(() => {
    // Check if API key exists in local storage
    const storedKey = localStorage.getItem('CLAUDE_API_KEY');
    if (storedKey) {
      setApiKey(storedKey);
      setIsApiKeySet(true);
    }
  }, []);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('CLAUDE_API_KEY', apiKey);
      setIsApiKeySet(true);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim() || !isApiKeySet) return;

    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setQuery('');
    setIsTyping(true);

    try {
      const anthropic = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Required since we are calling it directly from Vite client
      });

      // Prepare chat history (convert text to content)
      const chatHistory = messages
        .filter((msg, index) => !(index === 0 && msg.role === 'assistant')) // Remove the initial greeting to keep context clean
        .map(msg => ({
          role: msg.role,
          content: msg.text
        }));

      // Add the new user message
      chatHistory.push({ role: 'user', content: userMessage });

      const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307", // Fast, highly capable model
        max_tokens: 1024,
        system: "You are SIMRS Pro Copilot, a highly advanced, professional medical AI assistant integrated into a modern Hospital Management System. You help doctors and hospital administrators by analyzing medical data, summarizing patient records, and giving operational advice. Always respond in a professional, clinical, yet helpful tone.",
        messages: chatHistory
      });

      const aiResponse = msg.content[0].text;
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);

    } catch (error) {
      console.error("Claude Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `Error connecting to Claude API: ${error.message}. Please check your API key.` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 150px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={24} color="var(--accent-primary)" /> SIMRS AI Copilot
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Next-gen clinical decision support powered by Anthropic Claude.</p>
        </div>
        
        {isApiKeySet ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => { localStorage.removeItem('CLAUDE_API_KEY'); setIsApiKeySet(false); setApiKey(''); }} className="btn" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              Clear API Key
            </button>
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '9999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <Sparkles size={16} /> Claude Connected
            </div>
          </div>
        ) : (
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', borderRadius: '9999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <AlertCircle size={16} /> API Key Required
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Main Interface */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          
          {!isApiKeySet ? (
            // API Key Configuration View
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--accent-primary)' }}>
                <Key size={32} color="var(--accent-glow)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Connect Anthropic Claude</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px' }}>
                To activate the real AI Copilot, please enter your Claude API Key. Your key is stored securely in your browser's local storage and is never sent to our servers.
              </p>
              <form onSubmit={handleSaveApiKey} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="password" 
                  className="input-control" 
                  placeholder="sk-ant-api03-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  <CheckCircle size={18} /> Save & Connect
                </button>
              </form>
            </div>
          ) : (
            // Chat View
            <>
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
                      border: msg.role === 'user' ? '1px solid var(--glass-border)' : '1px solid var(--accent-primary)',
                      flexShrink: 0
                    }}>
                      {msg.role === 'user' ? <FileText size={16} /> : <Bot size={18} color="var(--accent-glow)" />}
                    </div>
                    <div style={{ 
                      background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'rgba(10, 17, 40, 0.5)',
                      padding: '1rem', borderRadius: '12px', maxWidth: '85%',
                      border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)',
                      lineHeight: 1.6,
                      borderTopLeftRadius: msg.role === 'assistant' ? '2px' : '12px',
                      borderTopRightRadius: msg.role === 'user' ? '2px' : '12px',
                      whiteSpace: 'pre-wrap'
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
                    placeholder="Ask Claude about patient symptoms, diagnoses, or operational data..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isTyping}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }} disabled={isTyping || !query.trim()}>
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--accent-secondary)" /> Smart Suggestions
          </h3>
          {[
            "What are the typical symptoms of Dengue Fever?",
            "Write a brief summary of paracetamol usage.",
            "Can you explain normal blood pressure ranges?",
            "What should a hospital prepare for an epidemic?"
          ].map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => {
                if(isApiKeySet) setQuery(prompt);
              }}
              style={{ 
                textAlign: 'left', padding: '0.875rem', background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)',
                color: isApiKeySet ? 'var(--text-secondary)' : 'var(--text-muted)', 
                cursor: isApiKeySet ? 'pointer' : 'not-allowed', 
                transition: 'var(--transition)',
                fontSize: '0.875rem'
              }}
              onMouseOver={(e) => { if(isApiKeySet) { e.currentTarget.style.background = 'rgba(37,99,235,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
              onMouseOut={(e) => { if(isApiKeySet) { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
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
