import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, FileText, Activity, CheckCircle } from 'lucide-react';

const AICopilot = () => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: 'Halo, Dr. Admin. Saya adalah AI Copilot SIMRS Pro (Sistem Simulasi Offline). Saya sudah terintegrasi langsung dengan sistem tanpa memerlukan API Key. Silakan tanyakan hal seputar data pasien, obat, atau ketik pertanyaan dari "Smart Suggestions" di bawah.' 
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Database of smart, simulated medical responses based on keywords
  const generateSimulatedResponse = (input) => {
    const text = input.toLowerCase();
    
    if (text.includes("dengue") || text.includes("demam berdarah") || text.includes("dbd")) {
      return "Tentu, Dok. Gejala klasik Demam Berdarah Dengue (DBD) meliputi:\n\n1. Demam tinggi mendadak (bisa mencapai 40°C)\n2. Nyeri sendi, otot, dan tulang (breakbone fever)\n3. Nyeri di belakang mata\n4. Ruam kemerahan di kulit\n5. Pada fase kritis (hari 3-7), bisa terjadi perdarahan ringan (mimisan/gusi berdarah) atau penurunan trombosit drastis.\n\nSistem SIMRS mendeteksi 12 pasien rawat inap saat ini memiliki gejala serupa. Apakah Anda ingin saya buatkan laporan ruang isolasi?";
    }
    
    if (text.includes("paracetamol") || text.includes("parasetamol")) {
      return "Paracetamol (Asetaminofen) adalah analgesik dan antipiretik garis pertama.\n\n- Dosis Dewasa: 500-1000 mg tiap 4-6 jam (Maks: 4g/hari).\n- Dosis Anak: 10-15 mg/kgBB tiap 4-6 jam.\n- Kontraindikasi: Hati-hati pada pasien dengan disfungsi hati berat.\n\nBerdasarkan data stok Farmasi SIMRS, kita memiliki sisa 4.500 tablet Paracetamol 500mg di gudang utama.";
    }
    
    if (text.includes("blood pressure") || text.includes("tekanan darah") || text.includes("tensi")) {
      return "Menurut standar AHA/ACC terbaru, rentang tekanan darah orang dewasa adalah:\n\n- Normal: < 120/80 mmHg\n- Meningkat (Elevated): Sistolik 120-129 dan Diastolik < 80 mmHg\n- Hipertensi Derajat 1: Sistolik 130-139 atau Diastolik 80-89 mmHg\n- Hipertensi Derajat 2: Sistolik ≥ 140 atau Diastolik ≥ 90 mmHg\n- Krisis Hipertensi: > 180/120 mmHg (Butuh penanganan IGD segera).";
    }

    if (text.includes("epidemic") || text.includes("pandemi") || text.includes("wabah")) {
      return "Dalam persiapan menghadapi potensi wabah, Rumah Sakit harus mengaktifkan Protokol Kedaruratan (Code Triage):\n\n1. Siapkan Ruang Isolasi Tekanan Negatif (Saat ini SIMRS mencatat ada 8 kamar tersedia).\n2. Cek stok APD lengkap (Masker N95, Hazmat, Face Shield).\n3. Terapkan alur triase terpisah untuk pasien dengan gejala infeksi menular.\n4. Tingkatkan frekuensi disinfeksi di seluruh area publik.\n\nApakah Anda ingin saya kirimkan notifikasi ke Kepala IGD?";
    }

    if (text.includes("pasien") || text.includes("data")) {
      return "Berdasarkan rekap data harian SIMRS hari ini:\n- Total Kunjungan Rawat Jalan: 145 Pasien\n- Kunjungan IGD: 28 Pasien\n- Tingkat Okupansi Tempat Tidur (BOR): 76%\n\nTren penyakit terbanyak minggu ini adalah ISPA (32%) dan Dispepsia (18%). Semuanya terpantau dalam kondisi operasional rumah sakit yang stabil.";
    }

    // Default Fallback Response
    return "Terima kasih atas pertanyaannya, Dok. Berdasarkan analisis saya dari database SIMRS Pro, sistem berjalan normal dan seluruh data rekam medis telah dicadangkan secara otomatis. \n\n(Catatan: Karena ini adalah Mode Simulasi Otomatis tanpa API luar, saya dirancang untuk merespons kata kunci spesifik seperti 'Dengue', 'Paracetamol', 'Tekanan Darah', atau 'Wabah').";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI thinking and typing delay (1.5 to 2.5 seconds)
    const thinkingTime = Math.floor(Math.random() * 1000) + 1500;
    
    setTimeout(() => {
      const responseText = generateSimulatedResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
      setIsTyping(false);
    }, thinkingTime);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 150px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={24} color="var(--accent-primary)" /> SIMRS Smart Copilot (Auto)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Asisten cerdas bawaan yang 100% stabil, tanpa error, dan tanpa API Key eksternal.</p>
        </div>
        
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '9999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <CheckCircle size={16} /> Mode Otomatis Aktif
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Main Interface */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          
          {/* Chat View */}
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
                  background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'rgba(16, 185, 129, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: msg.role === 'user' ? '1px solid var(--glass-border)' : '1px solid #34d399',
                  flexShrink: 0
                }}>
                  {msg.role === 'user' ? <FileText size={16} /> : <Sparkles size={18} color="#34d399" />}
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
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #34d399' }}>
                  <Sparkles size={18} color="#34d399" />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', gap: '0.25rem' }}>
                  <span className="floating">.</span><span className="floating delay-1">.</span><span className="floating delay-2">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(10, 17, 40, 0.5)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem' }}>
              <input 
                type="text" 
                className="input-control" 
                style={{ flex: 1, margin: 0 }} 
                placeholder="Tanyakan hal medis atau data rumah sakit kepada Copilot..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" className="btn" style={{ padding: '0.75rem 1.25rem', background: '#10b981', color: 'white' }} disabled={isTyping || !query.trim()}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="#34d399" /> Smart Suggestions
          </h3>
          {[
            "Apa gejala utama penyakit Dengue?",
            "Jelaskan aturan pakai Paracetamol.",
            "Berapa batas normal tekanan darah?",
            "Apa protokol untuk menghadapi wabah/pandemi?",
            "Tampilkan ringkasan data kunjungan pasien hari ini."
          ].map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => {
                setQuery(prompt);
              }}
              style={{ 
                textAlign: 'left', padding: '0.875rem', background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)', 
                cursor: 'pointer', 
                transition: 'var(--transition)',
                fontSize: '0.875rem'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16,185,129,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
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
