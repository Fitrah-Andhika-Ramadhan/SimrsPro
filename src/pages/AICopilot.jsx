import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, FileText, Activity, CheckCircle, HeartPulse, User } from 'lucide-react';

const AICopilot = () => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: 'Halo! Saya adalah AI Assistant SIMRS Pro (Mode Offline). Saya dirancang khusus untuk membantu menjawab pertanyaan Anda tanpa gangguan koneksi. \n\nAnda bisa menyapa saya, bertanya seputar masalah kesehatan, obat, jadwal dokter, prosedur rawat inap, atau data rumah sakit kita!' 
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // DATABASE SIMULASI OFFLINE (KATA KUNCI & JAWABAN)
  const generateSimulatedResponse = (input) => {
    const text = input.toLowerCase();
    
    // 1. SAPAAN & KABAR
    if (text.match(/^(halo|hai|hey|hi|helo)/)) {
      return "Halo! Selamat datang di layanan SIMRS Pro. Ada yang bisa saya bantu terkait jadwal dokter, informasi pasien, atau konsultasi kesehatan singkat hari ini?";
    }
    if (text.includes("selamat pagi")) return "Selamat pagi! Semoga hari Anda sehat selalu. Ada informasi rumah sakit yang Anda butuhkan?";
    if (text.includes("selamat siang")) return "Selamat siang! Butuh bantuan mengecek antrean poli atau sekadar info kesehatan?";
    if (text.includes("selamat malam")) return "Selamat malam! Layanan IGD kami beroperasi 24 jam. Ada yang bisa saya bantu?";
    if (text.includes("apa kabar") || text.includes("gimana kabarmu")) {
      return "Kabar saya sangat baik dan sistem SIMRS berjalan 100% lancar hari ini! Bagaimana dengan kesehatan Anda? Jangan lupa minum air putih yang cukup ya.";
    }
    if (text.includes("terima kasih") || text.includes("makasih") || text.includes("thanks")) {
      return "Sama-sama! Senang bisa membantu Anda. Jika ada pertanyaan lain seputar pelayanan kami, jangan ragu untuk bertanya.";
    }
    if (text.includes("siapa kamu") || text.includes("kamu siapa")) {
      return "Saya adalah AI Copilot SIMRS Pro. Asisten virtual mandiri yang siap membantu Anda menjawab info kesehatan dan menavigasi data operasional Rumah Sakit ini.";
    }

    // 2. OBROLAN TENTANG KESEHATAN UMUM
    if (text.includes("pusing") || text.includes("sakit kepala")) {
      return "Sakit kepala bisa disebabkan oleh kurang tidur, dehidrasi, stres, atau ketegangan mata. \n\nTips awal:\n1. Istirahat sejenak di ruangan yang gelap & tenang.\n2. Minum air putih hangat.\n3. Jika berlanjut, Anda bisa mengonsumsi Paracetamol.\n\nNamun, jika sakit kepala terasa sangat hebat dan disertai muntah, segera buat janji dengan Poli Saraf kami.";
    }
    if (text.includes("demam") || text.includes("panas")) {
      return "Gejala demam (suhu > 37.5°C) adalah tanda tubuh sedang melawan infeksi. \n\nSaran penanganan pertama:\n- Kompres dengan air hangat (bukan air dingin).\n- Perbanyak asupan cairan (air, kuah sup, jus).\n- Minum obat penurun panas (Paracetamol) sesuai dosis.\n\nJika demam tidak turun lebih dari 3 hari, sebaiknya segera periksakan ke Poli Umum.";
    }
    if (text.includes("batuk") || text.includes("pilek") || text.includes("flu")) {
      return "Untuk batuk dan pilek ringan:\n- Istirahat yang cukup.\n- Gunakan masker agar tidak menularkan ke orang lain.\n- Minum air hangat dicampur madu dan lemon untuk melegakan tenggorokan.\n- Jika batuk berdahak kuning/hijau atau sesak napas, disarankan untuk konsultasi dengan dokter paru.";
    }
    if (text.includes("dengue") || text.includes("demam berdarah") || text.includes("dbd")) {
      return "Gejala Demam Berdarah Dengue (DBD):\n1. Demam tinggi mendadak (2-7 hari).\n2. Nyeri sendi, otot, dan di belakang mata.\n3. Muncul bintik merah di kulit.\n\nJika mengalami ini, segera ke IGD SIMRS Pro agar kami bisa melakukan cek darah (trombosit & hematokrit) secara cepat.";
    }
    if (text.includes("darah tinggi") || text.includes("hipertensi") || text.includes("tensi")) {
      return "Hipertensi sering disebut 'Silent Killer'. Batas normal tensi orang dewasa adalah 120/80 mmHg.\n\nCara mencegah/mengontrol:\n1. Kurangi konsumsi garam harian.\n2. Olahraga rutin (30 menit sehari).\n3. Kurangi stres.\n\nDi aplikasi SIMRS, Anda bisa membuat jadwal rutin dengan Poli Penyakit Dalam untuk pemantauan tensi.";
    }
    if (text.includes("asam lambung") || text.includes("gerd") || text.includes("maag")) {
      return "Gejala asam lambung naik (GERD) meliputi dada terasa terbakar (heartburn), mual, dan mulut terasa pahit.\n\nTips:\n- Hindari makanan pedas, asam, dan berlemak tinggi.\n- Jangan langsung berbaring setelah makan (tunggu 2-3 jam).\n- Makan dalam porsi kecil tapi sering.";
    }
    if (text.includes("paracetamol") || text.includes("parasetamol") || text.includes("obat")) {
      return "Paracetamol adalah obat umum untuk pereda nyeri dan penurun panas.\n- Dosis Dewasa: 500-1000 mg per 4-6 jam.\n- Jangan gunakan melebihi 4 gram sehari karena dapat membebani kerja fungsi hati.\nPastikan Anda membeli obat di Instalasi Farmasi kami yang terjamin keasliannya.";
    }

    // 3. BERKAITAN DENGAN DATA WEB/RUMAH SAKIT UNTUK PASIEN & ADMIN
    if (text.includes("jadwal dokter") || text.includes("dokter spesialis")) {
      return "Di SIMRS Pro, jadwal Poli Spesialis beroperasi dari Senin - Sabtu (08:00 - 16:00).\n\nDokter unggulan kami hari ini:\n- Dr. Andi (Sp. Penyakit Dalam) - Ruang 101\n- Dr. Sarah (Sp. Anak) - Ruang 204\n- Dr. Budi (Sp. Bedah) - Ruang 305\n\nAnda dapat memesan antrean secara langsung melalui menu 'Appointments' di sebelah kiri.";
    }
    if (text.includes("rawat inap") || text.includes("inpatient") || text.includes("kamar")) {
      return "Data Rawat Inap SIMRS hari ini:\n- Total Kapasitas Kamar: 120 Bed\n- Kamar Terisi (BOR): 75% (90 Bed)\n- Kelas VIP & VVIP: Tersedia 4 kamar.\n- Ruang Isolasi: Tersedia 2 kamar.\n\nUntuk detail registrasi ruang rawat, silakan masuk ke menu 'Inpatient (IGD)' pada bilah navigasi kiri.";
    }
    if (text.includes("igd") || text.includes("gawat darurat") || text.includes("emergency")) {
      return "Instalasi Gawat Darurat (IGD) SIMRS Pro buka 24 Jam non-stop dengan fasilitas lengkap:\n- 2 Ruang Resusitasi\n- 8 Bed Observasi\n- Tim Bedah Siaga\n- Layanan Ambulance On-Call\n\nJika dalam keadaan darurat, mohon segera hubungi hotline (021) 119-SIMRS.";
    }
    if (text.includes("laboratorium") || text.includes("lab") || text.includes("cek darah")) {
      return "Layanan Laboratorium Patologi Klinik kami menyediakan:\n- Cek Darah Lengkap (Hematologi)\n- Profil Lipid (Kolesterol)\n- Fungsi Hati & Ginjal\n- Tes Gula Darah Puasa (GDP)\n\nHasil lab terintegrasi langsung dengan Rekam Medis Elektronik Anda di sistem kami dan bisa dilihat dalam 2-4 jam.";
    }
    if (text.includes("pasien") || text.includes("jumlah kunjungan") || text.includes("statistik")) {
      return "Statistik SIMRS Hari Ini:\n- Kunjungan Rawat Jalan: 154 Pasien\n- Kunjungan IGD: 32 Pasien\n- Pasien Sembuh (Pulang): 18 Pasien\n- Kasus tertinggi minggu ini: ISPA dan Dispepsia.\n\nData ini sepenuhnya ter-update secara real-time pada menu 'Dashboard'.";
    }
    if (text.includes("farmasi") || text.includes("apotek")) {
      return "Instalasi Farmasi pusat beroperasi 24 jam untuk melayani resep rawat jalan maupun rawat inap. Stok obat kritis (Life-saving drugs) terpantau aman (100% ketersediaan). Sistem E-Resep (E-Prescribing) sudah berjalan sehingga Anda tidak perlu membawa kertas resep secara fisik.";
    }
    if (text.includes("pembayaran") || text.includes("bpjs") || text.includes("asuransi") || text.includes("billing")) {
      return "Sistem Billing SIMRS melayani:\n1. Pembayaran Mandiri (Debit/Credit/QRIS)\n2. Pasien BPJS Kesehatan (Terintegrasi V-Claim)\n3. Asuransi Swasta rekanan (AdMedika, dll)\n\nSilakan kunjungi loket Billing di lantai 1 atau cek menu 'Billing' di dashboard jika Anda menggunakan akun Admin.";
    }

    // Default Fallback Response
    return "Maaf, saya belum memahami pertanyaan Anda secara detail. \n\nNamun, jika Anda membutuhkan bantuan seputar:\n- Gejala penyakit (contoh: 'Saya sakit kepala', 'Gejala demam berdarah')\n- Informasi Rumah Sakit (contoh: 'Jadwal dokter', 'Kamar rawat inap', 'Layanan IGD')\nSilakan ketik ulang kata kunci tersebut agar saya bisa merespons dengan tepat!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI thinking and typing delay (1.0 to 2.5 seconds)
    const thinkingTime = Math.floor(Math.random() * 1500) + 1000;
    
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
            <Bot size={24} color="var(--accent-primary)" /> AI Assistant (Mode Pintar)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Asisten Virtual terintegrasi yang siap menjawab pertanyaan operasional dan konsultasi kesehatan dasar.</p>
        </div>
        
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: '9999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <CheckCircle size={16} /> Online (No API Key Required)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Main Chat Interface */}
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
                  background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'rgba(59, 130, 246, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: msg.role === 'user' ? '1px solid var(--glass-border)' : '1px solid #60a5fa',
                  flexShrink: 0
                }}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={18} color="#60a5fa" />}
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
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #60a5fa' }}>
                  <Bot size={18} color="#60a5fa" />
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
                placeholder="Sapa AI, tanya seputar kesehatan, atau data rumah sakit..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }} disabled={isTyping || !query.trim()}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="glass-panel card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--accent-secondary)" /> Topik Tersedia
          </h3>
          {[
            "Halo selamat pagi!",
            "Apa kabarmu hari ini?",
            "Saya sedang sakit kepala dan pusing.",
            "Apa saja gejala Demam Berdarah?",
            "Berapa tensi darah tinggi?",
            "Bagaimana cara mengatasi Asam Lambung?",
            "Tolong info jadwal dokter spesialis.",
            "Bagaimana ketersediaan kamar rawat inap?",
            "Apakah bisa pakai asuransi / BPJS?"
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

export default AICopilot;
