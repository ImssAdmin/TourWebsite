import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, BookOpen, Clock, Calendar, CheckSquare, 
  MapPin, DollarSign, Award, ChevronRight, X, PhoneCall
} from "lucide-react";
import { translations } from "../../utils/translations";
import { loadCustomData } from "../../utils/customizationStore";

interface StudentVisaViewProps {
  lang: "en" | "bn";
  onNavigate: (id: string) => void;
}

export default function StudentVisaView({ lang, onNavigate }: StudentVisaViewProps) {
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

  // Apply Now modal state
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [ielts, setIelts] = useState("6.5");
  const [successMsg, setSuccessMsg] = useState(false);

  const countriesData = customData.studentCountries || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setSelectedCountry(null);
      setFullName("");
      setPhone("");
    }, 4500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-20 font-sans">
      
      {/* ================= EDITORIAL BANNER SECTION ================= */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-slate-950 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/25 uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>{lang === "en" ? "Academic Placement Division" : "স্টুডেন্ট অ্যাডমিশন শাখা"}</span>
            </div>
            
            <h1 className="font-sans font-black text-3.5xl md:text-5xl text-white tracking-tight">
              {lang === "en" ? customData.studentTitleEn : customData.studentTitleBn}
            </h1>
            <p className="text-blue-105 text-sm sm:text-base max-w-2xl leading-relaxed text-blue-105/90 font-light">
              {lang === "en" ? customData.studentSubtitleEn : customData.studentSubtitleBn}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN DUAL-COLUMN GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-3 gap-12">
        
        {/* Left Side: Country listings & "Apply Now" triggers (Col span 2) */}
        <div className="lg:col-span-2 space-y-10">
          
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-blue-600" />
            <span>{lang === "en" ? "Accredited University Destinations" : "অন্যতম শীর্ষ একাডেমিক গন্তব্যসমূহ"}</span>
          </h2>

          <div className="space-y-8">
            {countriesData.map((country: any) => (
              <div 
                key={country.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:border-blue-500/40 hover:shadow-lg transition-all duration-300 space-y-6 pb-6"
                id={`country-block-${country.id}`}
              >
                {/* Elegant Destination Image with Flag Overlay */}
                <div className="relative h-44 md:h-52 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={country.image} 
                    alt={lang === "en" ? country.nameEn : country.nameBn} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 flex items-center gap-3 text-white">
                    <span className="text-3xl bg-white/10 backdrop-blur-sm rounded-xl p-1 shadow-md shrink-0 block border border-white/20 leading-none">{country.flag}</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-white drop-shadow-sm">
                        {lang === "en" ? country.nameEn : country.nameBn}
                      </h3>
                      <p className="text-[10px] text-blue-200 font-bold tracking-widest uppercase">
                        {lang === "en" ? "Academic Pathway" : "একাডেমিক পাথওয়ে"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 md:px-8 space-y-6">
                  {/* Tagline / Description */}
                  <div className="border-b border-slate-100 pb-3">
                    <p className="text-xs text-blue-600 font-bold leading-normal">{lang === "en" ? country.taglineEn : country.taglineBn}</p>
                  </div>

                {/* Grid details (Intakes, Costs, IELTS) */}
                <div className="grid sm:grid-cols-3 gap-5 text-xs">
                  
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Intakes / সেমিস্টার:</span>
                    <span className="font-bold text-slate-800">{lang === "en" ? country.intakesEn : country.intakesBn}</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Tuition costs / টিউশন ফি:</span>
                    <span className="font-bold text-blue-700">{lang === "en" ? country.costRangeEn : country.costRangeBn}</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Min IELTS requirement:</span>
                    <span className="font-bold text-slate-800">{lang === "en" ? country.ieltsRequirementEn : country.ieltsRequirementBn}</span>
                  </div>

                </div>

                {/* Key Benefits */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                    {lang === "en" ? "Post-Study & Settlement Benefits:" : "পড়াশোনা পরবর্তী সুযোগ-সুবিধা:"}
                  </h4>
                  <ul className="space-y-2">
                    {(lang === "en" ? (country.incentivesEn || []) : (country.incentivesBn || [])).map((inc: string, i: number) => (
                      <li key={i} className="flex gap-2.5 items-start text-[11.5px] text-slate-600">
                        <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-normal font-light">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA and Free Assessment triggers */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                  <span className="text-[10.5px] font-mono text-slate-400">
                    DHAKA EMBASSY APPOINTMENT REGISTERED
                  </span>
                  
                  <button
                    onClick={() => setSelectedCountry(lang === "en" ? country.nameEn : country.nameBn)}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer"
                  >
                    {t.student.applyNow}
                  </button>
                </div>

              </div>
            </div>
          ))}
          </div>

        </div>

        {/* Right Side: Eligibility Checklist & General Application Process */}
        <div className="space-y-8">
          
          {/* Section 1: Academic Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-slate-205 border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              {t.student.entryRequirements}
            </h3>
            
            <ul className="space-y-3 text-xs text-slate-600">
              {[
                { title: lang === "en" ? "Transcripts & Certificates" : "শিক্ষাগত সনদপত্র এবং মার্কশিট", desc: lang === "en" ? "HSC, Bachelor or Masters certified mark sheets." : "এসএসসি/এইচএসসি ও অর্জিত ডিগ্রি সমূহের মূল কপি।" },
                { title: lang === "en" ? "Language Proficiency Proof" : "ভাষা দক্ষতার সনদ ও স্কোরকার্ড", desc: lang === "en" ? "IELTS, Duolingo, PTE overall target records." : "কাঙ্ক্ষিত আইএলটিএস অথবা পিটিই (PTE) স্কোর।" },
                { title: lang === "en" ? "Sponsorship & Bank Guarantee" : "স্পন্সর অ্যাকাউন্ট এবং ব্যাংক সলভেন্সি", desc: lang === "en" ? "At least 28-day old funds in standard accounts." : "যেকোনো বাণিজ্যিক ব্যাংকে ২৮ দিন মেয়াদি সলভেন্সি স্টেটমেন্ট।" },
                { title: lang === "en" ? "Purpose of Intention SOP" : "উদ্দেশ্য সংবলিত স্টেটমেন্ট (SOP)", desc: lang === "en" ? "Statement of purpose explaining return pathways." : "কেন এই সাবজেক্টে ও দেশে পড়বেন তার যৌক্তিক ফাইল এসওপি।" }
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

          {/* Section 2: Relocation timeline steps */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              {t.student.processTimelineTitle}
            </h3>

            <div className="relative border-l border-slate-200 ml-3.5 space-y-6">
              {[
                { step: "1", title: lang === "en" ? "Profile Counselling & Assessment" : "১. প্রোফাইল যাচাইকরণ ও ক্যারিয়ার কাউন্সেলিং" },
                { step: "2", title: lang === "en" ? "University Offer Letter & Admisson" : "২. সাবজেক্ট সিলেক্ট ও অফার লেটার সংগ্রহ" },
                { step: "3", title: lang === "en" ? "Bank solvency and sponsorship files" : "৩. ব্যাংক গ্যারান্টি এবং প্রয়োজনীয় ফাইল প্রসেসিং" },
                { step: "4", title: lang === "en" ? "Visa Application & Biometrics Setup" : "৪. অ্যাম্বেসিতে ফাইল সাবমিশন ও বায়োমেট্রিক প্রদান" },
                { step: "5", title: lang === "en" ? "Pre-departure flight mapping" : "৫. প্রি-ডিপার্চার ফ্লাইট ও বাসস্থান সাজানো" }
              ].map((step, idx) => (
                <div key={idx} className="relative pl-6">
                  <span className="absolute -left-3.5 top-0 bg-blue-105 bg-white border border-blue-600 font-bold font-sans text-[10px] text-blue-600 w-6 h-6 rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                  <div className="text-xs font-bold text-slate-800 pt-0.5">{step.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Assessment callback */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-7 rounded-3xl relative overflow-hidden shadow-lg space-y-4">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-[20px] pointer-events-none"></div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              {lang === "en" ? "Need Immediate Evaluation?" : "জরুরি প্রোফাইল রিভিউ আবশ্যক?"}
            </h3>
            <p className="text-xs text-blue-105 font-light leading-relaxed">
              {lang === "en" 
                ? "Talk directly to our chief academic advisor regarding visa refusals, course selection, or gap-year approvals."
                : "আপনার পূর্ববর্তী কোনো স্টাডি গ্যাপ বা রিজেকশনের সমস্যা থাকলে সরাসরি আমাদের অভিজ্ঞ টিমের পরামর্শ নিয়ে ফাইল সাজান।"}
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate("contact")}
                className="w-full h-10 bg-white text-blue-800 hover:bg-slate-50 font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-colors shadow-md"
              >
                {lang === "en" ? "Book Dhaka Office Slot" : "অফিসে সরাসরি এসে কথা বলুন"}
              </button>
            </div>
          </div>

          {/* Section 4: Video (if exists in customData) */}
          {customData.studentVideoUrl && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
                {lang === "en" ? "Student Processing Insights" : "স্টুডেন্ট প্রসেসিং বিষয়ক তথ্য"}
              </h3>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-md border border-slate-200">
                <iframe
                  src={customData.studentVideoUrl.includes('youtube.com/embed') ? customData.studentVideoUrl : `https://www.youtube.com/embed/${customData.studentVideoUrl}`}
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

      {/* ================= APPLY NOW MODAL ================= */}
      <AnimatePresence>
        {selectedCountry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop filter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCountry(null)}
              className="absolute inset-0 bg-slate-900/45 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Dialog container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 relative z-10 shadow-2xl space-y-5 text-slate-800"
              id="apply-modal-wrapper"
            >
              <button 
                onClick={() => setSelectedCountry(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                  {lang === "en" ? "Target Country Selected:" : "নির্বাচিত দেশ:"}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  {lang === "en" ? "Apply for " : ""}{selectedCountry}{lang === "bn" ? " স্টাডি পারমিট" : ""}
                </h3>
              </div>

              {!successMsg ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {t.contact.nameLabel}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === "en" ? "e.g., Ahsan Habib" : "উদা: আহসান হাবীব"}
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

                  {/* IELTS Profile */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {lang === "en" ? "Current IELTS or Level:" : "বর্তমান আইএলটিএস স্কোর:"}
                    </label>
                    <select
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 focus:outline-none cursor-pointer"
                      value={ielts}
                      onChange={(e) => setIelts(e.target.value)}
                    >
                      <option value="7.0">7.0+ bands overall</option>
                      <option value="6.5">6.0 - 6.5 bands</option>
                      <option value="5.5">5.0 - 5.5 bands</option>
                      <option value="No Study">No IELTS / MOI Only</option>
                    </select>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md duration-200 active:scale-95"
                    >
                      {t.contact.submitForm}
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
