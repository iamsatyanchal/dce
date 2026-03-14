import React, { useEffect, useState } from 'react';
import { ShieldAlert, Scale, FileText, Download, CheckCircle, Info, Gavel, ChevronRight } from 'lucide-react';
import api from '../../services/api';

const Regulation = () => {
  const [antiRaggingDoc, setAntiRaggingDoc] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDoc = async () => {
      try {
        const { data } = await api.get('/documents?category=anti_ragging');
        if (data && data.length > 0) setAntiRaggingDoc(data[0]);
      } catch (error) {
        console.error("Error fetching anti-ragging doc:", error);
      }
    };
    fetchDoc();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const generalRules = [
    "Students must maintain 75% attendance in theory and practical classes separately.",
    "The use of mobile phones in classrooms, labs, and library is strictly prohibited.",
    "Proper dress code must be followed during academic hours and labs.",
    "Any damage to college property will be treated as a serious disciplinary offense.",
    "Identity cards must be carried and displayed at all times within the campus."
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20 reveal">
          <div className="md:w-2/3">
            <div className="flex items-center gap-3 mb-6 bg-[#133b5c]/5 px-4 py-2 rounded-full w-fit">
              <Gavel className="text-[#c6b677]" size={20} />
              <span className="text-[#133b5c] font-bold uppercase tracking-[0.2em] text-xs">Campus Ethics</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#133b5c] mb-6">Rules & Regulations</h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-2xl">
              The following guidelines serve to maintain a disciplined and conducive environment for academic excellence and professional growth at Darbhanga College of Engineering.
            </p>
          </div>
          <button className="bg-[#133b5c] text-white px-8 py-4 rounded-sm font-bold shadow-xl flex items-center gap-3 hover:translate-x-2 transition-all">
            Full Discipline Manual <Download size={20} />
          </button>
        </div>

        {/* Anti-Ragging Section - HIGH PRIORITY */}
        <div className="bg-red-50 rounded-3xl p-10 md:p-16 border border-red-100 mb-20 relative overflow-hidden reveal">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldAlert size={200} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest text-xs mb-6">
              <ShieldAlert size={18} /> Zero Tolerance Policy
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-red-700 mb-8 italic">Anti-Ragging Regulations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 text-red-900/70 text-lg font-light leading-relaxed">
                <p>
                  In accordance with the Hon'ble Supreme Court of India and UGC guidelines, <span className="font-bold">Ragging is strictly prohibited</span> in any form within or outside the DCE Darbhanga campus.
                </p>
                <p>
                  Any student found guilty of ragging and/or abetting ragging shall be liable for severe punishment, including expulsion and criminal prosecution.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-red-200">
                <h4 className="text-red-700 font-bold mb-4 uppercase tracking-widest text-sm">Anti-Ragging Helpline</h4>
                <p className="text-gray-600 text-sm mb-6 font-light">Available 24/7 for students to report any untoward incidents.</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[#133b5c]">
                    <span className="font-bold">Nodal Officer:</span>
                    <span className="font-mono text-red-600">+91-XXXXX-XXXXX</span>
                  </div>
                  <div className="flex justify-between items-center text-[#133b5c]">
                    <span className="font-bold">National Helpline:</span>
                    <span className="font-mono text-red-600">1800-180-5522</span>
                  </div>
                </div>
                <a
                  href={antiRaggingDoc?.fileUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 w-full bg-red-600 text-white py-4 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-all ${!antiRaggingDoc ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  Download Anti-Ragging Affidavit
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* General Guidelines & Conduct */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20 reveal">
          <div>
            <h3 className="text-3xl font-serif font-bold text-[#133b5c] mb-10 border-l-4 border-[#c6b677] pl-8 italic">Academic Conduct</h3>
            <div className="space-y-6">
              {generalRules.map((rule, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="mt-1 bg-[#133b5c]/5 p-2 rounded-full group-hover:bg-[#c6b677] transition-all">
                    <CheckCircle className="text-[#133b5c] group-hover:text-white" size={16} />
                  </div>
                  <p className="text-gray-600 font-light leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-12">
            <div className="bg-[#f8f9fa] p-10 rounded-3xl border border-gray-100">
              <h4 className="text-[#133b5c] font-bold mb-6 uppercase tracking-widest text-xs flex items-center gap-3">
                <FileText className="text-[#c6b677]" size={16} /> Examination Rules
              </h4>
              <p className="text-gray-500 text-sm italic mb-6 leading-relaxed">
                Students must adhere to the BEU Patna examination ordinances. Use of unfair means is punishable by debarment.
              </p>
              <button className="text-[#133b5c] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                View Exam Guidelines <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-[#133b5c] p-10 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform"></div>
              <h4 className="text-[#c6b677] font-bold mb-6 uppercase tracking-widest text-xs flex items-center gap-3">
                <Scale className="text-[#c6b677]" size={16} /> Legal Jurisdiction
              </h4>
              <p className="text-white/60 text-sm italic mb-6 leading-relaxed">
                All administrative decisions of DCE Darbhanga are subject to legal jurisdiction in Darbhanga / Patna Courts only.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-[#f8f9fa] p-8 rounded-2xl flex items-center gap-6 border border-gray-100">
          <div className="bg-white p-3 rounded-xl shadow-sm text-[#133b5c]">
            <Info size={24} />
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em]">Institutional Guidelines | Updated Oct 2025</p>
        </div>

      </div>
    </div >
  );
};

export default Regulation;