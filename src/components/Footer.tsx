import React, { useState, useEffect } from "react";
import { PageId } from "../types";
import { ArrowUpRight, ShieldCheck, Globe, Star, MapPin, Mail, Phone, Clock } from "lucide-react";
import Logo from "./Logo";
import { translations } from "../utils/translations";
import { loadCustomData } from "../utils/customizationStore";

interface FooterProps {
  onNavigate: (id: PageId) => void;
  lang: "en" | "bn";
}

export default function Footer({ onNavigate, lang }: FooterProps) {
  const t = translations[lang];

  const [customData, setCustomData] = useState(() => loadCustomData());

  useEffect(() => {
    const handleUpdate = () => {
      setCustomData(loadCustomData());
    };
    window.addEventListener("customDataUpdated", handleUpdate);
    return () => {
      window.removeEventListener("customDataUpdated", handleUpdate);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 relative overflow-hidden font-sans">
      {/* Decorative vector background */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[125px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Agency Brand Intro */}
          <div className="space-y-5">
            <div 
              className="flex items-center gap-2.5 cursor-pointer group" 
              onClick={() => onNavigate("home")}
              id="footer-logo"
            >
              <Logo size={42} className="filter drop-shadow-[0_2px_6px_rgba(59,130,246,0.2)] transition-transform duration-300 group-hover:scale-105" />
              <div className="font-sans font-black text-sm tracking-widest text-white">
                IDEAL <span className="text-blue-500">SKY</span> <span className="text-blue-400">TOURS</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {lang === "en" 
                ? "Licensed student relocation and overseas consultancy firm based in Dhaka, Bangladesh. Authorized specialists in high-success admissions and visa clearances."
                : "ঢাকা, বাংলাদেশে অবস্থিত লাইসেন্সপ্রাপ্ত স্টুডেন্ট রিলোকেশন এবং ওভারসিজ ইমিগ্রেশন কনসালটেন্সি। আমরা গ্যারান্টিড সাকসেস ভর্তি ও ভিসা ক্লিয়ারেন্স সংক্রান্ত বিশেষজ্ঞ টিম।"}
            </p>
            <div className="flex flex-col gap-1.5 text-[10px] font-mono tracking-wider text-slate-500 uppercase">
              <div>EST. 2018 — LICENSE AG-20914</div>
              <div>ACCREDITED MEMBER & DIPLOMATIC EMBASSY SYNC</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {lang === "en" ? "Visa Categories" : "ভিসা ক্যাটাগরি"}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.nav.studentVisa, id: "student-visa" },
                { label: t.nav.visitVisa, id: "visit-visa" },
                { label: t.nav.workPermit, id: "work-permit" },
                { label: t.nav.businessVisa, id: "business-visa" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.id as PageId)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 hover:underline transition-colors cursor-pointer text-left font-medium"
                    id={`footer-nav-${link.id}`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-blue-500 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trust, Address & Working Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              {lang === "en" ? " Dhaka Office" : "ঢাকা অফিস"}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[11px]">{lang === "en" ? customData.officeAddressEn : customData.officeAddressBn}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-[11px]">{lang === "en" ? customData.officePhoneEn : customData.officePhoneBn}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-[11px]">{lang === "en" ? customData.officeEmailEn : customData.officeEmailBn}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-[11px] font-mono">{lang === "en" ? customData.officeHoursEn : customData.officeHoursBn}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Quick scroll to top */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {lang === "en" ? "Newsletter Bureau" : "নিউজলেটার ব্যুরো"}
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === "en" 
                ? "Get real-time embassy visa quota adjustments or study seat announcements directly in your inbox."
                : "বাস্তব সময়ে অ্যাম্বেসির কোটা পরিবর্তন এবং বিভিন্ন দেশের সর্বশেষ স্কিলড মাইগ্রেশনের খবর ইমেইলে পান।"}
            </p>
            <div className="flex gap-2">
              <input 
                type="email"
                placeholder={lang === "en" ? "Your email address..." : "আপনার ইমেইল..."} 
                className="w-full h-9 px-3 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                aria-label="Newsletter input"
              />
              <button 
                onClick={scrollToTop}
                className="h-9 w-9 bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center rounded cursor-pointer transition-colors shrink-0"
                aria-label="Scroll to top"
                title={lang === "en" ? "Back to top" : "উপরে যান"}
              >
                <span className="text-xs font-bold font-mono">TOP</span>
              </button>
            </div>
          </div>

        </div>

        {/* Global Regulatory compliance badges & footer credits */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500 tracking-wider uppercase">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span>&copy; {new Date().getFullYear()} IDEAL SKY TOURS. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> B2C RECOGNIZED</span>
            <span>|</span>
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-blue-400" /> DHAKA REGISTERED</span>
            <span>|</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> 5-STAR RATING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
