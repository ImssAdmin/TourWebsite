import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Award, Scale, HelpCircle, Layers, MapPin, CheckSquare, 
  Share2, ChevronRight, X, Sparkles, MessageSquare, Briefcase 
} from "lucide-react";
import { translations } from "../../utils/translations";
import { loadCustomData } from "../../utils/customizationStore";

interface BusinessVisaViewProps {
  lang: "en" | "bn";
  onNavigate: (id: string) => void;
}

export default function BusinessVisaView({ lang, onNavigate }: BusinessVisaViewProps) {
  const t = translations[lang];

  // Load custom backend media and texts
  const [customData, setCustomData] = useState(() => loadCustomData());

  React.useEffect(() => {
    const handleUpdate = () => {
      setCustomData(loadCustomData());
    };
    window.addEventListener("customDataUpdated", handleUpdate);
    return () => {
      window.removeEventListener("customDataUpdated", handleUpdate);
    };
  }, []);

  // Business Modal state
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const programs = customData.businessPrograms || [];

  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setSelectedMarket(null);
      setFullName("");
      setPhone("");
    }, 4500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-20 font-sans">
      
      {/* ================= HERO EDITORIAL BANNER ================= */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-slate-950 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/25 uppercase">
              <Building2 className="w-4 h-4 text-blue-250 animate-pulse" />
              <span>{lang === "en" ? "Corporate & Angel Investment Division" : "কর্পোরেট ইনভেস্টর শাখা"}</span>
            </div>
            
            <h1 className="font-sans font-black text-3.5xl md:text-5xl text-white tracking-tight">
              {lang === "en" ? customData.businessTitleEn : customData.businessTitleBn}
            </h1>
            <p className="text-blue-105 text-sm sm:text-base max-w-2xl leading-relaxed text-blue-105/90 font-light">
              {lang === "en" ? customData.businessSubtitleEn : customData.businessSubtitleBn}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN DUAL-COLUMN GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-3 gap-12">
        
        {/* Left Side: Business Streams list */}
        <div className="lg:col-span-2 space-y-12">
          
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-205 border-slate-200 pb-3 flex items-center gap-2">
            <Layers className="w-5.5 h-5.5 text-blue-600" />
            <span>{t.business.destinationsTitle}</span>
          </h2>

          <div className="space-y-8">
            {programs.map((prog) => (
              <div 
                key={prog.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-blue-500/40 hover:shadow-lg transition-all duration-300 space-y-6 pb-6"
                id={`business-block-${prog.id}`}
              >
                
                {/* Elegant Location Image Cover with Flag Overlay */}
                <div className="relative h-44 md:h-52 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={prog.image} 
                    alt={lang === "en" ? prog.nameEn : prog.nameBn} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-6 flex items-center gap-3 text-white">
                    <span className="text-3xl bg-white/10 backdrop-blur-sm rounded-xl p-1 shadow-md shrink-0 block border border-white/20 leading-none">{prog.flag}</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-white drop-shadow-sm">
                        {lang === "en" ? prog.nameEn : prog.nameBn}
                      </h3>
                      <p className="text-[10px] text-blue-200 font-bold tracking-widest uppercase">
                        {lang === "en" ? "Corporate Program Direct" : "কর্পোরেট ইনভেস্টর কোটা"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 md:px-8 space-y-6">
                  {/* Highlight bar */}
                  <div className="border-b border-slate-100 pb-3">
                    <p className="text-xs text-blue-600 font-bold leading-normal">{lang === "en" ? prog.highlightEn : prog.highlightBn}</p>
                  </div>

                  {/* Capital requirements limits */}
                  <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">Required Minimum Investment / মূলধন সীমা:</span>
                      <strong className="text-blue-750 text-blue-700 text-sm">{lang === "en" ? prog.capitalEn : prog.capitalBn}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">Initial Visa Validity Duration / প্রাথমিক মেয়াদ:</span>
                      <strong className="text-slate-800">{lang === "en" ? prog.visaValidityEn : prog.visaValidityBn}</strong>
                    </div>
                  </div>

                  {/* Points details List */}
                  <div className="space-y-3">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {lang === "en" ? "Compulsory Legal Pillars:" : "আইনি যোগ্যতা ও আবশ্যকীয় কন্ডিশনস:"}
                    </span>
                    <ul className="space-y-2">
                      {((lang === "en" ? prog.pointsEn : prog.pointsBn) || []).map((pt: string, i: number) => (
                        <li key={i} className="flex gap-2.5 items-start text-[11.5px] text-slate-650 text-slate-600 leading-relaxed">
                          <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span className="font-light">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Submit Trigger Panel */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono uppercase">
                      LICENSED CORPORATE IMMIGRATION AGENT DESK
                    </span>

                    <button
                      onClick={() => setSelectedMarket(lang === "en" ? prog.nameEn : prog.nameBn)}
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md duration-200 cursor-pointer"
                    >
                      {t.business.consultationCta}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Advisory checklist and company trust details */}
        <div className="space-y-8">
          
          {/* Section 1: Business Advisory Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-slate-205 border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              {lang === "en" ? "Our Legal Services for Businessmen" : "উদ্যোক্তা ও ব্যবসায়ী সেবা সমূহ"}
            </h3>

            <p className="text-xs text-slate-550 leading-relaxed font-light text-slate-500">
              {lang === "en"
                ? "Establishing subsidiary business bodies or transferring executive positions requires robust notarization of Bangladesh tax certificates."
                : "ব্যবসা স্থানান্তর বা বিদেশী কোম্পানি শেয়ার রেজিস্ট্রেশনের জন্য বাংলাদেশের প্রোপাইটারশিপ বা অংশীদারি ব্যবসার ৩ বছরের আইনি ট্যাক্স অডিট ক্লিয়ারেন্স থাকা আবশ্যক।"}
            </p>

            <ul className="space-y-3 text-xs text-slate-600">
              {[
                { title: lang === "en" ? "Company Setup & Incorporation" : "বিদেশি কোম্পানি আইনসম্মত খোলা", desc: lang === "en" ? "Drafting flawless articles of association and registrar setup." : "সংশ্লিষ্ট দেশের কোম্পানি রেজিস্ট্রারে সরাসরি ট্রেড লাইসেন্স বা ডিরেক্টরশিপ রেজিস্ট্রি।" },
                { title: lang === "en" ? "Flawless business planning" : "বিজনেস ইন্টেন্ট ও ফিনান্সিয়াল ফোরকাস্ট", desc: lang === "en" ? "Formulating localized detailed proposals matching embassy codes." : "নতুন দেশে ব্যবসার ফিজিবিলিটি ও মার্কেট ডিমান্ড কভার ফাইল তৈরি।" },
                { title: lang === "en" ? "Trade Summits Invitation Clearance" : "ট্রেড সামিট ইনভাইটেশন ক্লিয়ারেন্স", desc: lang === "en" ? "Sponsoring professional corporate invitation badges." : "অ্যাম্বেসি ক্লিয়ারেন্স বাড়াতে শীর্ষ কর্পোরেট বডির অফিসিয়াল লেটার অব রিলে।" }
              ].map((chk, i) => (
                <li key={i} className="flex gap-3 items-start p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">{chk.title}</span>
                    <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">{chk.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Experienced counseling */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4.5 h-4.5 text-blue-600" />
              <span>{lang === "en" ? "Advisory Legality Guarantee" : "আইনি প্রতিরক্ষা নিশ্চয়তা"}</span>
            </h3>
            
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              {lang === "en"
                ? "Ideal Sky Tours partners with supreme legal advocates in London, Toronto, and Schengen zones ensuring total fidelity and genuine application files."
                : "আইডিয়াল স্কাই ট্যুরস সরাসরি কানাডা, ইউকে ও ইউরোপের নামকরা লিগ্যাল ব্যারিস্টার প্যানেলের মাধ্যমে প্রতিটি ভেঞ্চার কোম্পানির প্রোফাইল রেজিষ্ট্রি সম্পন্ন করে।"
              }
            </p>
          </div>

          {/* Section 3: Video (if exists in customData) */}
          {customData.businessVideoUrl && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
                {lang === "en" ? "Business Insights" : "বিজনেস প্রসেসিং বিষয়ক তথ্য"}
              </h3>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-md border border-slate-200">
                <iframe
                  src={customData.businessVideoUrl.includes('youtube.com/embed') ? customData.businessVideoUrl : `https://www.youtube.com/embed/${customData.businessVideoUrl}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ================= BUSINESS ASSESSSMENT INTERACTIVE LEAD MODAL ================= */}
      <AnimatePresence>
        {selectedMarket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMarket(null)}
              className="absolute inset-0 bg-slate-900/45 backdrop-blur-xs"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 relative z-10 shadow-2xl space-y-5 text-slate-800"
              id="business-apply-modal"
            >
              <button 
                onClick={() => setSelectedMarket(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-105 border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                  {lang === "en" ? "Business Program Selected:" : "নির্বাচিত ইনভেস্টমেন্ট স্কিম:"}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  {selectedMarket}
                </h3>
              </div>

              {!successMsg ? (
                <form onSubmit={handleCorporateSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {t.contact.nameLabel}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === "en" ? "e.g., Ahsan Habib Chowdhury" : "উদা: আহসান হাবীব চৌধুরী"}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 transition-colors focus:outline-none"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {t.contact.phoneLabel}
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g., +880 1712-XXXXXX"
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 transition-colors focus:outline-none"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md duration-200 active:scale-95"
                    >
                      {lang === "en" ? "Request Corporate Call" : "ব্যবসায়িক পরামর্শের জন্য অনুরোধ পাঠান"}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 text-center space-y-3.5"
                >
                  <Award className="w-12 h-12 text-green-600 mx-auto animate-bounce pb-1" />
                  <div className="text-xs font-bold font-sans">
                    {t.common.successAlert}
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
