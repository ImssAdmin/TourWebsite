import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, Wrench, ShieldAlert, BadgeCheck, Users, 
  Layers, MapPin, CheckSquare, Award, Clock, FileText, ChevronRight, X
} from "lucide-react";
import { translations } from "../../utils/translations";
import { loadCustomData } from "../../utils/customizationStore";

interface WorkPermitViewProps {
  lang: "en" | "bn";
  onNavigate: (id: string) => void;
}

export default function WorkPermitView({ lang, onNavigate }: WorkPermitViewProps) {
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

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTrade, setJobTrade] = useState("Construction Sector");
  const [successMsg, setSuccessMsg] = useState(false);

  const workOpportunities = customData.workOpportunities || [];

  const handleWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setSelectedJob(null);
      setFullName("");
      setPhone("");
    }, 4500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-20 font-sans">
      
      {/* ================= HERO EDITORIAL BANNER ================= */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-slate-955 to-slate-950 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/25 uppercase">
              <Briefcase className="w-4 h-4 text-blue-250" />
              <span>{lang === "en" ? "Overseas Skilled Labor Division" : "ওভারসিজ ওয়ার্কার্স শাখা"}</span>
            </div>
            
            <h1 className="font-sans font-black text-3.5xl md:text-5xl text-white tracking-tight">
              {lang === "en" ? customData.workTitleEn : customData.workTitleBn}
            </h1>
            <p className="text-blue-105 text-sm sm:text-base max-w-2xl leading-relaxed text-blue-105/90 font-light">
              {lang === "en" ? customData.workSubtitleEn : customData.workSubtitleBn}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN STRIP DATA ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-3 gap-12">
        
        {/* Left Side: Opportunities List (Col span 2) */}
        <div className="lg:col-span-2 space-y-12">
          
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-205 border-slate-200 pb-3 flex items-center gap-2">
            <Layers className="w-5.5 h-5.5 text-blue-600" />
            <span>{lang === "en" ? "Current Employment Opportunities" : "চলতি নিয়োগ এবং দেশভিত্তিক ওয়ার্ক পারমিট"}</span>
          </h2>

          <div className="space-y-8">
            {workOpportunities.map((opportunity) => (
              <div 
                key={opportunity.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-blue-500/40 hover:shadow-lg transition-all duration-300 space-y-6 pb-6"
                id={`work-block-${opportunity.id}`}
              >
                
                {/* Elegant Image Banner with Flag overlay and Success Rate */}
                <div className="relative h-44 md:h-52 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={opportunity.image} 
                    alt={lang === "en" ? opportunity.countryEn : opportunity.countryBn} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  
                  {/* Success tag overlay */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-750 border border-green-200 rounded-lg text-xs font-mono font-bold shadow-md z-10">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    <span className="text-green-800">{opportunity.successRate} {lang === "en" ? "Success" : "সাকসেস রেট"}</span>
                  </div>

                  <div className="absolute bottom-4 left-6 flex items-center gap-3 text-white">
                    <span className="text-3xl bg-white/10 backdrop-blur-sm rounded-xl p-1 shadow-md shrink-0 block border border-white/20 leading-none">{opportunity.flag}</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-white drop-shadow-sm">
                        {lang === "en" ? opportunity.countryEn : opportunity.countryBn}
                      </h3>
                      <p className="text-[10px] text-blue-200 font-bold tracking-widest uppercase">
                        {lang === "en" ? "WORK PORTAL DIRECT" : "ডাইরেক্ট ওয়ার্ক কোটা"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 md:px-8 space-y-6">
                  {/* Processing Duration Subbar */}
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-slate-500 font-medium">
                      {lang === "en" ? "Embassy processing duration: " : "অ্যাম্বেসি প্রসেসিং সময়: "}<strong className="text-slate-800 font-bold">{lang === "en" ? opportunity.processingTimeEn : opportunity.processingTimeBn}</strong>
                    </span>
                  </div>

                {/* Info block (Salary and Accomm) */}
                <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">Average Salary / গড় মাসিক বেতন:</span>
                    <strong className="text-blue-750 text-blue-700 text-sm">{lang === "en" ? opportunity.avgSalaryEn : opportunity.avgSalaryBn}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">Accommodation / আবাসন:</span>
                    <strong className="text-slate-800">{lang === "en" ? opportunity.accommodationEn : opportunity.accommodationBn}</strong>
                  </div>
                </div>

                {/* Sub-trades available */}
                <div className="space-y-3">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    {lang === "en" ? "Available Job Openings & Trades:" : "চলতি মেয়াদে এভেইলেবল শূন্য পদ সমূহের বিবরণ:"}
                  </span>
                  
                  <div className="grid gap-2.5 sm:grid-cols-1">
                    {((lang === "en" ? opportunity.tradesEn : opportunity.tradesBn) || []).map((trade: string, i: number) => (
                      <div key={i} className="flex gap-2.5 items-center p-3 border border-slate-100 bg-slate-50/50 rounded-xl">
                        <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="text-xs text-slate-700 font-bold leading-normal">{trade}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    DHAKA REGISTERED LEGAL EMPLOYER SUBMISSION
                  </span>
                  
                  <button
                    onClick={() => setSelectedJob(lang === "en" ? opportunity.countryEn : opportunity.countryBn)}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md duration-200 cursor-pointer"
                  >
                    {lang === "en" ? "Apply for Permit" : "কাজের পারমিট আবেদন"}
                  </button>
                </div>

              </div>
            </div>
          ))}
          </div>

        </div>

        {/* Right Side: Step process and requirements Checklist */}
        <div className="space-y-8">
          
          {/* Section 1: Candidate general criteria */}
          <div className="bg-white p-6 rounded-3xl border border-slate-205 border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              {t.work.eligibilityTitle}
            </h3>

            <p className="text-xs text-slate-550 leading-relaxed font-light text-slate-500">
              {lang === "en"
                ? "Skilled visa quotas require candidates in Bangladesh to register under strict biometric and age constraints."
                : "ইউরোপীয় ইউনিয়ন ভুক্ত বা শেনজেন এলাকায় সরকারি কোটায় চাকরি পেতে প্রতিটি প্রার্থীর বয়স, পুলিশ ক্লিয়ারেন্স ও মেডিকেল ফিটনেস অত্যন্ত গুরুত্ব পেয়ে থাকে।"}
            </p>

            <ul className="space-y-3 text-xs text-slate-600">
              {[
                { title: lang === "en" ? "Age limitations criteria" : "বয়সের সর্বোচ্চ সীমা", desc: lang === "en" ? "Between 20 to 45 years of age generally allowed." : "প্রার্থীর বয়স অবশ্যই ২০ থেকে ৪৫ বছরের মধ্যে হতে হবে।" },
                { title: lang === "en" ? "Police Clearance Record" : "পুলিশ ক্লিয়ারেন্স সার্টিফিকেট", desc: lang === "en" ? "DMP / Local police verified clean record copy." : "ডিএমপি অথবা স্থানীয় থানা হতে স্পেশাল ক্লিয়ারেন্স।" },
                { title: lang === "en" ? "Medical clearance fitness" : "মেডিকেল ফিটনেস ক্লিয়ারেন্স", desc: lang === "en" ? "Certified clinical medical report (Free of communicable illness)." : "যেকোনো আইনি ডায়াগনস্টিক সেন্টারের সাধারণ স্বাস্থ্য টেষ্ট।" }
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

          {/* Section 2: Work permit steps list */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              {t.work.stepsTitle}
            </h3>

            <div className="relative border-l border-slate-200 ml-3.5 space-y-6">
              {[
                { step: "1", title: lang === "en" ? "Document assessment & profile screening" : "১. ঢাকা অফিসে এসে পাসপোর্ট ও প্রার্থীর ট্রেড মূল্যায়ন" },
                { step: "2", title: lang === "en" ? "Foreign employer interview / Job letter collection" : "২. নিয়োগকারী কোম্পানি ইন্টারভিউ এবং কাজের অফার ইস্যু" },
                { step: "3", title: lang === "en" ? "Government labor permit approval on country portal" : "৩. সংশ্লিষ্ট দেশের সরকারি শ্রম মন্ত্রনালয় হতে পারমিট ইস্যু" },
                { step: "4", title: lang === "en" ? "Embassy bio queue and visa stamping registration" : "৪. অ্যাম্বেসিতে ফাইল ফি সাবমিশন ও চূড়ান্ত পাসপোর্ট স্ট্যাম্পিং" },
                { step: "5", title: lang === "en" ? "Airport clearance and departure flights" : "৫. বৈধ ব্যুরো কার্ড নিয়ে এয়ারপোর্ট ক্লিয়ারেন্স প্রদান" }
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

          {/* Section: Video (if exists in customData) */}
          {customData.workVideoUrl && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
                {lang === "en" ? "Work Processing Insights" : "ওয়ার্ক প্রসেসিং বিষয়ক তথ্য"}
              </h3>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-md border border-slate-200">
                <iframe
                  src={customData.workVideoUrl.includes('youtube.com/embed') ? customData.workVideoUrl : `https://www.youtube.com/embed/${customData.workVideoUrl}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            </div>
          )}

          {/* Section 3: Safe protection refund alerts */}
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl space-y-3.5 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <strong className="font-bold uppercase text-[11px] block text-amber-950">
                {lang === "en" ? "🔒 Anti-Fraud Escrow Guarantee" : "🔒 জালিয়াতি বিরোধী আইনি সুরক্ষাপত্র"}
              </strong>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900">
              {lang === "en"
                ? "Ideal Sky Tours strictly operates under approved state laws. No advances are stored in un-audited channels, protecting Bangladeshi applicants completely."
                : "আমরা কোনো সাব-দালাল বা বাইরের এজেন্টদের মাধ্যমে কাজ করি না। অনুগ্রহ করে সব লেনদেন সরাসরি আমাদের শাহবাগ হেড অফিসে করার মাধ্যমে প্রতারণা হতে নিরাপদে থাকুন।"}
            </p>
          </div>

        </div>

      </div>

      {/* ================= WORK LEAD MODAL ================= */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-slate-900/45 backdrop-blur-xs"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 relative z-10 shadow-2xl space-y-5 text-slate-800"
              id="work-apply-modal"
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                  {lang === "en" ? "Work Region Selected:" : "নির্বাচিত দেশ:"}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  {selectedJob}
                </h3>
              </div>

              {!successMsg ? (
                <form onSubmit={handleWorkSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {t.contact.nameLabel}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === "en" ? "e.g., Ahsanullah Kazi" : "উদা: আহসানুল্লাহ কাজী"}
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

                  {/* Trades selected */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {lang === "en" ? "Preferred Trade / Skill:" : "দক্ষতার কাজ বা ক্যাটাগরি:"}
                    </label>
                    <select
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 focus:outline-none cursor-pointer"
                      value={jobTrade}
                      onChange={(e) => setJobTrade(e.target.value)}
                    >
                      <option value="Civil Construction">Civil Construction / কন্সট্রাকশন</option>
                      <option value="Hospitality & Catering">Gastronomy / হোটেল ও রেস্টুরেন্ট</option>
                      <option value="Light Heavy Driving">Light & Heavy Driving / ড্রাইভিং</option>
                      <option value="Packaging & Warehouse">Packing & Loading / ফুড প্যাকিং</option>
                    </select>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md duration-200 active:scale-95 animate-pulse"
                    >
                      {lang === "en" ? "Send Work Query" : "ওয়ার্ক পারমিট যোগ্যতা তদন্তে পাঠান"}
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
