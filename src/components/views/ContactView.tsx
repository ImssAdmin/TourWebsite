import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  MapPin, Phone, Mail, Clock, ShieldCheck, 
  Send, HelpCircle, CheckSquare, MessageSquare, Award
} from "lucide-react";
import { translations } from "../../utils/translations";
import { loadCustomData } from "../../utils/customizationStore";

import { PageId } from "../../types";

interface ContactViewProps {
  lang: "en" | "bn";
  onNavigate: (id: PageId) => void;
}

export default function ContactView({ lang, onNavigate }: ContactViewProps) {
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

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [visaType, setVisaType] = useState("student");
  const [profileMessage, setProfileMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          visaType,
          profileMessage,
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFullName("");
        setEmail("");
        setPhone("");
        setProfileMessage("");
      } else {
        setIsSubmitting(false);
        alert(lang === "en" ? "Failed to submit. Please try again." : "দুঃখিত, আবার চেষ্টা করুন।");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert(lang === "en" ? "Network error. Please try again." : "নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* ================= EDITORIAL HERO HOVER ================= */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-slate-950 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/25 uppercase">
              <MessageSquare className="w-4 h-4 text-blue-200" />
              <span>{lang === "en" ? "Direct Helpdesk Office" : "সরাসরি সহায়তা সেল"}</span>
            </div>
            
            <h1 className="font-sans font-black text-3.5xl md:text-5xl text-white tracking-tight">
              {lang === "en" ? customData.contactTitleEn : customData.contactTitleBn}
            </h1>
            <p className="text-blue-105 text-sm sm:text-base max-w-2xl leading-relaxed text-blue-105/90 font-light">
              {lang === "en" ? customData.contactSubtitleEn : customData.contactSubtitleBn}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN DUAL-COLUMN GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Professional assessment form (Col span 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5.5 h-5.5 text-blue-600" />
              <span>{t.contact.formTitle}</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">DIRECT LINKED TO SENIOR DHAKA ADVISORY DESK</p>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 bg-green-50 border border-green-200 text-green-900 rounded-2xl text-center space-y-4"
            >
              <Award className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-green-950">
                {lang === "en" ? "Assessment Enqueued Successfully!" : "আবেদন সফলভাবে গৃহীত হয়েছে!"}
              </h3>
              <p className="text-xs text-green-800 leading-relaxed font-light">
                {t.common.successAlert}
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded text-xs font-bold uppercase hover:bg-blue-700 transition-colors"
                >
                  {lang === "en" ? "Send another query" : "আরেকটি ফর্ম পাঠান"}
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitContactForm} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full name input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {t.contact.nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder={lang === "en" ? "e.g., Ahsanullah Fahim" : "উদা: আহসানুল্লাহ ফাহিম"}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 focus:outline-none transition-colors"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Email address input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {t.contact.emailLabel}
                  </label>
                  <input 
                    type="email"
                    placeholder="e.g., info@gmail.com"
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 focus:outline-none transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Phone number input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {t.contact.phoneLabel} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="e.g., +880 1712-XXXXXX"
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 focus:outline-none transition-colors"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* Choose visa category dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-sans">
                    {t.contact.visaTypeLabel}
                  </label>
                  <select
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 focus:outline-none transition-colors cursor-pointer"
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                  >
                    <option value="student">{lang === "en" ? "Student Admission Route" : "স্টুডেন্ট ভিসা / অফার লেটার"}</option>
                    <option value="work">{lang === "en" ? "Skilled Work Permit" : "কাজের পারমিট / জব অফার"}</option>
                    <option value="visit">{lang === "en" ? "Holiday Tourist eVisa" : "ট্যুরিস্ট ভিসিট ভিসা"}</option>
                    <option value="business">{lang === "en" ? "Golden / Corporate Investor Setup" : "ব্যবস্থাপক ও বিজনেস গোল্ডেন ভিসা"}</option>
                  </select>
                </div>

              </div>

              {/* Comprehensive Profile box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {t.contact.messageLabel}
                </label>
                <textarea 
                  rows={4}
                  placeholder={lang === "en" 
                    ? "Explain gap year history, education level, IELTS score bounds or work skills..." 
                    : "আপনার পড়াশোনা বা সর্বশেষ জিপিএ, আইএলটিএস স্কোর বা কাজের দক্ষতা সংক্ষেপে উল্লেখ করুন..."}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded text-xs text-slate-800 focus:outline-none transition-colors resize-y leading-relaxed font-light"
                  value={profileMessage}
                  onChange={(e) => setProfileMessage(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer duration-200"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{isSubmitting ? (lang === "en" ? "Enqueuing..." : "দাখিল হচ্ছে...") : t.contact.submitForm}</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Right Side: Office address details (Col span 5) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          
          {/* Office Credentials block */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 flex-1 flex flex-col justify-center">
            
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-blue-600" />
              <span>{t.contact.officeTitle}</span>
            </h3>

            <p className="text-[11.5px] text-slate-500 leading-relaxed font-light">
              {lang === "en"
                ? "Ideally located in Kazi Nazrul Islam Avenue, Shahbagh, Concord Tower. Directly reachable by Metrorail or public transit."
                : "ঢাকা শাহবাগ মোড়ে কনকর্ড টাওয়ারে আমাদের প্রধান কার্যালয় অবস্থিত। খুব সহজেই মেট্রোরেল শাহবাগ স্টেশন হতে নেমে আমাদের অফিসে পৌঁছাতে পারবেন।"}
            </p>

            <ul className="space-y-4 text-xs text-slate-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 uppercase font-sans text-[10.5px] font-bold">Main corporate street address:</strong>
                  <span className="text-slate-600 text-[11px] leading-relaxed block mt-0.5">{lang === "en" ? customData.officeAddressEn : customData.officeAddressBn}</span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 uppercase font-sans text-[10.5px] font-bold">Contact Phones support:</strong>
                  <span className="text-slate-600 text-[11.5px] block font-mono mt-0.5">{lang === "en" ? customData.officePhoneEn : customData.officePhoneBn}</span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 uppercase font-sans text-[10.5px] font-bold">Secure corporate inquiry box:</strong>
                  <span className="text-slate-600 text-[11.5px] block font-mono mt-0.5">{lang === "en" ? customData.officeEmailEn : customData.officeEmailBn}</span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 uppercase font-sans text-[10.5px] font-bold">Desk working hours:</strong>
                  <span className="text-slate-600 text-[11.5px] block font-mono mt-0.5">{lang === "en" ? customData.officeHoursEn : customData.officeHoursBn}</span>
                </div>
              </li>
            </ul>

          </div>

          {/* Section 2: Safe client assurance label */}
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="font-light">
              <strong className="text-slate-900 font-bold block uppercase tracking-wide">Government Compliant Counsel</strong>
              <p className="text-[11px] leading-relaxed mt-0.5">
                {lang === "en" 
                  ? "Ideal Sky Tours holds fully accredited registration certificates enabling direct consular linkages." 
                  : "আইডিয়াল স্কাই ট্যুরস বাংলাদেশ সরকারের প্রয়োজনীয় ট্রেড লাইসেন্স ও আইনি ট্রাস্টের সাথে সরাসরি নিবন্ধিত।"}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ================= GEOLOCATION EMBEDDED GOOGLE MAPS ================= */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between pb-3.5 px-2 border-b border-slate-100 mb-4 text-xs font-bold text-slate-400 font-mono">
            <span>OFFICIAL DHAKA SHAHBAGH OFFICE GEO-LOCATION</span>
            <span>GOOGLE MAPS PORTAL GROUNDING</span>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden aspect-video max-h-[360px] border border-slate-100 shadow-inner bg-slate-100">
            {/* Authentic Embedded Google Map Centered around Shahbagh Kazi Nazrul Islam Avenue */}
            <iframe 
              src={customData.contactMapEmbedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ideal Sky Tours Shahbagh Branch Location Concord Tower"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => onNavigate("admin")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-slate-200 text-xs font-bold uppercase tracking-widest rounded-lg shadow-md transition-all cursor-pointer"
          >
            <span>🔑</span>
            <span>{lang === "en" ? "Admin Console" : "অ্যাডমিন কনসোল"}</span>
          </button>
        </div>
      </section>

    </div>
  );
}
