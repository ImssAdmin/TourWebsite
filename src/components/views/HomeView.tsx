import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, Globe, ShieldCheck, Award, MessageSquare, 
  ArrowRight, CheckCircle2, ChevronDown, HelpCircle, 
  ChevronRight, Briefcase, Compass, Sparkles
} from "lucide-react";
import { translations } from "../../utils/translations";
import { PageId } from "../../types";
import { loadCustomData } from "../../utils/customizationStore";

interface HomeViewProps {
  lang: "en" | "bn";
  onNavigate: (id: PageId) => void;
}

export default function HomeView({ lang, onNavigate }: HomeViewProps) {
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

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: lang === "en" ? "Can I apply for a Canada Student Visa without IELTS?" : "আমি কি আইএলটিএস (IELTS) ছাড়া কানাডায় স্টুডেন্ট ভিসার জন্য আবেদন করতে পারব?",
      a: lang === "en" 
        ? "Yes, under certain circumstances such as English Medium instruction waivers (MOI) or secondary pathway courses. However, direct SDS streams require active IELTS scores of at least 6.0 bands for higher success rates. Contact our Dhaka office to assess your specific path options."
        : "হ্যাঁ, কিছু শর্তসাপেক্ষে যেমন ইংলিশ মিডিয়াম বা এমওআই (MOI) সার্টিফিকেট ওয়েভার ব্যবহার করে অথবা জেনেরিক পাথওয়ে কোর্সে ভর্তি হয়ে। তবে সাকসেস রেট বাড়াতে ভালো আইএলটিএস স্কোর থাকা বাঞ্ছনীয়। বিস্তারিত জানতে আমাদের ঢাকা অফিসে যোগাযোগ করুন।"
    },
    {
      q: lang === "en" ? "What is the processing time for European Union Work Permits?" : "ইউরোপীয় ইউনিয়নে ওয়ার্ক পারমিটের প্রসেসিং সময় কত দিন লাগে?",
      a: lang === "en"
        ? "Work permits for European countries like Poland, Romania, or Croatia typically take between 3 to 6 months for labor endorsement followed by 45 days at the embassy for final visa stamp. Quotas and timelines are adjusted periodically by state ministries."
        : "পোল্যান্ড, রোমানিয়া বা ক্রোয়েশিয়ার মতো ইউরোপীয় দেশের ওয়ার্ক পারমিট সাধারণত ৩ থেকে ৬ মাস সময় নেয় লেবার মন্ত্রণালয়ের পারমিট ইস্যুর পর এবং অতিরিক্ত মেয়াদে অ্যাম্বাসাডরের সাক্ষাৎকারের জন্য ঢাকা অথবা নয়াদিল্লিতে আবেদন করা হয়ে থাকে।"
    },
    {
      q: lang === "en" ? "Do you charge any advance agency fees for student admissions?" : "আপনারা কি স্টুডেন্ট এডমিশনের জন্য কোনো অ্যাডভান্স ফাইল প্রসেসিং ফি নেন?",
      a: lang === "en"
        ? "No! We do not charge advance agency service fees for admissions. Any fees are strictly structured around transparent application and regulatory costs. We believe in upfront legality to protect local applicants from fraud."
        : "না! আমরা স্পন্সর এডমিশনের জন্য অগ্রিম কোনো অতিরিক্ত ফি চার্জ করি না। সব ধরনের পেমেন্ট অত্যন্ত স্বচ্ছ এবং আইনি ডকুমেন্টের সাথে চুক্তিবদ্ধ। গ্রাহকদের সকল প্রকার জালিয়াতি থেকে মুক্ত রাখতে আমরা সদা প্রতিশ্রুতিবদ্ধ।"
    }
  ];

  // Interactive Visa Eligibility Calculator State
  const [targetCountry, setTargetCountry] = useState("Canada");
  const [eduLevel, setEduLevel] = useState("HSC");
  const [gpa, setGpa] = useState("4.5");
  const [ieltsScore, setIeltsScore] = useState("6.5");
  const [calculatedRes, setCalculatedRes] = useState<string | null>(null);

  // Background Image Slider State & Slides Data
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = customData.homeSlides || [];

  React.useEffect(() => {
    if (!heroSlides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);


  const calculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const gpaNum = parseFloat(gpa);
    const ieltsNum = parseFloat(ieltsScore);

    let level = "Highly Eligible";
    let comment = "Perfect Profile!";

    if (gpaNum >= 4.0 && ieltsNum >= 6.0) {
      if (lang === "en") {
        level = "🏆 High Success Probability (95%+)";
        comment = `Excellent academic standing! You meet unconditional requirements for high-ranking DLI institutions in ${targetCountry}. You can qualify for major tuition scholarships and fast-track SDS visa portals.`;
      } else {
        level = "🏆 উচ্চ সফলতা সম্ভাবনা (৯৫%+)";
        comment = `চমৎকার একাডেমিক স্কোর! আপনি ${targetCountry}-এর নামকরা বিশ্ববিদ্যালয়ে সরাসরি ভর্তির জন্য শতভাগ যোগ্য। আপনি বড় স্কলারশিপ এবং দ্রুত ভিসা পোর্টালে আবেদনের সুযোগ পাবেন।`;
      }
    } else if (gpaNum >= 3.0 && ieltsNum >= 5.5) {
      if (lang === "en") {
        level = "⚡ Moderate Eligibility (75%-85%)";
        comment = `Good potential! You fit the entry requirements for secondary college diplomas and pathway courses in ${targetCountry}. We recommend slightly improving your IELTS or selecting a region without strict visa bands (e.g., eastern Europe).`;
      } else {
        level = "⚡ মাঝারি স্তরের যোগ্যতা (৭৫%-৮৫%)";
        comment = `ভাল সম্ভাবনা! আপনি ${targetCountry}-তে কলেজ ডিপ্লোমা এবং পাথওয়ে কোর্সে আবেদনের যোগ্য। আমরা আপনার আইএলটিএস স্কোর আরও উন্নত করতে অথবা পূর্ব ইউরোপের দেশ যেমন পোল্যান্ড বা রোমানিয়া ওয়ার্ক পারমিটের মত অপশন নির্বাচন করার পরামর্শ দেব।`;
      }
    } else {
      if (lang === "en") {
        level = "⚠️ Hard Threshold / Low Direct success";
        comment = `You currently fall below direct program limits for ${targetCountry}. We advise registering for our customized English booster batches in Dhaka first, or pivoting to legal work agreement routes.`;
      } else {
        level = "⚠️ সাধারণ আবেদনের ক্ষেত্রে কঠিন / ভিসা পাওয়ার সম্ভাবনা কম";
        comment = `আপনার বর্তমান প্রোফাইল ${targetCountry}-এর সরাসরি কোর্স লিমিটের নিচে আছে। আমরা সুপারিশ করব প্রথমে আমাদের ইংরেজি বুস্টার ব্যাচে ভর্তি হতে অথবা সরাসরি কাজের ওয়ার্ক পারমিট অপশনগুলো বিবেচনা করতে।`;
      }
    }

    setCalculatedRes(`${level}\n\n${comment}`);
  };


  const successStories = (customData.successStories || []).map(item => ({
    name: item.name,
    visaType: item.visaType,
    destination: item.destination,
    quote: lang === "en" ? item.quoteEn : item.quoteBn,
    image: item.image
  }));

  const blogs = (customData.blogs || []).map(item => ({
    title: lang === "en" ? item.titleEn : item.titleBn,
    date: item.date,
    desc: lang === "en" ? item.descEn : item.descBn,
    tag: lang === "en" ? item.tagEn : item.tagBn
  }));

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      
      {/* ================= HERO SLIDER SECTION ================= */}
      <section className="relative w-full h-[50vh] min-h-[350px] sm:min-h-[400px] md:h-[60vh] md:min-h-[460px] max-h-[520px] bg-slate-950 text-white overflow-hidden z-20">
        
        {/* Background Image Slider with Crossfade Transition */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt="Travel Destination Background"
                className="w-full h-full object-cover brightness-[0.4]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
          {/* Dark overlay to ensure text is highly legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20 z-10" />
        </div>

        {/* Text Overlay & Interactive Content container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-8 sm:pb-12 px-6">
          <div className="max-w-4xl mx-auto w-full text-center space-y-4">
            
            {/* Top Badge Overlay */}
            <motion.div 
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-650/80 backdrop-blur-md text-[10px] md:text-xs font-bold tracking-widest uppercase border border-blue-400/30 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
              <span>
                {currentSlide === 0 && (lang === "en" ? "UK STUDY IMMIGRATION" : "ইউকে স্টুডেন্ট ভিসা")}
                {currentSlide === 1 && (lang === "en" ? "CANADA STUDY PATHWAYS" : "কানাডা পাথওয়ে")}
                {currentSlide === 2 && (lang === "en" ? "EU SKILLED WORK PERMIT" : "ইউরোপ ওয়ার্ক পারমিট")}
                {currentSlide === 3 && (lang === "en" ? "SAUDI & GULF RELOCATION" : "সৌদি আর জিসিসি কাজের ভিসা")}
              </span>
            </motion.div>

            {/* Slider Heading Text Overlay */}
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 pointer-events-none"
            >
              <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-5xl leading-tight tracking-tight text-white drop-shadow-md">
                {lang === "en" ? heroSlides[currentSlide].titleEn : heroSlides[currentSlide].titleBn}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-slate-200 font-light max-w-2xl mx-auto drop-shadow-xs line-clamp-2">
                {lang === "en" ? heroSlides[currentSlide].descEn : heroSlides[currentSlide].descBn}
              </p>
            </motion.div>

            {/* Interactive Call to Actions */}
            <motion.div 
              key={`actions-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 pt-1"
            >
              <button 
                onClick={() => onNavigate("contact")}
                className="px-5 py-2.5 sm:px-7 sm:py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-100 shadow-lg text-xs uppercase tracking-widest transition-all duration-250 cursor-pointer active:scale-95"
              >
                {t.home.applyBtn}
              </button>
              <button 
                onClick={() => {
                  const srvId = currentSlide === 0 || currentSlide === 1 ? "student-visa" : "work-permit";
                  onNavigate(srvId as PageId);
                }}
                className="px-5 py-2.5 sm:px-7 sm:py-3 bg-blue-600/80 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-blue-650 border border-white/20 shadow-lg text-xs uppercase tracking-widest transition-all duration-250 cursor-pointer active:scale-95"
              >
                {t.home.exploreBtn}
              </button>
            </motion.div>

            {/* Slider Dots Indicator */}
            <div className="flex items-center justify-center gap-2 pt-3">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === i 
                      ? "w-7 bg-blue-400 shadow-md" 
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Desktop Manual Slide Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* ================= SUCCESS STATISTICS STRIP ================= */}
      <section className="bg-white border-b border-slate-100 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="text-center space-y-1">
            <div className="text-2.5xl sm:text-3.5xl font-black text-blue-600 font-sans tracking-tight">
              {lang === "en" ? customData.statsProcessedEn : customData.statsProcessedBn}
            </div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              {lang === "en" ? "Visas Processed" : "ভিসা প্রসেসড"}
            </div>
          </div>

          <div className="text-center space-y-1 border-l border-slate-100">
            <div className="text-2.5xl sm:text-3.5xl font-black text-blue-600 font-sans tracking-tight">
              {lang === "en" ? customData.statsRatioEn : customData.statsRatioBn}
            </div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              {lang === "en" ? "Success Ratio" : "সফলতার হার"}
            </div>
          </div>

          <div className="text-center space-y-1 border-l border-slate-100">
            <div className="text-2.5xl sm:text-3.5xl font-black text-blue-600 font-sans tracking-tight">
              {lang === "en" ? customData.statsCountriesEn : customData.statsCountriesBn}
            </div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              {lang === "en" ? "Partner Countries" : "পার্টনার দেশসমূহ"}
            </div>
          </div>

          <div className="text-center space-y-1 border-l border-slate-100">
            <div className="text-2.5xl sm:text-3.5xl font-black text-blue-600 font-sans tracking-tight">100%</div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              {lang === "en" ? "Transparent Legality" : "আইনি স্বচ্ছতা"}
            </div>
          </div>

        </div>
      </section>

      {/* ================= HOMEPAGE VIDEO SHOWCASE ================= */}
      {customData.homeVideoUrl && (
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-700 font-extrabold text-[10px] uppercase tracking-widest font-mono">
                {lang === "en" ? "OFFICIAL COMPLIANCE SHOWCASE" : "অফিসিয়াল ভিডিও গাইড"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === "en" ? "Watch Our Visa & Relocation Guide" : "আমাদের ভিসা ও মাইগ্রেশন গাইডলাইন ভিডিও দেখুন"}
              </h2>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg border border-slate-200 bg-slate-900">
              <iframe 
                src={(() => {
                  const url = customData.homeVideoUrl;
                  if (!url) return "";
                  let vidId = "";
                  if (url.includes("youtube.com/watch?v=")) {
                    vidId = url.split("v=")[1]?.split("&")[0];
                  } else if (url.includes("youtu.be/")) {
                    vidId = url.split("youtu.be/")[1]?.split("?")[0];
                  }
                  if (vidId) return `https://www.youtube.com/embed/${vidId}`;
                  return url;
                })()}
                title="Ideal Sky Tours Showcase Video"
                className="absolute inset-0 w-full h-full"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* ================= COMPANY CORPORATE INTRO ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Established in Dhaka since 2018" : "২০১৮ থেকে ঢাকায় সরাসরি নিবন্ধিত"}</span>
            </div>
            <h2 className="text-2.5xl sm:text-3.5xl font-sans font-black text-slate-900 tracking-tight leading-tight">
              {lang === "en" ? customData.aboutTitleEn : customData.aboutTitleBn}
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              <p>{lang === "en" ? customData.aboutDesc1En : customData.aboutDesc1Bn}</p>
              <p>{lang === "en" ? customData.aboutDesc2En : customData.aboutDesc2Bn}</p>
            </div>
            
            <div className="pt-3">
              <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs mb-3">
                {t.home.whyChooseUs}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-white border border-slate-100 rounded-lg shadow-xs text-center text-xs font-bold text-slate-800">
                  {t.home.badge1}
                </div>
                <div className="p-3.5 bg-white border border-slate-100 rounded-lg shadow-xs text-center text-xs font-bold text-slate-800">
                  {t.home.badge2}
                </div>
                <div className="p-3.5 bg-white border border-slate-100 rounded-lg shadow-xs text-center text-xs font-bold text-slate-800">
                  {t.home.badge3}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            {/* Visual representation of prime destination countries */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Popular Relocation Destinies</span>
                  <span className="text-[10px] text-slate-400 font-mono">{lang === "en" ? "REAL-TIME SLOTS AVAILABLE" : "আসন সংখ্যা সীমিত"}</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {customData.destinations.map((dst, i) => {
                    const countryName = lang === "en" ? dst.nameEn : dst.nameBn;
                    const countryDesc = lang === "en" ? dst.descEn : dst.descBn;
                    return (
                      <div key={i} className="bg-white rounded-2xl border border-slate-150 overflow-hidden flex flex-row items-stretch min-h-[105px] sm:min-h-[112px] h-auto hover:shadow-md transition-all duration-300 gap-3">
                        {/* Beside each country, use its iconic picture on the left side */}
                        <div className="relative w-20 sm:w-28 overflow-hidden shrink-0 bg-slate-100">
                          <img 
                            src={dst.image || "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=300&q=80"} 
                            alt={countryName} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=300&q=80";
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-3 py-2.5 flex flex-col justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg leading-none shrink-0" aria-hidden="true">{dst.flag}</span>
                              <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide truncate">{countryName}</span>
                            </div>
                            
                            <p className="text-[10px] sm:text-[11px] leading-snug text-slate-500 font-light line-clamp-2 md:line-clamp-3">{countryDesc}</p>
                          </div>
                          
                          {/* Book Now Button next to the flag/info */}
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => onNavigate("contact")}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md transition-transform duration-200 active:scale-95 shadow-xs cursor-pointer"
                            >
                              {lang === "en" ? "Book Now" : "বুক করুন"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>OFFICIALLY COMPLIANT AGENT DESK</span>
                  <span>DHAKA-1215 OFFICE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= BENTO CATEGORIES PREVIEWS ================= */}
      <section className="py-20 bg-white border-t border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-2.5xl sm:text-3.5xl font-sans font-black text-slate-900 tracking-tight">
              {lang === "en" ? "Explore Our Visa Services" : "আমাদের ভিসা সেবা সমূহ"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              We guide you through the entire application process step-by-step with verified timelines, genuine invitations, and transparent paperwork.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(customData.homeCategories && customData.homeCategories.length > 0 ? customData.homeCategories : [
              { id: "student-visa", titleEn: "Student Visa", titleBn: "স্টুডেন্ট ভিসা", descEn: "Secure admissions and permits in UK, Canada, USA, and Europe.", descBn: "যুক্তরাজ্য, কানাডা, আমেরিকা এবং ইউরোপে পড়াশোনার সুবর্ণ সুযোগ!", icon: GraduationCap, num: "3200+", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" },
              { id: "visit-visa", titleEn: "Visit Visa", titleBn: "ভিসিট ভিসা", descEn: "Perfect family and individual holiday plans with solid documentation.", descBn: "সহজ ট্যুরিস্ট ভিসা ও আকর্ষণীয় ফ্যামিলি ট্রাভেল প্ল্যানিং সার্ভিস।", icon: Globe, num: "5100+", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80" },
              { id: "work-permit", titleEn: "Work Permit", titleBn: "ওয়ার্ক পারমিট", descEn: "Join Romanian, Croatian, and Middle Eastern employment sectors legally.", descBn: "পোল্যান্ড ও রোমানিয়াসহ মিডল ইস্টে নিশ্চিত ও বৈধ সরকারি ওয়ার্ক পারমিট।", icon: Briefcase, num: "2800+", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80" },
              { id: "business-visa", titleEn: "Business Visa", titleBn: "বিজনেস ভিসা", descEn: "Relocate your business, set up startups, or attend trade summits.", descBn: "বিদেশে নতুন কোম্পানি রেজিস্ট্রেশন, স্টার্টআপ এবং ইনভেস্টর গোল্ডেন ভিসা।", icon: Compass, num: "1400+", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" }
            ]).map((srv, idx) => {
              const Icon = srv.id === "student-visa" ? GraduationCap : srv.id === "visit-visa" ? Globe : srv.id === "work-permit" ? Briefcase : Compass;
              return (
              <div 
                key={srv.id}
                onClick={() => onNavigate(srv.id as PageId)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-blue-500 hover:scale-[1.02] shadow-sm cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={srv.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80"} 
                      alt={lang === "en" ? srv.titleEn : srv.titleBn} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                    
                    <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[10px] text-blue-200 font-mono tracking-wider font-bold">VISA DIVISION</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">{lang === "en" ? srv.titleEn : srv.titleBn}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{lang === "en" ? srv.descEn : srv.descBn}</p>
                  </div>
                </div>
                
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-400">
                  <span className="text-blue-600 font-bold font-sans">{srv.num} VISAS</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )})}
          </div>

        </div>
      </section>

      {/* ================= INTERACTIVE ELIGIBILITY CALCULATOR ================= */}
      <section className="py-20 bg-slate-50" id="calculator">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                <Compass className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "Check Feasibility Instantly" : "যোগ্যতা যাচাই করুন"}</span>
              </div>
              <h2 className="text-2.5xl sm:text-3.5xl font-sans font-black text-slate-900 tracking-tight leading-tight">
                {lang === "en" ? "Interactive Study Visa Eligibility Calculator" : "স্টুডেন্ট ভিসা যোগ্যতা যাচাই ক্যালকুলেটর"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {lang === "en"
                  ? "Select your academic parameters to see real-life visa admissions feasibility and institutional criteria instantly. Completely transparent calculations."
                  : "আপনার একাডেমিক বিবরণী যোগ করে সরাসরি আপনার কাঙ্ক্ষিত দেশে ভিসা আবেদনের যোগ্যতা তাৎক্ষণিক জেনে নিন। কোনো প্রকার ভুল পরামর্শ ছাড়া শতভাগ নির্ভরযোগ্য সেবা।"}
              </p>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-blue-700 block uppercase">
                  {lang === "en" ? "💡 Legal Advice Notice" : "💡 আইনি পরামর্শের নোটিশ"}
                </span>
                <p className="text-[11px] leading-relaxed">
                  {lang === "en"
                    ? "Results are pre-calculated weights matching actual embassy intake structures. Full assessments call for an in-person Dhaka profile audit."
                    : "প্রাপ্ত ফলাফল বিগত বছর সমূহের অ্যাম্বেসি ডাটাবেজের ওপর নির্ভরশীল। শতভাগ নিশ্চিত ফলের জন্য সরাসরি আমাদের কর্মকর্তাদের সাথে কথা বলুন।"}
                </p>
              </div>
            </div>

            {/* Calculator interactive box */}
            <div className="lg:col-span-7 bg-white p-7 rounded-3xl border border-blue-100 shadow-xl space-y-6">
              <form onSubmit={calculateEligibility} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Destination Country */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {lang === "en" ? "Target Nation" : "ভ্রমণ/শিক্ষা দেশ"}
                    </label>
                    <select
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 transition-colors focus:outline-none cursor-pointer"
                      value={targetCountry}
                      onChange={(e) => { setTargetCountry(e.target.value); setCalculatedRes(null); }}
                    >
                      <option value="Canada">Canada 🇨🇦</option>
                      <option value="United Kingdom">United Kingdom 🇬🇧</option>
                      <option value="United States">United States 🇺🇸</option>
                      <option value="Germany">Germany 🇩🇪</option>
                      <option value="Sweden">Sweden 🇸🇪</option>
                    </select>
                  </div>

                  {/* Education level */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {lang === "en" ? "Academic Level" : "একাডেমিক যোগ্যতা"}
                    </label>
                    <select
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 transition-colors focus:outline-none cursor-pointer"
                      value={eduLevel}
                      onChange={(e) => { setEduLevel(e.target.value); setCalculatedRes(null); }}
                    >
                      <option value="HSC">HSC / Alim (১২ বছর)</option>
                      <option value="Diploma">Diploma Candidate (ডিপ্লোমা)</option>
                      <option value="Bachelor">Bachelors / Fazil (অনার্স)</option>
                      <option value="Masters">Masters / Kamil (মাস্টার্স)</option>
                    </select>
                  </div>

                  {/* GPA Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {lang === "en" ? "Current GPA Score" : "মোট জিপিএ (GPA)"}
                    </label>
                    <select
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 transition-colors focus:outline-none cursor-pointer"
                      value={gpa}
                      onChange={(e) => { setGpa(e.target.value); setCalculatedRes(null); }}
                    >
                      <option value="5.0">GPA 5.0 (Golden/A+)</option>
                      <option value="4.5">GPA 4.0 - 4.9</option>
                      <option value="3.5">GPA 3.0 - 3.9</option>
                      <option value="2.5">GPA below 3.0</option>
                    </select>
                  </div>

                  {/* IELTS Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {lang === "en" ? "IELTS Band Score" : "আইএলটিএস (IELTS) ব্যান্ড স্কোর"}
                    </label>
                    <select
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 transition-colors focus:outline-none cursor-pointer"
                      value={ieltsScore}
                      onChange={(e) => { setIeltsScore(e.target.value); setCalculatedRes(null); }}
                    >
                      <option value="7.5">7.0 - 8.5 Bands (Excellent)</option>
                      <option value="6.5">6.0 - 6.5 Bands (Standard)</option>
                      <option value="5.5">5.0 - 5.5 Bands (Min Pathway)</option>
                      <option value="3.0">No IELTS (MOI Option)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer shadow-md"
                  >
                    {lang === "en" ? "Calculate Admission Success Profile" : "একাডেমিক প্রোফাইল এসেসমেন্ট করুন"}
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {calculatedRes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 bg-blue-50 text-slate-700 rounded-2xl border border-blue-200 space-y-3 relative overflow-hidden"
                  >
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 w-32 h-32 bg-blue-600/5 rounded-full blur-[20px] pointer-events-none"></div>
                    <div className="relative z-10 space-y-2">
                      <div className="text-xs font-black text-slate-900 border-b border-blue-100 pb-2 uppercase tracking-wide">
                        {lang === "en" ? "Calculated Eligibility Feedback" : "ডিজিটাল এসেসমেন্ট ফলাফল"}
                      </div>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-light whitespace-pre-line text-slate-600">
                        {calculatedRes}
                      </p>
                      
                      <div className="pt-3 flex justify-end">
                        <button
                          onClick={() => onNavigate("contact")}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 tracking-wider uppercase hover:underline cursor-pointer"
                        >
                          <span>{lang === "en" ? "Settle Direct Appointment" : "প্রধান কার্যালয়ে মিটিং বুক করুন"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>
      </section>

      {/* ================= OUR TEAM ================= */}
      <section className="py-20 bg-white border-t border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-700 font-extrabold text-[10px] uppercase tracking-widest font-mono">
              {lang === "en" ? "Meet The Experts" : "আমাদের বিশেষজ্ঞ দল"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {lang === "en" ? "Our Team" : "আমাদের টিম"}
            </h2>
            <p className="text-sm font-medium text-slate-500">
              {lang === "en" 
                ? "Dedicated professionals committed to making your global relocation journey smooth, transparent, and successful." 
                : "আপনাদের নিরাপদ ও সঠিক গাইডেন্স প্রদান করতে আমাদের রয়েছে একদল অভিজ্ঞ ও নিষ্ঠাবান প্রফেশনালস।"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(customData.homeTeamMembers && customData.homeTeamMembers.length > 0 ? customData.homeTeamMembers : [
              {
                name: "MD. Zahirul Islam",
                roleEn: "Managing Director",
                roleBn: "ব্যবস্থাপনা পরিচালক",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Sabrina Rahman",
                roleEn: "Senior Visa Counsellor",
                roleBn: "সিনিয়র ভিসা কাউন্সিলর",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Tariqul Hasan",
                roleEn: "Immigration Specialist",
                roleBn: "ইমিগ্রেশন স্পেশালিস্ট",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Nadia Afrin",
                roleEn: "Client Relations Manager",
                roleBn: "ক্লায়েন্ট রিলেশনস ম্যানেজার",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
              }
            ]).map((member, idx) => (
              <div key={idx} className="group flex flex-col items-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-black text-slate-900 text-center">{member.name}</h3>
                <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-wider text-center">
                  {lang === "en" ? member.roleEn : member.roleBn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS / SUCCESS STORIES ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-2.5xl sm:text-3.5xl font-sans font-black text-slate-900 tracking-tight">
              {t.home.successStoriesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              {t.home.successStoriesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <div 
                key={i}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500/40 shadow-sm flex flex-col justify-between space-y-6 transition-all duration-300"
              >
                <div className="space-y-4">
                  <p className="text-xs leading-relaxed text-slate-600 italic font-light">
                    "{story.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 object-cover rounded-full bg-slate-200 border border-slate-100"
                  />
                  <div>
                    <div className="text-xs font-black text-slate-900">{story.name}</div>
                    <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-0.5">{story.visaType}</div>
                    <p className="text-[9.5px] text-slate-400 font-mono mt-0.5">{story.destination}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FAQS ACCORDION SECTION ================= */}
      <section className="py-20 bg-white border-t border-b border-slate-150">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2.5xl sm:text-3.5xl font-sans font-black text-slate-900 tracking-tight">
              {t.common.faqTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              {t.common.faqSubtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-900 hover:text-blue-600 text-xs sm:text-sm gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-450 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="p-5 pt-0 text-xs sm:text-[13px] text-slate-650 leading-relaxed font-light border-t border-slate-200/40 text-slate-600">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= BLOG & IMMIGRATION NEWS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-2.5xl sm:text-3.5xl font-sans font-black text-slate-900 tracking-tight">
              {t.home.blogTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              {t.home.blogSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <article 
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase text-slate-400">
                    <span className="text-blue-600 font-bold">{blog.tag}</span>
                    <span className="text-slate-400">{blog.date}</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-slate-900 leading-snug hover:text-blue-600 cursor-pointer">
                    {blog.title}
                  </h3>
                  
                  <p className="text-[11.5px] text-slate-500 font-light leading-relaxed">
                    {blog.desc}
                  </p>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => onNavigate("contact")}
                    className="text-[10px] font-mono font-bold text-blue-600 uppercase hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === "en" ? "Read update" : "সম্পূর্ণ পড়ুন"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
