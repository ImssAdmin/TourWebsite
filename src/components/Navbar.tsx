import { useState } from "react";
import { PageId, NavItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight, MessageSquare, Globe } from "lucide-react";
import Logo from "./Logo";
import { translations } from "../utils/translations";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (id: PageId) => void;
  lang: "en" | "bn";
  setLang: (lang: "en" | "bn") => void;
}

export default function Navbar({ currentPage, onNavigate, lang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  // Dynamically translate navigation labels based on current language selection
  const navItems: NavItem[] = [
    { id: "home", label: t.nav.home },
    { id: "student-visa", label: t.nav.studentVisa },
    { id: "visit-visa", label: t.nav.visitVisa },
    { id: "work-permit", label: t.nav.workPermit },
    { id: "business-visa", label: t.nav.businessVisa },
    { id: "contact", label: t.nav.contact },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLang(lang === "en" ? "bn" : "en");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(37,99,235,0.15)]">
            <Logo size={40} className="transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div>
            <div className="font-sans font-black text-xs sm:text-sm tracking-wider text-slate-900 leading-none">
              IDEAL <span className="text-blue-600">SKY</span> <span className="text-blue-500">TOURS</span>
            </div>
            <span className="text-[8px] sm:text-[9.5px] font-mono uppercase tracking-[0.1em] text-slate-400 font-bold block pt-1">
              {lang === "en" ? "Visa Consultancy" : "ভিসা কনসালটেন্সি"}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-3.5 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors duration-250 cursor-pointer ${
                currentPage === item.id 
                  ? "text-blue-600" 
                  : "text-slate-600 hover:text-blue-600"
              }`}
              id={`nav-item-${item.id}`}
            >
              {currentPage === item.id && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-blue-50 border border-blue-105/40 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* Language Switcher + Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-1.5 py-1 rounded-md border border-slate-200 text-[10px] font-black text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all cursor-pointer bg-slate-50 uppercase shrink-0"
            id="lang-toggle-desktop"
            title={lang === "en" ? "Switch to Bengali" : "ইংরেজি ভাষা সিলেক্ট করুন"}
          >
            <Globe className="w-3 h-3 text-blue-500" />
            <span>{lang === "en" ? "BN" : "EN"}</span>
          </button>

          {/* Contact Direct CTA button */}
          <button 
            onClick={() => handleNavClick("contact")}
            className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/15 cursor-pointer transition-all duration-300 rounded-lg"
            id="desktop-cta-btn"
          >
            {t.nav.freeAssessment}
          </button>
        </div>

        {/* Mobile Navigation and Language controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick Language Toggle on Mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-1.5 py-1 rounded-md border border-slate-200 text-[10px] font-black text-slate-600 bg-slate-50 cursor-pointer shrink-0"
            id="lang-toggle-mobile"
          >
            <Globe className="w-3 h-3 text-blue-500" />
            <span>{lang === "en" ? "BN" : "EN"}</span>
          </button>

          {/* Mobile Hamburguer trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-5.5 h-5.5 text-blue-600" /> : <Menu className="w-5.5 h-5.5 text-slate-700" />}
          </button>
        </div>

      </div>

      {/* Mobile Sidebar/Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-xl"
            id="mobile-nav-panel"
          >
            <div className="px-5 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-lg text-left font-bold transition-all cursor-pointer ${
                    currentPage === item.id 
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-2.5" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  <span className="text-xs uppercase tracking-widest">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${currentPage === item.id ? "translate-x-1 text-blue-600" : "opacity-30 text-slate-400"}`} />
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                <button 
                  onClick={() => handleNavClick("contact")}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md flex items-center justify-center gap-2 rounded-lg"
                  id="mobile-cta-btn"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>{t.nav.freeAssessment}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
