import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, Compass, Clock, CheckCheck, HelpCircle, 
  MapPin, CheckSquare, Sparkles, X, Award, ChevronRight 
} from "lucide-react";
import { translations } from "../../utils/translations";

interface VisitVisaViewProps {
  lang: "en" | "bn";
  onNavigate: (id: string) => void;
}

export default function VisitVisaView({ lang, onNavigate }: VisitVisaViewProps) {
  const t = translations[lang];

  // Booking Modal State
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const destinations = [
    {
      id: "dubai",
      name: lang === "en" ? "United Arab Emirates (Dubai)" : "দুবাই (UAE ভিসিট)",
      flag: "🇦🇪",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      pricing: lang === "en" ? "BDT 18,500" : "১৮,৫00 টাকা",
      rating: "5.0 ★",
      processing: lang === "en" ? "3 - 5 Working Days" : "৩ - ৫ কর্মদিবস",
      visaValidity: lang === "en" ? "30 / 60 Days Single Entry" : "৩০ / ৬০ দিন সিঙ্গেল এন্ট্রি",
      requirements: [
        lang === "en" ? "Prisitne high-res Bangladesh Passport scan copy" : "পাসপোর্টের ক্লিয়ার রঙিন স্ক্যান কপি",
        lang === "en" ? "White background digital photo passport format" : "সদ্য তোলা ল্যাব প্রিন্ট ল্যাঙ্গুয়েজ ব্যাকগ্রাউন্ড ছবি",
        lang === "en" ? "National ID Card scanning" : "জাতীয় পরিচয়পত্রের কপি"
      ]
    },
    {
      id: "singapore",
      name: lang === "en" ? "Singapore eVisa Package" : "সিঙ্গাপুর ই-ভিসা প্যাকেজ",
      flag: "🇸🇬",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
      pricing: lang === "en" ? "BDT 9,500" : "৯,৫০০ টাকা",
      rating: "4.9 ★",
      processing: lang === "en" ? "5 - 7 Working Days" : "৫ - ৭ কর্মদিবস",
      visaValidity: lang === "en" ? "2 Years Multiple Entry eVisa" : "২ বছর মেয়াদী মাল্টিপল এন্ট্রি",
      requirements: [
        lang === "en" ? "Active Singapore Sponsor Invitation (V39A) or agency escrow" : "সিঙ্গাপুর এজেন্টের অফিসিয়াল ইনভাইটেশন (V39A)",
        lang === "en" ? "6-month bank statement with minimum 2 Lakh BDT savings" : "৬ মাসের ব্যাংক স্টেটমেন্ট (ন্যূনতম ২ লক্ষ টাকা ব্যালেন্স)",
        lang === "en" ? "Professional NOC / Trade License translation" : "চাকরিজীবীদের এনওসি (NOC) বা ব্যবসায়ীদের ট্রেড লাইসেন্স"
      ]
    },
    {
      id: "thailand-malaysia",
      name: lang === "en" ? "Thailand & Malaysia Combos" : "থাইল্যান্ড ও মালয়েশিয়া কম্বো",
      flag: "🇹🇭 🇲🇾",
      image: "https://images.unsplash.com/photo-1528181304800-2f190854897d?auto=format&fit=crop&w=600&q=80",
      pricing: lang === "en" ? "BDT 14,000" : "১৪,০০০ টাকা",
      rating: "4.8 ★",
      processing: lang === "en" ? "5 - 8 Working Days" : "৫ - ৮ কর্মদিবস",
      visaValidity: lang === "en" ? "3 Months Single Entry Travel" : "৩ মাস মেয়াদ সিঙ্গেল ভ্রমণ",
      requirements: [
        lang === "en" ? "Original Bangladesh Passport (Minimum 6-month validity)" : "মূল পাসপোর্ট (কমপক্ষে ৬ মাসের মেয়াদ থাকতে হবে)",
        lang === "en" ? "Bank statement & Solvency letter with active bank seals" : "ব্যাংক স্টেটমেন্ট ও সলভেন্সি সার্টিফিকেট (সিলযুক্ত)",
        lang === "en" ? "Confirmed hotel bookings & roundtrip air tickets draft" : "হোটেল বুকিং এবং ট্রাভেল আইটিনেরারি টিকিট কপি"
      ]
    },
    {
      id: "schengen-tourist",
      name: lang === "en" ? "Schengen Holiday Dossier" : "ইউরোপীয় শেনজেন ট্যুরিস্ট ফাইল",
      flag: "🇪🇺",
      image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=600&q=80",
      pricing: lang === "en" ? "BDT 45,000 Expert Filing" : "৪৫,০০০ টাকা প্যাকেজ ফাইলিং",
      rating: "5.0 ★",
      processing: lang === "en" ? "15 - 20 Calendar Days" : "১৫ - ২০ কর্মদিবস",
      visaValidity: lang === "en" ? "Flexible according to tour itinerary specs" : "আইটিনেরারি এবং ট্রাভেল হিস্ট্রি অনুসারে যেকোনো শেনজেন দেশ",
      requirements: [
        lang === "en" ? "Dynamic source of income documentation (3-year Tax Returns)" : "ব্যবসায়িক ট্যাক্স রিটার্ন ও আয়কর ফাইলের কপি (৩ বছর)",
        lang === "en" ? "Strict asset backing (Property deeds, FDR certificates)" : "সম্পত্তি ও এফডিআর (FDR) এর দলিল বা প্রমাণাদি",
        lang === "en" ? "Premium customized Day-to-Day tour itinerary cover letter" : "পেশাদার ডেই-টু-ডেই ট্রাভেল প্ল্যান ও নিখুঁত কভার লেটার"
      ]
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setSelectedDestination(null);
      setFullName("");
      setPhone("");
      setTravelDate("");
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
              <Compass className="w-4 h-4 text-blue-200" />
              <span>{lang === "en" ? "International Tourism Support" : "আন্তর্জাতিক ট্যুরিজম শাখা"}</span>
            </div>
            
            <h1 className="font-sans font-black text-3.5xl md:text-5xl text-white tracking-tight">
              {t.visit.title}
            </h1>
            <p className="text-blue-105 text-sm sm:text-base max-w-2xl leading-relaxed text-blue-105/90 font-light">
              {t.visit.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN STRIP DATA ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-3 gap-12">
        
        {/* Left Grid: Tourism Destinations Sections */}
        <div className="lg:col-span-2 space-y-12">
          
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-205 border-slate-200 pb-3 flex items-center gap-2">
            <Globe className="w-5.5 h-5.5 text-blue-600" />
            <span>{t.visit.packagesTitle}</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {destinations.map((dest) => (
              <div 
                key={dest.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-500/45 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Elegant Image Cover with Flag & Details Overlay */}
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                    
                    {/* Top rating badge */}
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-amber-50 rounded text-amber-700 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-200 shadow-sm z-10">
                      {dest.rating}
                    </span>

                    {/* Flag Overlay */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                      <span className="text-2xl bg-white/10 backdrop-blur-xs rounded-lg p-1 block border border-white/20 leading-none shadow-sm">{dest.flag}</span>
                      <span className="text-[10px] text-blue-200 font-mono tracking-wider font-bold">TOURIST TRACK</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                        {dest.name}
                      </h3>
                      <div className="text-xs font-mono text-blue-600 font-bold mt-1">
                        {lang === "en" ? "From " : "মূল্য শুরু "}{dest.pricing}
                      </div>
                    </div>

                    {/* Processing parameters */}
                    <div className="pt-3 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-mono">PROCESSING:</span>
                        <strong className="text-slate-800">{dest.processing}</strong>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400 font-mono">VALIDITY:</span>
                        <strong className="text-slate-800">{dest.visaValidity}</strong>
                      </div>
                    </div>

                    {/* Document requirements under country */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {lang === "en" ? "Core Documents List:" : "প্রধান আবশ্যকীয় নথিসমূহ:"}
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-slate-600">
                        {dest.requirements.map((req, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <CheckCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="leading-tight font-light">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedDestination(dest.name)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-sm cursor-pointer transition-colors duration-200"
                  >
                    {t.visit.bookNow}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right Grid: Documents Advisory panel & FAQs */}
        <div className="space-y-8">
          
          {/* Section 1: Tourist Clearance Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-slate-205 border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              {lang === "en" ? "Embassy File Setup Advices" : "সফল মেম্বারশিপ এবং কভার ফাইল গাইড"}
            </h3>

            <p className="text-xs text-slate-500 font-light leading-relaxed">
              {lang === "en"
                ? "Embassy visa officers evaluate tourist profiles principally on returning intent and active funds to prevent overstay. We specialize in configuring a watertight tourism advisory file."
                : "ভিসিট ভিসার আবেদনের ক্ষেত্রে অ্যাম্বেসির একজন ভিসা অফিসার আবেদনকারীর ব্যাংকিং রেকর্ডস এবং বাংলাদেশে তার পারিবারিক/আর্থিক সম্পর্ক যাচাই করেন। আমরা বিগত ৮ বছর ধরে নিখুঁত ফাইল সাজাতে সাহায্য করছি।"}
            </p>

            <ul className="space-y-3 text-xs text-slate-600">
              {[
                { title: lang === "en" ? "Financial Soundness (Bank/FDR)" : "ব্যাংক সেভিংস ও এফডিআর (FDR)", desc: lang === "en" ? "Active 6-month statement with genuine source of wealth transactions." : "৬ মাসের ব্যাংক লেনদেন বিবরণী যেখানে আয়ের উৎস স্পষ্ট।" },
                { title: lang === "en" ? "NOC Letter / Office ID Cards" : "অফিসিয়াল এনওসি (NOC) বা ভিজিটিং কার্ড", desc: lang === "en" ? "Accredited trade licenses block if you are self-employed." : "চাকরির আইডিতে স্যালারি স্লিপ বা ব্যবসার ট্রেড লাইসেন্স।" },
                { title: lang === "en" ? "Custom Travel Itineraries" : "কাস্টম ট্যুর আইটিনেরারি ফাইল", desc: lang === "en" ? "Flawless day-by-day sightseeing planning matching flight drafts." : "আকর্ষণীয় ট্যুর শিডিউল এবং হোটেল বুকিং কনফার্মেশন।" }
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

          {/* Section 2: Rapid assessment call */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-7 rounded-3xl relative overflow-hidden shadow-lg space-y-4">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-[20px] pointer-events-none"></div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              {lang === "en" ? "Need Tourist Flight Combos?" : "সহজ ফ্লাইট ও হোটেল কম্বো চাই?"}
            </h3>
            <p className="text-xs text-blue-105 font-light leading-relaxed">
              {lang === "en" 
                ? "Get total holiday ticketing packages with hotel booking vouchers from our certified travel agency desk."
                : "ভ্রমণ ভিসার পাশাপাশি আমাদের আইএটিএ (IATA) সার্টিফাইড ট্রাভেল ডেস্ক থেকে সেরা ট্রাভেল ইন্স্যুরেন্স ও এয়ার টিকিট বুকিং সুবিধা পান।"}
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate("contact")}
                className="w-full h-10 bg-white text-blue-800 hover:bg-slate-50 font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-colors shadow-md"
              >
                {lang === "en" ? "Connect Travel Executive" : "আমাদের ট্রাভেল ডেস্কের কথা বলুন"}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ================= VISIT/BOOKING ASSESSMENT MODAL ================= */}
      <AnimatePresence>
        {selectedDestination && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDestination(null)}
              className="absolute inset-0 bg-slate-900/45 backdrop-blur-xs"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 relative z-10 shadow-2xl space-y-5 text-slate-800"
              id="visit-booking-modal"
            >
              <button 
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                  {lang === "en" ? "Tourist Stream Targeted:" : "ভ্রমণ গন্তব্য:"}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  {selectedDestination}
                </h3>
              </div>

              {!successMsg ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Full name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {t.contact.nameLabel}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === "en" ? "e.g., Kazi Ahsan" : "উদা: কাজী আহসান"}
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

                  {/* Travel Schedule */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {lang === "en" ? "Approximate Travel Date:" : "সম্ভাব্য ভ্রমণের সময়:"}
                    </label>
                    <input 
                      type="date" 
                      required
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 transition-colors focus:outline-none cursor-pointer"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md duration-200 active:scale-95"
                    >
                      {lang === "en" ? "Submit Holiday Request" : "ভ্রমণ ফাইল আবেদন সম্পন্ন করুন"}
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
