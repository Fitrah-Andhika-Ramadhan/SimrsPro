import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, FileText, Activity, CheckCircle, HeartPulse, User, ShieldCheck, Bell, MessageSquare } from 'lucide-react';

const LiveChat = () => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [toast, setToast] = useState(null);
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      text: 'Halo! Selamat datang di layanan Live Chat SIMRS Pro. Saya adalah asisten bot (Customer Service) yang siap melayani Anda 24/7. \n\nSilakan sampaikan keluhan Anda, atau tanyakan informasi terkait jadwal dokter, rawat inap, IGD, maupun layanan rumah sakit lainnya.' 
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isAdminTyping]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  // DATABASE SIMULASI OFFLINE (KATA KUNCI BOT)
  const generateSimulatedResponse = (input) => {
    const text = input.toLowerCase();
    
    // 1. SAPAAN & KABAR
    if (text.match(/^(halo|hai|hey|hi|helo)/)) {
      return "Halo! Ada yang bisa saya bantu terkait jadwal dokter, pendaftaran pasien, atau konsultasi layanan hari ini?";
    }
    if (text.includes("selamat pagi")) return "Selamat pagi! Semoga hari Anda sehat selalu. Ada informasi rumah sakit yang Anda butuhkan?";
    if (text.includes("selamat siang")) return "Selamat siang! Butuh bantuan mengecek antrean poli atau sekadar info fasilitas?";
    if (text.includes("selamat malam")) return "Selamat malam! Layanan IGD kami beroperasi 24 jam. Apakah ini kondisi darurat?";
    if (text.includes("terima kasih") || text.includes("makasih") || text.includes("thanks")) {
      return "Sama-sama! Senang bisa membantu Anda. Jika ada keluhan lain, jangan ragu untuk menghubungi layanan Live Chat ini kembali.";
    }

    // 2. OBROLAN KESEHATAN UMUM / FAQ PASIEN
    if (text.includes("pusing") || text.includes("sakit kepala")) {
      return "Jika Anda sering merasa pusing atau sakit kepala berlebih, kami menyarankan untuk beristirahat yang cukup. Namun jika berlanjut lebih dari 3 hari, silakan daftarkan diri Anda ke Poli Umum/Saraf agar dokter dapat memeriksa tekanan darah dan kondisi fisik Anda secara langsung.";
    }
    if (text.includes("demam") || text.includes("panas")) {
      return "Untuk pertolongan pertama pada demam, perbanyak minum air putih dan gunakan kompres hangat. Anda bisa meminum obat penurun panas (seperti Paracetamol) sesuai dosis anjuran. Bila demam > 3 hari, sebaiknya lakukan cek lab (hematologi).";
    }
    if (text.includes("dengue") || text.includes("demam berdarah") || text.includes("dbd")) {
      return "Penyakit Demam Berdarah Dengue (DBD) memerlukan penanganan segera jika disertai tanda bahaya seperti muntah terus-menerus, pendarahan gusi, atau tubuh terasa sangat lemas. Kami sarankan segera menuju IGD kami untuk dilakukan tes Trombosit.";
    }
    if (text.includes("darah tinggi") || text.includes("hipertensi") || text.includes("tensi")) {
      return "Apakah Anda memiliki riwayat hipertensi sebelumnya? Sangat penting untuk rutin memantau tensi (batas normal < 120/80 mmHg). Anda dapat mendaftarkan diri ke Poli Penyakit Dalam untuk konsultasi lebih intensif mengenai asupan obat-obatan.";
    }
    if (text.includes("asam lambung") || text.includes("gerd") || text.includes("maag")) {
      return "Untuk mengurangi gejala asam lambung naik, hindari makanan yang terlalu asam, pedas, atau berlemak, serta hindari langsung berbaring setelah makan. Jika keluhan berlanjut, hubungi dokter Poli Penyakit Dalam untuk mendapatkan resep penetral asam lambung (seperti Omeprazole/Antasida).";
    }

    // 3. LAYANAN RUMAH SAKIT
    if (text.includes("jadwal dokter") || text.includes("dokter spesialis")) {
      return "Jadwal operasional Poli Spesialis adalah Senin - Sabtu (08:00 - 16:00 WIB).\n\nDokter unggulan kami hari ini:\n- Dr. Andi (Sp. Penyakit Dalam) - Ruang 101\n- Dr. Sarah (Sp. Anak) - Ruang 204\n- Dr. Budi (Sp. Bedah) - Ruang 305\n\nAnda dapat memesan nomor antrean secara online melalui menu Pendaftaran Pasien.";
    }
    if (text.includes("rawat inap") || text.includes("inpatient") || text.includes("kamar")) {
      return "Informasi Kamar Rawat Inap SIMRS hari ini:\n- Kelas VIP & VVIP: Tersedia 4 kamar.\n- Kelas 1 & 2: Tersedia 20 kamar.\n- Kelas 3: Penuh.\n\nUntuk detail registrasi ruang rawat atau tarif per malam, silakan tanyakan kepada Admin Admission di lobi utama.";
    }
    if (text.includes("igd") || text.includes("gawat darurat") || text.includes("emergency")) {
      return "Instalasi Gawat Darurat (IGD) kami BUKA 24 JAM. Jika Anda dalam kondisi gawat darurat atau membutuhkan evakuasi Ambulans segera, silakan hubungi hotline Call Center di (021) 119-SIMRS.";
    }
    if (text.includes("laboratorium") || text.includes("lab") || text.includes("cek darah")) {
      return "Layanan Laboratorium Patologi Klinik kami buka 24 jam untuk melayani tes darah rutin, fungsi hati, ginjal, hingga swab antigen/PCR. Hasil lab bisa diakses secara online oleh pasien melalui rekam medis elektronik.";
    }
    if (text.includes("farmasi") || text.includes("apotek") || text.includes("obat")) {
      return "Apotek / Instalasi Farmasi kami beroperasi 24 jam. Jika Anda sudah diperiksa oleh dokter, resep Anda akan otomatis masuk ke sistem E-Resep. Anda tinggal mendatangi loket Farmasi di Lantai 1 untuk pengambilan obat.";
    }
    if (text.includes("pembayaran") || text.includes("bpjs") || text.includes("asuransi") || text.includes("billing")) {
      return "SIMRS Pro menerima berbagai jenis metode pembayaran:\n1. BPJS Kesehatan (Harap siapkan rujukan aktif dari faskes 1).\n2. Asuransi Swasta Rekanan (AdMedika, dll).\n3. Pasien Umum / Mandiri (Debit/Kredit/QRIS).\nPastikan berkas jaminan Anda sudah divalidasi oleh petugas pendaftaran.";
    }

    // Default Fallback Response -> Return null to trigger Admin Live Agent routing
    return null;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setQuery('');
    setIsTyping(true);

    const thinkingTime = Math.floor(Math.random() * 1000) + 1000;
    
    setTimeout(() => {
      const responseText = generateSimulatedResponse(userMessage);
      
      if (responseText) {
        // Bot found a FAQ match
        setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
        setIsTyping(false);
      } else {
        // Unrecognized question -> Route to Human Admin
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: "Pesan Anda telah kami terima. Namun, keluhan/pertanyaan ini memerlukan tindak lanjut khusus dari pihak manajemen rumah sakit.\n\nSistem sedang menghubungkan Anda dengan staf Admin. Mohon tunggu sebentar..." 
        }]);
        setIsTyping(false);
        setIsAdminTyping(true);

        // Simulate Human Admin joining after 4 seconds
        setTimeout(() => {
          showToast("Admin dr. Farhan (CS) telah bergabung ke obrolan.");
          
          setTimeout(() => {
            setIsAdminTyping(false);
            setMessages(prev => [...prev, {
              role: 'admin',
              text: `Selamat siang, saya dr. Farhan (Admin Customer Service). Saya telah membaca keluhan Anda mengenai "${userMessage}".\n\nTerkait masalah tersebut, bolehkah saya meminta detail tambahan seperti Nomor Rekam Medis (RM) atau data identitas Anda agar saya bisa segera melakukan pengecekan ke dalam sistem rumah sakit?`
            }]);
          }, 2000); // Admin types for 2s after joining
          
        }, 4000);
      }
    }, thinkingTime);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 150px)', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 50,
          background: 'var(--accent-primary)', color: 'white',
          padding: '0.75rem 1.5rem', borderRadius: '8px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <Bell size={18} />
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{toast}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={24} color="var(--accent-primary)" /> Live Chat Pasien & Admin
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pusat Bantuan Cepat. Terintegrasi dengan Bot Otomatis dan Staf Admin Rumah Sakit.</p>
        </div>
        
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '9999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <CheckCircle size={16} /> Layanan Online 24/7
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Main Chat Interface */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', position: 'relative' }}>
          
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
                  background: msg.role === 'user' ? 'var(--bg-tertiary)' : (msg.role === 'admin' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: msg.role === 'user' ? '1px solid var(--glass-border)' : (msg.role === 'admin' ? '1px solid #10b981' : '1px solid #60a5fa'),
                  flexShrink: 0
                }}>
                  {msg.role === 'user' ? <User size={16} /> : (msg.role === 'admin' ? <ShieldCheck size={18} color="#10b981" /> : <Bot size={18} color="#60a5fa" />)}
                </div>
                <div style={{ 
                  background: msg.role === 'user' ? 'var(--bg-tertiary)' : (msg.role === 'admin' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(10, 17, 40, 0.5)'),
                  padding: '1rem', borderRadius: '12px', maxWidth: '85%',
                  border: msg.role === 'user' ? 'none' : (msg.role === 'admin' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--glass-border)'),
                  lineHeight: 1.6,
                  borderTopLeftRadius: msg.role === 'bot' || msg.role === 'admin' ? '2px' : '12px',
                  borderTopRightRadius: msg.role === 'user' ? '2px' : '12px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.role === 'admin' && <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>dr. Farhan (Admin CS)</div>}
                  {msg.text}
                </div>
              </div>
            ))}
            
            {(isTyping || isAdminTyping) && (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: isAdminTyping ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  border: isAdminTyping ? '1px solid #10b981' : '1px solid #60a5fa' 
                }}>
                  {isAdminTyping ? <ShieldCheck size={18} color="#10b981" /> : <Bot size={18} color="#60a5fa" />}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                  {isAdminTyping && <span style={{ color: '#10b981', marginRight: '0.5rem' }}>Admin sedang mengetik balasan</span>}
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
                placeholder="Tanyakan keluhan, info poli, atau bicara dengan Admin..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isTyping || isAdminTyping}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }} disabled={isTyping || isAdminTyping || !query.trim()}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--accent-secondary)" /> Keluhan / Info Cepat
          </h3>
          {[
            "Halo selamat siang!",
            "Saya merasa pusing terus menerus.",
            "Apa prosedur untuk tes laboratorium?",
            "Bagaimana ketersediaan kamar VIP?",
            "Apakah bisa berobat menggunakan BPJS?",
            "Saya punya keluhan serius soal dokter!" // This triggers the admin routing
          ].map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => {
                setQuery(prompt);
              }}
              style={{ 
                textAlign: 'left', padding: '0.75rem 0.875rem', background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)', 
                cursor: 'pointer', 
                transition: 'var(--transition)',
                fontSize: '0.875rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <HeartPulse size={14} color="var(--accent-glow)" /> {prompt}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LiveChat;
