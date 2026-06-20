import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock, KeyRound, Save, RefreshCw, LayoutGrid, Sparkles, Building, CheckCircle2, AlertTriangle, Eye, ArrowLeft, GraduationCap, Briefcase, LineChart, Plane, MessageSquare, Calendar, User, Mail, Phone
} from "lucide-react";
import {
  loadCustomData,
  saveCustomData,
  resetCustomData,
  CustomData,
  CustomHeroSlide,
  HomeCategoryCustomize,
  TeamMember,
  CustomSuccessStory,
  CustomBlog,
  RelocationDestination,
  StudentCountry,
  WorkOpportunity,
  BusinessProgram,
  VisitDestination
} from "../../utils/customizationStore";

interface AdminViewProps {
  lang: "en" | "bn";
  onNavigate: (id: any) => void;
}

export default function AdminView({ lang, onNavigate }: AdminViewProps) {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Content Customization State
  const [customData, setCustomData] = useState<CustomData>(loadCustomData());
  const [activeTab, setActiveTab] = useState<"destinations" | "hero" | "office" | "student" | "work" | "business" | "visit" | "config" | "contacts">("destinations");
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Contacts State
  const [contacts, setContacts] = useState<any[]>([]);

  // Try keeping session
  React.useEffect(() => {
    fetch("/api/me").then(r => {
      if (r.ok) return r.json();
      throw new Error("No session");
    }).then(d => {
      setIsLoggedIn(true);
      setUserRole(d.user.role);
    }).catch(() => { });
  }, []);

  // Fetch contacts when activeTab is "contacts"
  React.useEffect(() => {
    if (activeTab === "contacts" && isLoggedIn) {
      fetch("/api/contacts")
        .then(r => {
          if (r.ok) return r.json();
          throw new Error("Failed to fetch contacts");
        })
        .then(setContacts)
        .catch(err => console.error(err));
    }
  }, [activeTab, isLoggedIn]);

  // Secure login verification
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        setUserRole(data.role);
        setLoginError("");
      } else {
        const d = await res.json();
        setLoginError(d.error || (lang === "en" ? "Invalid admin credentials" : "ভুল ইউজারনেম বা পাসওয়ার্ড"));
      }
    } catch {
      setLoginError(lang === "en" ? "Network error" : "নেটওয়ার্ক সমস্যা");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsLoggedIn(false);
    setUserRole("");
    setUsername("");
    setPassword("");
  };

  // Notification helper
  const triggerNotification = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // State update handlers
  const handleBaseChange = (key: keyof Omit<CustomData, "destinations" | "studentCountries" | "workOpportunities" | "businessPrograms" | "visitDestinations" | "homeSlides" | "successStories" | "blogs">, val: string) => {
    setCustomData(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const handleVisitDestinationChange = (index: number, key: keyof VisitDestination, val: string | string[]) => {
    const updated = [...(customData.visitDestinations || [])];
    updated[index] = {
      ...updated[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      visitDestinations: updated
    }));
  };

  const handleHomeSlideChange = (index: number, key: keyof CustomHeroSlide, val: string) => {
    const updated = [...(customData.homeSlides || [])];
    updated[index] = {
      ...updated[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      homeSlides: updated
    }));
  };

  const handleHomeCategoryChange = (index: number, key: keyof HomeCategoryCustomize, val: string) => {
    const updated = [...(customData.homeCategories || [])];
    if (!updated[index]) {
      updated[index] = { id: "", titleEn: "", titleBn: "", descEn: "", descBn: "", num: "", image: "" };
    }
    updated[index] = {
      ...updated[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      homeCategories: updated
    }));
  };

  const handleAddHomeCategory = () => {
    setCustomData(prev => ({
      ...prev,
      homeCategories: [
        ...(prev.homeCategories || []),
        { id: `custom-category-${Date.now()}`, titleEn: "New Category", titleBn: "নতুন ক্যাটাগরি", descEn: "Category description", descBn: "ক্যাটাগরি বর্ণনা", num: "0", image: "" }
      ]
    }));
  };

  const handleDeleteHomeCategory = (index: number) => {
    const updated = [...(customData.homeCategories || [])];
    updated.splice(index, 1);
    setCustomData(prev => ({
      ...prev,
      homeCategories: updated
    }));
  };

  const handleTeamMemberChange = (index: number, key: keyof TeamMember, val: string) => {
    const updated = [...(customData.homeTeamMembers || [])];
    if (!updated[index]) {
      updated[index] = { name: "", roleEn: "", roleBn: "", image: "" };
    }
    updated[index] = {
      ...updated[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      homeTeamMembers: updated
    }));
  };

  const handleSuccessStoryChange = (index: number, key: keyof CustomSuccessStory, val: string) => {
    const updated = [...(customData.successStories || [])];
    updated[index] = {
      ...updated[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      successStories: updated
    }));
  };

  const handleBlogChange = (index: number, key: keyof CustomBlog, val: string) => {
    const updated = [...(customData.blogs || [])];
    updated[index] = {
      ...updated[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      blogs: updated
    }));
  };

  const handleDestinationChange = (index: number, key: keyof RelocationDestination, val: string) => {
    const updatedDestinations = [...customData.destinations];
    updatedDestinations[index] = {
      ...updatedDestinations[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      destinations: updatedDestinations
    }));
  };

  const handleAddDestination = () => {
    setCustomData(prev => ({
      ...prev,
      destinations: [
        ...prev.destinations,
        {
          flag: "🌍",
          code: "NEW",
          nameEn: "New Destination",
          nameBn: "নতুন গন্তব্য",
          descEn: "Describe the destination...",
          descBn: "গন্তব্য সম্পর্কে লিখুন...",
          image: ""
        }
      ]
    }));
  };

  const handleDeleteDestination = (index: number) => {
    const updatedDestinations = [...customData.destinations];
    updatedDestinations.splice(index, 1);
    setCustomData(prev => ({
      ...prev,
      destinations: updatedDestinations
    }));
  };

  const handleStudentCountryChange = (index: number, key: keyof StudentCountry, val: string | string[]) => {
    const updatedCountries = [...(customData.studentCountries || [])];
    updatedCountries[index] = {
      ...updatedCountries[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      studentCountries: updatedCountries
    }));
  };

  const handleAddStudentCountry = () => {
    setCustomData(prev => ({
      ...prev,
      studentCountries: [
        ...(prev.studentCountries || []),
        { id: `student-country-${Date.now()}`, nameEn: "New Country", nameBn: "নতুন দেশ", flag: "🌍", image: "", taglineEn: "Tagline", taglineBn: "ট্যাগলাইন", intakesEn: "Intakes", intakesBn: "ইনটেক", costRangeEn: "Costs", costRangeBn: "খরচ", ieltsRequirementEn: "IELTS", ieltsRequirementBn: "আইএলটিএস", incentivesEn: [], incentivesBn: [] }
      ]
    }));
  };

  const handleDeleteStudentCountry = (index: number) => {
    const updatedCountries = [...(customData.studentCountries || [])];
    updatedCountries.splice(index, 1);
    setCustomData(prev => ({
      ...prev,
      studentCountries: updatedCountries
    }));
  };

  const handleAddWorkOpportunity = () => {
    setCustomData(prev => ({
      ...prev,
      workOpportunities: [
        ...(prev.workOpportunities || []),
        { id: `work-opp-${Date.now()}`, countryEn: "New Country", countryBn: "নতুন দেশ", flag: "🌍", successRate: "90%", accommodationEn: "Provided", accommodationBn: "প্রদান করা হবে", avgSalaryEn: "$1000", avgSalaryBn: "$১০০০", processingTimeEn: "1 month", processingTimeBn: "১ মাস", image: "", tradesEn: [], tradesBn: [] }
      ]
    }));
  };

  const handleDeleteWorkOpportunity = (index: number) => {
    const updatedOpp = [...(customData.workOpportunities || [])];
    updatedOpp.splice(index, 1);
    setCustomData(prev => ({
      ...prev,
      workOpportunities: updatedOpp
    }));
  };

  const handleWorkOpportunityChange = (index: number, key: keyof WorkOpportunity, val: string | string[]) => {
    const updatedOpp = [...(customData.workOpportunities || [])];
    updatedOpp[index] = {
      ...updatedOpp[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      workOpportunities: updatedOpp
    }));
  };

  const handleAddBusinessProgram = () => {
    setCustomData(prev => ({
      ...prev,
      businessPrograms: [
        ...(prev.businessPrograms || []),
        { id: `business-prog-${Date.now()}`, nameEn: "New Program", nameBn: "নতুন প্রোগ্রাম", flag: "🌍", capitalEn: "$50000", capitalBn: "$৫০,০০০", visaValidityEn: "1 Year", visaValidityBn: "১ বছর", highlightEn: "Highlight", highlightBn: "হাইলাইট", image: "", pointsEn: [], pointsBn: [] }
      ]
    }));
  };

  const handleDeleteBusinessProgram = (index: number) => {
    const updatedPrograms = [...(customData.businessPrograms || [])];
    updatedPrograms.splice(index, 1);
    setCustomData(prev => ({
      ...prev,
      businessPrograms: updatedPrograms
    }));
  };

  const handleBusinessProgramChange = (index: number, key: keyof BusinessProgram, val: string | string[]) => {
    const updatedPrograms = [...(customData.businessPrograms || [])];
    updatedPrograms[index] = {
      ...updatedPrograms[index],
      [key]: val
    };
    setCustomData(prev => ({
      ...prev,
      businessPrograms: updatedPrograms
    }));
  };

  const compressImage = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const MAX_DIM = 800; // limit size for localStorage
          if (width > height && width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          } else if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          callback(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const success = saveCustomData(customData);
    if (success) {
      triggerNotification(
        "success",
        lang === "en"
          ? "All configurations saved successfully! Core text & photos are updated live."
          : "সকল কনফিগারেশন সফলভাবে সংরক্ষিত হয়েছে! নতুন তথ্য সরাসরি ওয়েবসাইটে আপডেট হয়েছে।"
      );
    } else {
      triggerNotification("error", lang === "en" ? "Failed to save configuration." : "সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  const handleReset = () => {
    if (window.confirm(lang === "en" ? "Are you sure you want to restore all original texts and pictures?" : "আপনি কি সত্যিই সব তথ্য পূর্বাবস্থায় ফিরিয়ে নিতে চান?")) {
      const reseted = resetCustomData();
      setCustomData(reseted);
      triggerNotification(
        "success",
        lang === "en"
          ? "Website rolled back to native presets successfully."
          : "সাফল্যের সাথে সকল টেক্সট এবং ছবি ফ্যাক্টরি রিসেট করা হয়েছে।"
      );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Back Link */}
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-2 mb-6 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === "en" ? "Back to Homepage" : "মূল পেইজে ফিরে যান"}</span>
        </button>

        {!isLoggedIn ? (
          /* ================= LOGIN COMPONENT ================= */
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-blue-600 px-6 py-8 text-center text-white relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-indigo-600 opacity-90"></div>
              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-2 backdrop-blur-xs">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-extrabold text-lg uppercase tracking-wider">
                  {lang === "en" ? "Ideal Sky Portal Admin" : "আইডিয়াল স্কাই অ্যাডমিন পোর্টাল"}
                </h1>
                <p className="text-xs text-blue-100 font-light">
                  {lang === "en" ? "Authorized Management Access Console" : "অনুমোদিত প্রশাসনিক কর্মকর্তা প্রবেশদ্বার"}
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  {lang === "en" ? "Username" : "ইউজারনেম"}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                  placeholder={lang === "en" ? "Enter admin username..." : "অ্যাডমিন ইউজারনেম লিখুন..."}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  {lang === "en" ? "Password" : "পাসওয়ার্ড"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <div className="p-2.5 bg-red-50 border border-red-150 text-[11px] font-bold text-red-650 rounded-lg flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-transform duration-200 active:scale-98 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{lang === "en" ? "Access Admin Desk" : "কনসোল প্রবেশ করুন"}</span>
              </button>
            </form>
          </div>
        ) : (
          /* ================= ADMIN CONSOLE DISPLAY ================= */
          <div className="space-y-6">

            {/* Real-time Notifications */}
            <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 border rounded-2xl flex items-start gap-3 shadow-lg ${notification.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                    }`}
                >
                  <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${notification.type === "success" ? "text-emerald-600" : "text-rose-600"}`} />
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                      {notification.type === "success" ? "Operation Accomplished" : "Operation Error"}
                    </h4>
                    <p className="text-[11px] leading-relaxed mt-0.5">{notification.msg}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dashboard Header */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="px-2.5 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[9px] uppercase tracking-widest font-mono">LIVE MODULE</span>
                  <span className="text-[10px] text-slate-400 font-mono">ROLE: <strong className="text-blue-500">{userRole}</strong></span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                  {lang === "en" ? "Brand Customizer Control Console" : "ব্র্যান্ড কাস্টমাইজার কনট্রোল কনসোল"}
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-light">
                  {lang === "en"
                    ? "Directly edit texts and photos based on your granted permissions."
                    : "আপনার অনুমতি অনুযায়ী সাইটের যেকোনো ছবি এবং লেখার বিষয়বস্তু পরিবর্তন করুন।"}
                </p>
              </div>

              {/* Main Save & Reset Actions */}
              <div className="flex flex-wrap gap-2.5 shrink-0 justify-center">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer bg-white border border-red-200"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{lang === "en" ? "Logout" : "লগ আউট"}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{lang === "en" ? "Reset Defaults" : "ফ্যাক্টরি রিসেট"}</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-250 active:scale-95 shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === "en" ? "Save Modifications" : "পরিবর্তনসমূহ সংরক্ষণ করুন"}</span>
                </button>
              </div>
            </div>

            {/* Editing Section Tabs */}
            <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-px">
              {[
                { id: "destinations", label: lang === "en" ? "Relocation Destinations" : "রিলোকেশন গন্তব্যসমূহ", icon: LayoutGrid },
                { id: "hero", label: lang === "en" ? "Home Category" : "হোম ক্যাটাগরি", icon: Sparkles },
                { id: "office", label: lang === "en" ? "Office Address & Contact" : "অফিসের ঠিকানা ও কন্টাক্ট", icon: Building },
                { id: "student", label: lang === "en" ? "Student Visa" : "স্টুডেন্ট ভিসা", icon: GraduationCap },
                { id: "work", label: lang === "en" ? "Work Permit" : "ওয়ার্ক পারমিট", icon: Briefcase },
                { id: "business", label: lang === "en" ? "Business Visa" : "বিজনেস ভিসা", icon: LineChart },
                { id: "visit", label: lang === "en" ? "Visit Visa" : "ভিসিট ভিসা", icon: Plane },
                { id: "contacts", label: lang === "en" ? "Contact Submissions" : "কন্টাক্ট ফর্ম সাবমিশন", icon: MessageSquare }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer ${isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-450 hover:text-slate-800 hover:border-slate-300"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ================= TAB 1: RELOCATION DESTINATIONS ================= */}
            {activeTab === "destinations" && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50/50 border border-blue-150 rounded-2xl">
                  <p className="text-[10px] sm:text-[11px] block leading-relaxed font-medium text-blue-800">
                    💡 <strong>{lang === "en" ? "Relocation Section Instructions:" : "নির্দেশনা:"}</strong>{" "}
                    {lang === "en"
                      ? "Change the flags, country ISO codes (e.g. GB, CA, EU, SA), names, descriptions, or photo URLs below. Each country card will render its specific photo on the left beside the details inside the 'Popular Relocation Destinations' block with the dynamic 'Book Now' trigger!"
                      : "নিচের প্রতিটি দেশের জন্য ফ্ল্যাগ, কান্ট্রি কোড, ভিন্ন ভিন্ন ভাষার নাম, বর্ণনা এবং আকর্ষণীয় ছবির লিংক পরিবর্তন করতে পারবেন। প্রতিটি দেশের ছবি বাম পাশে এবং ডান পাশে বুকিং বাটন সহ চমৎকার কার্ডে রেন্ডার হবে!"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customData.destinations.map((dst, idx) => (
                    <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {/* Flag and Headline */}
                      <div className="bg-slate-55 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{dst.flag}</span>
                          <span className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                            {dst.code} • DESTINATION #{idx + 1}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-150 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                            {dst.nameEn || "Country name"}
                          </span>
                          <button
                            onClick={() => handleDeleteDestination(idx)}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-2 py-0.5 rounded text-[10px] font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        {/* Live Image Preview & URL */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                              {lang === "en" ? "Iconic Image URL" : "দেশের ছবি (URL)"}
                            </label>
                            <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                              <Eye className="w-3 h-3" /> Live Preview
                            </span>
                          </div>

                          <div className="flex gap-3">
                            <div className="w-18 h-18 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-150">
                              {dst.image ? (
                                <img
                                  src={dst.image}
                                  alt="Destination Photo Preview"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=300&q=80";
                                  }}
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 font-medium text-[10px]">No Image</div>
                              )}
                            </div>

                            <div className="flex flex-1 flex-col gap-2 justify-center">
                              <input
                                type="text"
                                value={dst.image}
                                onChange={e => handleDestinationChange(idx, "image", e.target.value)}
                                className="w-full text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 hover:bg-slate-100/30 transition-all text-slate-750 font-mono"
                                placeholder="Unsplash image URL..."
                              />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload Photo from Device" : "ডিভাইস থেকে ছবি আপলোড করুন"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      compressImage(file, (base64) => {
                                        handleDestinationChange(idx, "image", base64);
                                      });
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Flag and Code Inputs */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              {lang === "en" ? "Flag Emoji" : "ফ্ল্যাগ ইমোজি"}
                            </label>
                            <input
                              type="text"
                              value={dst.flag}
                              onChange={e => handleDestinationChange(idx, "flag", e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                              placeholder="e.g. 🇬🇧"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              {lang === "en" ? "Country Code" : "কান্ট্রি কোড (ISO)"}
                            </label>
                            <input
                              type="text"
                              value={dst.code}
                              onChange={e => handleDestinationChange(idx, "code", e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono uppercase"
                              placeholder="e.g. GB"
                            />
                          </div>
                        </div>

                        {/* Country Names */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              {lang === "en" ? "Name (English)" : "নাম (ইংরেজি)"}
                            </label>
                            <input
                              type="text"
                              value={dst.nameEn}
                              onChange={e => handleDestinationChange(idx, "nameEn", e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                              placeholder="United Kingdom"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              {lang === "en" ? "Name (Bangla)" : "নাম (বাংলা)"}
                            </label>
                            <input
                              type="text"
                              value={dst.nameBn}
                              onChange={e => handleDestinationChange(idx, "nameBn", e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                              placeholder="যুক্তরাজ্য"
                            />
                          </div>
                        </div>

                        {/* Country Description EN */}
                        <div className="space-y-1">
                          <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">
                            {lang === "en" ? "Description (English)" : "বর্ণনা (ইংরেজি)"}
                          </label>
                          <textarea
                            value={dst.descEn}
                            onChange={e => handleDestinationChange(idx, "descEn", e.target.value)}
                            rows={2}
                            className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                            placeholder="Study permit, certified universities, PGWP etc..."
                          />
                        </div>

                        {/* Country Description BN */}
                        <div className="space-y-1">
                          <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">
                            {lang === "en" ? "Description (Bangla)" : "বর্ণনা (বাংলা)"}
                          </label>
                          <textarea
                            value={dst.descBn}
                            onChange={e => handleDestinationChange(idx, "descBn", e.target.value)}
                            rows={2}
                            className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                            placeholder="সহজে স্টাডি পারমিটের আবেদন..."
                          />
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-start">
                  <button
                    onClick={handleAddDestination}
                    className="mt-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    + {lang === "en" ? "Add Destination" : "নতুন গন্তব্য যোগ করুন"}
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 2: HERO & ABOUT CONFIG ================= */}
            {activeTab === "hero" && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{lang === "en" ? "Hero Banner Configurations" : "হিরো ব্যানার এর বিষয়বস্তু সম্পাদনা"}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Hero Gold Tag (English)</label>
                    <input
                      type="text"
                      value={customData.heroTagEn}
                      onChange={e => handleBaseChange("heroTagEn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 (border border-slate-200) focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Hero Gold Tag (Bangla)</label>
                    <input
                      type="text"
                      value={customData.heroTagBn}
                      onChange={e => handleBaseChange("heroTagBn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 (border border-slate-200) focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Hero Main Title (English)</label>
                    <input
                      type="text"
                      value={customData.heroTitleEn}
                      onChange={e => handleBaseChange("heroTitleEn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 (border border-slate-200) focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Hero Main Title (Bangla)</label>
                    <input
                      type="text"
                      value={customData.heroTitleBn}
                      onChange={e => handleBaseChange("heroTitleBn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 (border border-slate-200) focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Hero Highlight Word (English)</label>
                    <input
                      type="text"
                      value={customData.heroTitleHighlightEn}
                      onChange={e => handleBaseChange("heroTitleHighlightEn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 (border border-slate-200) focus:outline-none focus:border-blue-500 font-bold text-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Hero Highlight Word (Bangla)</label>
                    <input
                      type="text"
                      value={customData.heroTitleHighlightBn}
                      onChange={e => handleBaseChange("heroTitleHighlightBn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 (border border-slate-200) focus:outline-none focus:border-blue-500 font-bold text-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Hero Subtitle Paragraph (English)</label>
                    <textarea
                      value={customData.heroSubtitleEn}
                      onChange={e => handleBaseChange("heroSubtitleEn", e.target.value)}
                      rows={2}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Hero Subtitle Paragraph (Bangla)</label>
                    <textarea
                      value={customData.heroSubtitleBn}
                      onChange={e => handleBaseChange("heroSubtitleBn", e.target.value)}
                      rows={2}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-relaxed"
                    />
                  </div>
                </div>

                <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 pt-6 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>{lang === "en" ? "Introduction (About) Section" : "কোম্পানি পরিচিতি ও ডেসক্রিপশন"}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Intro Header (English)</label>
                    <input
                      type="text"
                      value={customData.aboutTitleEn}
                      onChange={e => handleBaseChange("aboutTitleEn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Intro Header (Bangla)</label>
                    <input
                      type="text"
                      value={customData.aboutTitleBn}
                      onChange={e => handleBaseChange("aboutTitleBn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">About Paragraph 1 (English)</label>
                      <textarea
                        value={customData.aboutDesc1En}
                        onChange={e => handleBaseChange("aboutDesc1En", e.target.value)}
                        rows={3}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">About Paragraph 2 (English)</label>
                      <textarea
                        value={customData.aboutDesc2En}
                        onChange={e => handleBaseChange("aboutDesc2En", e.target.value)}
                        rows={3}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">About Paragraph 1 (Bangla)</label>
                      <textarea
                        value={customData.aboutDesc1Bn}
                        onChange={e => handleBaseChange("aboutDesc1Bn", e.target.value)}
                        rows={3}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">About Paragraph 2 (Bangla)</label>
                      <textarea
                        value={customData.aboutDesc2Bn}
                        onChange={e => handleBaseChange("aboutDesc2Bn", e.target.value)}
                        rows={3}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Home Video & Stats" : "হোম ভিডিও এবং পরিসংখ্যান"}</span>
                  </h3>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Home YouTube Video URL</label>
                    <input
                      type="text"
                      value={customData.homeVideoUrl || ""}
                      onChange={e => handleBaseChange("homeVideoUrl", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                      placeholder="e.g. https://www.youtube.com/embed/..."
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Stats: Processed (EN)</label>
                      <input value={customData.statsProcessedEn || ""} onChange={e => handleBaseChange("statsProcessedEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Stats: Processed (BN)</label>
                      <input value={customData.statsProcessedBn || ""} onChange={e => handleBaseChange("statsProcessedBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Stats: Ratio (EN)</label>
                      <input value={customData.statsRatioEn || ""} onChange={e => handleBaseChange("statsRatioEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Stats: Ratio (BN)</label>
                      <input value={customData.statsRatioBn || ""} onChange={e => handleBaseChange("statsRatioBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Stats: Success (EN)</label>
                      <input value={customData.statsSuccessEn || ""} onChange={e => handleBaseChange("statsSuccessEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Stats: Success (BN)</label>
                      <input value={customData.statsSuccessBn || ""} onChange={e => handleBaseChange("statsSuccessBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Stats: Countries (EN)</label>
                      <input value={customData.statsCountriesEn || ""} onChange={e => handleBaseChange("statsCountriesEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Stats: Countries (BN)</label>
                      <input value={customData.statsCountriesBn || ""} onChange={e => handleBaseChange("statsCountriesBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-slate-200" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Home Main Sliders" : "হোম পেইজ স্লাইডারসমূহ"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(customData.homeSlides || []).map((slide, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 space-y-3">
                        <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 border-b pb-2">
                          SLIDE #{idx + 1}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Image URL</label>
                          <div className="flex gap-2">
                            {slide.image && (
                              <img src={slide.image} alt="Cover" className="w-16 h-16 object-cover rounded shadow border border-slate-200 shrink-0" />
                            )}
                            <div className="flex flex-1 flex-col gap-1.5">
                              <input value={slide.image} onChange={e => handleHomeSlideChange(idx, "image", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" placeholder="Image URL..." />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-2 py-1.5 rounded text-[10px] flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload Photo" : "ছবি আপলোড"}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    compressImage(file, (base64) => {
                                      handleHomeSlideChange(idx, "image", base64);
                                    });
                                  }
                                }} />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Title (EN)</label>
                            <input value={slide.titleEn} onChange={e => handleHomeSlideChange(idx, "titleEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Title (BN)</label>
                            <input value={slide.titleBn} onChange={e => handleHomeSlideChange(idx, "titleBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Description (EN)</label>
                            <textarea value={slide.descEn} rows={2} onChange={e => handleHomeSlideChange(idx, "descEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Description (BN)</label>
                            <textarea value={slide.descBn} rows={2} onChange={e => handleHomeSlideChange(idx, "descBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Home Categories" : "হোম পেইজ ক্যাটাগরিসমূহ"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(customData.homeCategories || []).map((cat, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 space-y-3">
                        <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 border-b pb-2 flex justify-between items-center">
                          {cat.id.replace("-", " ")}
                          <button
                            onClick={() => handleDeleteHomeCategory(idx)}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-2 py-0.5 rounded text-[10px] font-bold"
                          >
                            Delete
                          </button>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">ID (unique, e.g. student-visa)</label>
                          <input value={cat.id} onChange={e => handleHomeCategoryChange(idx, "id", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Image URL</label>
                          <div className="flex gap-2">
                            {cat.image && (
                              <img src={cat.image} alt="Cover" className="w-16 h-16 object-cover rounded shadow border border-slate-200 shrink-0" />
                            )}
                            <div className="flex flex-1 flex-col gap-1.5">
                              <input value={cat.image} onChange={e => handleHomeCategoryChange(idx, "image", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" placeholder="Image URL..." />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-2 py-1.5 rounded text-[10px] flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload Photo" : "ছবি আপলোড"}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    compressImage(file, (base64) => {
                                      handleHomeCategoryChange(idx, "image", base64);
                                    });
                                  }
                                }} />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Number / Tag</label>
                          <input value={cat.num} onChange={e => handleHomeCategoryChange(idx, "num", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Title (EN)</label>
                            <input value={cat.titleEn} onChange={e => handleHomeCategoryChange(idx, "titleEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Title (BN)</label>
                            <input value={cat.titleBn} onChange={e => handleHomeCategoryChange(idx, "titleBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Description (EN)</label>
                            <textarea value={cat.descEn} rows={2} onChange={e => handleHomeCategoryChange(idx, "descEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Description (BN)</label>
                            <textarea value={cat.descBn} rows={2} onChange={e => handleHomeCategoryChange(idx, "descBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-start">
                    <button
                      onClick={handleAddHomeCategory}
                      className="mt-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      + {lang === "en" ? "Add Category" : "নতুন ক্যাটাগরি যোগ করুন"}
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Our Team Members" : "আমাদের টিম মেম্বার"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(customData.homeTeamMembers || []).map((member, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 space-y-3">
                        <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 border-b pb-2">
                          TEAM MEMBER #{idx + 1}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Image URL (Portrait recommended)</label>
                          <div className="flex gap-2">
                            {member.image && (
                              <img src={member.image} alt="Member" className="w-16 h-16 object-cover rounded shadow border border-slate-200 shrink-0" />
                            )}
                            <div className="flex flex-1 flex-col gap-1.5">
                              <input value={member.image} onChange={e => handleTeamMemberChange(idx, "image", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" placeholder="Image URL..." />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-2 py-1.5 rounded text-[10px] flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload Photo" : "ছবি আপলোড"}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    compressImage(file, (base64) => {
                                      handleTeamMemberChange(idx, "image", base64);
                                    });
                                  }
                                }} />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Name</label>
                          <input value={member.name} onChange={e => handleTeamMemberChange(idx, "name", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Role (EN)</label>
                            <input value={member.roleEn} onChange={e => handleTeamMemberChange(idx, "roleEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Role (BN)</label>
                            <input value={member.roleBn} onChange={e => handleTeamMemberChange(idx, "roleBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Home Success Stories" : "সাকসেস স্টোরিসমূহ"}</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-6">
                    {(customData.successStories || []).map((story, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 space-y-3">
                        <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 border-b pb-2">
                          STORY #{idx + 1}
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Name</label>
                            <input value={story.name} onChange={e => handleSuccessStoryChange(idx, "name", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Visa Type</label>
                            <input value={story.visaType} onChange={e => handleSuccessStoryChange(idx, "visaType", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Destination</label>
                            <input value={story.destination} onChange={e => handleSuccessStoryChange(idx, "destination", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Image URL</label>
                            <div className="flex flex-col gap-1.5">
                              <input value={story.image} onChange={e => handleSuccessStoryChange(idx, "image", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" placeholder="URL..." />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-2 py-1.5 rounded text-[10px] flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload" : "আপলোড"}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    compressImage(file, (base64) => {
                                      handleSuccessStoryChange(idx, "image", base64);
                                    });
                                  }
                                }} />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Quote (EN)</label>
                            <textarea value={story.quoteEn} rows={2} onChange={e => handleSuccessStoryChange(idx, "quoteEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Quote (BN)</label>
                            <textarea value={story.quoteBn} rows={2} onChange={e => handleSuccessStoryChange(idx, "quoteBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Home Blogs & News" : "ব্লগ ও খবর"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(customData.blogs || []).map((blog, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 space-y-3">
                        <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 border-b pb-2">
                          BLOG #{idx + 1}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Tag (EN)</label>
                            <input value={blog.tagEn} onChange={e => handleBlogChange(idx, "tagEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Tag (BN)</label>
                            <input value={blog.tagBn} onChange={e => handleBlogChange(idx, "tagBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Title (EN)</label>
                            <input value={blog.titleEn} onChange={e => handleBlogChange(idx, "titleEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Title (BN)</label>
                            <input value={blog.titleBn} onChange={e => handleBlogChange(idx, "titleBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Date</label>
                            <input value={blog.date} onChange={e => handleBlogChange(idx, "date", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Description (EN)</label>
                            <textarea value={blog.descEn} rows={2} onChange={e => handleBlogChange(idx, "descEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Description (BN)</label>
                            <textarea value={blog.descBn} rows={2} onChange={e => handleBlogChange(idx, "descBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ================= TAB 3: CONTACT & OFFICE ================= */}
            {activeTab === "office" && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>{lang === "en" ? "Dhaka Corporate HQ Details" : "ঢাকা কর্পোরেট হেড অফিস বিবরণ"}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Contact Map Embed URL (Google Maps)</label>
                    <input
                      type="text"
                      value={customData.contactMapEmbedUrl}
                      onChange={e => handleBaseChange("contactMapEmbedUrl", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Contact Title (English)</label>
                    <input
                      type="text"
                      value={customData.contactTitleEn}
                      onChange={e => handleBaseChange("contactTitleEn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Contact Title (Bangla)</label>
                    <input
                      type="text"
                      value={customData.contactTitleBn}
                      onChange={e => handleBaseChange("contactTitleBn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Contact Subtitle (English)</label>
                    <textarea
                      value={customData.contactSubtitleEn}
                      onChange={e => handleBaseChange("contactSubtitleEn", e.target.value)}
                      rows={2}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Contact Subtitle (Bangla)</label>
                    <textarea
                      value={customData.contactSubtitleBn}
                      onChange={e => handleBaseChange("contactSubtitleBn", e.target.value)}
                      rows={2}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Office Address Line (English)</label>
                    <textarea
                      value={customData.officeAddressEn}
                      onChange={e => handleBaseChange("officeAddressEn", e.target.value)}
                      rows={2}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Office Address Line (Bangla)</label>
                    <textarea
                      value={customData.officeAddressBn}
                      onChange={e => handleBaseChange("officeAddressBn", e.target.value)}
                      rows={2}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Contact Phones (English)</label>
                    <input
                      type="text"
                      value={customData.officePhoneEn}
                      onChange={e => handleBaseChange("officePhoneEn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Contact Phones (Bangla)</label>
                    <input
                      type="text"
                      value={customData.officePhoneBn}
                      onChange={e => handleBaseChange("officePhoneBn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">HQ Support Email (English)</label>
                    <input
                      type="email"
                      value={customData.officeEmailEn}
                      onChange={e => handleBaseChange("officeEmailEn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">HQ Support Email (Bangla)</label>
                    <input
                      type="email"
                      value={customData.officeEmailBn}
                      onChange={e => handleBaseChange("officeEmailBn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Office Hours (English)</label>
                    <input
                      type="text"
                      value={customData.officeHoursEn}
                      onChange={e => handleBaseChange("officeHoursEn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Office Hours (Bangla)</label>
                    <input
                      type="text"
                      value={customData.officeHoursBn}
                      onChange={e => handleBaseChange("officeHoursBn", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-10 border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* ================= TAB 4: STUDENT VISA ================= */}
            {activeTab === "student" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Student Visa Header & Video" : "স্টুডেন্ট ভিসা হেডার ও ভিডিও"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Title (English)</label>
                      <input
                        type="text"
                        value={customData.studentTitleEn || ""}
                        onChange={e => handleBaseChange("studentTitleEn", e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Title (Bangla)</label>
                      <input
                        type="text"
                        value={customData.studentTitleBn || ""}
                        onChange={e => handleBaseChange("studentTitleBn", e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Subtitle (English)</label>
                      <textarea
                        value={customData.studentSubtitleEn || ""}
                        onChange={e => handleBaseChange("studentSubtitleEn", e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Subtitle (Bangla)</label>
                      <textarea
                        value={customData.studentSubtitleBn || ""}
                        onChange={e => handleBaseChange("studentSubtitleBn", e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">YouTube Video ID</label>
                    <input
                      type="text"
                      value={customData.studentVideoUrl || ""}
                      onChange={e => handleBaseChange("studentVideoUrl", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                      placeholder="e.g. dQw4w9WgXcQ"
                    />
                  </div>
                </div>

                {/* Categories Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(customData.studentCountries || []).map((country, idx) => (
                    <div key={country.id || idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{country.flag}</span>
                          <span className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                            STUDENT COUNTRY #{idx + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteStudentCountry(idx)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-2 py-0.5 rounded text-[10px] font-bold"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Cover Image URL</label>
                          <div className="flex gap-3">
                            <div className="w-18 h-18 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-150">
                              {country.image ? (
                                <img src={country.image} alt="Cover" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 font-medium text-[10px]">No Image</div>
                              )}
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-2">
                              <input
                                type="text"
                                value={country.image}
                                onChange={e => handleStudentCountryChange(idx, "image", e.target.value)}
                                className="w-full text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                placeholder="Image URL..."
                              />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload Photo" : "ছবি আপলোড"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      compressImage(file, (base64) => {
                                        handleStudentCountryChange(idx, "image", base64);
                                      });
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Name (EN)</label>
                            <input value={country.nameEn} onChange={e => handleStudentCountryChange(idx, "nameEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Name (BN)</label>
                            <input value={country.nameBn} onChange={e => handleStudentCountryChange(idx, "nameBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Tagline (EN)</label>
                            <input value={country.taglineEn} onChange={e => handleStudentCountryChange(idx, "taglineEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Tagline (BN)</label>
                            <input value={country.taglineBn} onChange={e => handleStudentCountryChange(idx, "taglineBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Cost Range (EN)</label>
                            <input value={country.costRangeEn} onChange={e => handleStudentCountryChange(idx, "costRangeEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Cost Range (BN)</label>
                            <input value={country.costRangeBn} onChange={e => handleStudentCountryChange(idx, "costRangeBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Intakes (EN)</label>
                            <input value={country.intakesEn} onChange={e => handleStudentCountryChange(idx, "intakesEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Intakes (BN)</label>
                            <input value={country.intakesBn} onChange={e => handleStudentCountryChange(idx, "intakesBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">IELTS (EN)</label>
                            <input value={country.ieltsRequirementEn} onChange={e => handleStudentCountryChange(idx, "ieltsRequirementEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">IELTS (BN)</label>
                            <input value={country.ieltsRequirementBn} onChange={e => handleStudentCountryChange(idx, "ieltsRequirementBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Flag Emoji</label>
                            <input value={country.flag} onChange={e => handleStudentCountryChange(idx, "flag", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Incentives (EN - comma separated)</label>
                          <textarea
                            value={(country.incentivesEn || []).join(", ")}
                            onChange={e => handleStudentCountryChange(idx, "incentivesEn", e.target.value.split(",").map(s => s.trim()))}
                            rows={2}
                            className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200 leading-normal"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Incentives (BN - comma separated)</label>
                          <textarea
                            value={(country.incentivesBn || []).join(", ")}
                            onChange={e => handleStudentCountryChange(idx, "incentivesBn", e.target.value.split(",").map(s => s.trim()))}
                            rows={2}
                            className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200 leading-normal"
                          />
                        </div>

                      </div>
                    </div>
                  ))}
                  <div className="flex justify-start items-center">
                    <button
                      onClick={handleAddStudentCountry}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      + {lang === "en" ? "Add Country" : "নতুন দেশ যোগ করুন"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 5: WORK PERMIT ================= */}
            {activeTab === "work" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Work Permit Header & Video" : "ওয়ার্ক পারমিট হেডার ও ভিডিও"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Title (English)</label>
                      <input
                        type="text"
                        value={customData.workTitleEn || ""}
                        onChange={e => handleBaseChange("workTitleEn", e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Title (Bangla)</label>
                      <input
                        type="text"
                        value={customData.workTitleBn || ""}
                        onChange={e => handleBaseChange("workTitleBn", e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Subtitle (English)</label>
                      <textarea
                        value={customData.workSubtitleEn || ""}
                        onChange={e => handleBaseChange("workSubtitleEn", e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Subtitle (Bangla)</label>
                      <textarea
                        value={customData.workSubtitleBn || ""}
                        onChange={e => handleBaseChange("workSubtitleBn", e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">YouTube Video ID</label>
                    <input
                      type="text"
                      value={customData.workVideoUrl || ""}
                      onChange={e => handleBaseChange("workVideoUrl", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                      placeholder="e.g. dQw4w9WgXcQ"
                    />
                  </div>
                </div>

                {/* Categories Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(customData.workOpportunities || []).map((opp, idx) => (
                    <div key={opp.id || idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{opp.flag}</span>
                          <span className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                            WORK OPPORTUNITY #{idx + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteWorkOpportunity(idx)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-2 py-0.5 rounded text-[10px] font-bold"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Cover Image URL</label>
                          <div className="flex gap-3">
                            <div className="w-18 h-18 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-150">
                              {opp.image ? (
                                <img src={opp.image} alt="Cover" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 font-medium text-[10px]">No Image</div>
                              )}
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-2">
                              <input
                                type="text"
                                value={opp.image}
                                onChange={e => handleWorkOpportunityChange(idx, "image", e.target.value)}
                                className="w-full text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                placeholder="Image URL..."
                              />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload Photo" : "ছবি আপলোড"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      compressImage(file, (base64) => {
                                        handleWorkOpportunityChange(idx, "image", base64);
                                      });
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Country (EN)</label>
                            <input value={opp.countryEn} onChange={e => handleWorkOpportunityChange(idx, "countryEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Country (BN)</label>
                            <input value={opp.countryBn} onChange={e => handleWorkOpportunityChange(idx, "countryBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Success Rate</label>
                            <input value={opp.successRate} onChange={e => handleWorkOpportunityChange(idx, "successRate", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Flag Emoji</label>
                            <input value={opp.flag} onChange={e => handleWorkOpportunityChange(idx, "flag", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Avg Salary (EN)</label>
                            <input value={opp.avgSalaryEn} onChange={e => handleWorkOpportunityChange(idx, "avgSalaryEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Avg Salary (BN)</label>
                            <input value={opp.avgSalaryBn} onChange={e => handleWorkOpportunityChange(idx, "avgSalaryBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Processing Time (EN)</label>
                            <input value={opp.processingTimeEn} onChange={e => handleWorkOpportunityChange(idx, "processingTimeEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Processing Time (BN)</label>
                            <input value={opp.processingTimeBn} onChange={e => handleWorkOpportunityChange(idx, "processingTimeBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Accommodation (EN)</label>
                            <input value={opp.accommodationEn} onChange={e => handleWorkOpportunityChange(idx, "accommodationEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Accommodation (BN)</label>
                            <input value={opp.accommodationBn} onChange={e => handleWorkOpportunityChange(idx, "accommodationBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Trades (EN - comma separated)</label>
                          <textarea
                            value={(opp.tradesEn || []).join(", ")}
                            onChange={e => handleWorkOpportunityChange(idx, "tradesEn", e.target.value.split(",").map(s => s.trim()))}
                            rows={2}
                            className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200 leading-normal"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Trades (BN - comma separated)</label>
                          <textarea
                            value={(opp.tradesBn || []).join(", ")}
                            onChange={e => handleWorkOpportunityChange(idx, "tradesBn", e.target.value.split(",").map(s => s.trim()))}
                            rows={2}
                            className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200 leading-normal"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-start items-center">
                    <button
                      onClick={handleAddWorkOpportunity}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      + {lang === "en" ? "Add Opportunity" : "নতুন সুযোগ যোগ করুন"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 6: BUSINESS VISA ================= */}
            {activeTab === "business" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <LineChart className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Business Visa Header & Video" : "বিজনেস ভিসা হেডার ও ভিডিও"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Title (English)</label>
                      <input
                        type="text"
                        value={customData.businessTitleEn || ""}
                        onChange={e => handleBaseChange("businessTitleEn", e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Title (Bangla)</label>
                      <input
                        type="text"
                        value={customData.businessTitleBn || ""}
                        onChange={e => handleBaseChange("businessTitleBn", e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Subtitle (English)</label>
                      <textarea
                        value={customData.businessSubtitleEn || ""}
                        onChange={e => handleBaseChange("businessSubtitleEn", e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Subtitle (Bangla)</label>
                      <textarea
                        value={customData.businessSubtitleBn || ""}
                        onChange={e => handleBaseChange("businessSubtitleBn", e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">YouTube Video ID</label>
                    <input
                      type="text"
                      value={customData.businessVideoUrl || ""}
                      onChange={e => handleBaseChange("businessVideoUrl", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                      placeholder="e.g. dQw4w9WgXcQ"
                    />
                  </div>
                </div>

                {/* Categories Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(customData.businessPrograms || []).map((prog, idx) => (
                    <div key={prog.id || idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{prog.flag}</span>
                          <span className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                            BUSINESS PROGRAM #{idx + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteBusinessProgram(idx)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-2 py-0.5 rounded text-[10px] font-bold"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Cover Image URL</label>
                          <div className="flex gap-3">
                            <div className="w-18 h-18 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-150">
                              {prog.image ? (
                                <img src={prog.image} alt="Cover" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 font-medium text-[10px]">No Image</div>
                              )}
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-2">
                              <input
                                type="text"
                                value={prog.image}
                                onChange={e => handleBusinessProgramChange(idx, "image", e.target.value)}
                                className="w-full text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                placeholder="Image URL..."
                              />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload Photo" : "ছবি আপলোড"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      compressImage(file, (base64) => {
                                        handleBusinessProgramChange(idx, "image", base64);
                                      });
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Name (EN)</label>
                            <input value={prog.nameEn} onChange={e => handleBusinessProgramChange(idx, "nameEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Name (BN)</label>
                            <input value={prog.nameBn} onChange={e => handleBusinessProgramChange(idx, "nameBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Capital (EN)</label>
                            <input value={prog.capitalEn} onChange={e => handleBusinessProgramChange(idx, "capitalEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Capital (BN)</label>
                            <input value={prog.capitalBn} onChange={e => handleBusinessProgramChange(idx, "capitalBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Visa Validity (EN)</label>
                            <input value={prog.visaValidityEn} onChange={e => handleBusinessProgramChange(idx, "visaValidityEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Visa Validity (BN)</label>
                            <input value={prog.visaValidityBn} onChange={e => handleBusinessProgramChange(idx, "visaValidityBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Highlight (EN)</label>
                            <input value={prog.highlightEn} onChange={e => handleBusinessProgramChange(idx, "highlightEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Highlight (BN)</label>
                            <input value={prog.highlightBn} onChange={e => handleBusinessProgramChange(idx, "highlightBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Flag Emoji</label>
                            <input value={prog.flag} onChange={e => handleBusinessProgramChange(idx, "flag", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Points (EN - comma separated)</label>
                          <textarea
                            value={(prog.pointsEn || []).join(", ")}
                            onChange={e => handleBusinessProgramChange(idx, "pointsEn", e.target.value.split(",").map(s => s.trim()))}
                            rows={2}
                            className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200 leading-normal"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Points (BN - comma separated)</label>
                          <textarea
                            value={(prog.pointsBn || []).join(", ")}
                            onChange={e => handleBusinessProgramChange(idx, "pointsBn", e.target.value.split(",").map(s => s.trim()))}
                            rows={2}
                            className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200 leading-normal"
                          />
                        </div>

                      </div>
                    </div>
                  ))}
                  <div className="flex justify-start items-center">
                    <button
                      onClick={handleAddBusinessProgram}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      + {lang === "en" ? "Add Program" : "নতুন প্রোগ্রাম যোগ করুন"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 7: VISIT VISA ================= */}
            {activeTab === "visit" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Visit Visa Header & Video" : "ভিসিট ভিসা হেডার ও ভিডিও"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Title (English)</label>
                      <input
                        type="text"
                        value={customData.visitTitleEn || ""}
                        onChange={e => handleBaseChange("visitTitleEn", e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Title (Bangla)</label>
                      <input
                        type="text"
                        value={customData.visitTitleBn || ""}
                        onChange={e => handleBaseChange("visitTitleBn", e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Subtitle (English)</label>
                      <textarea
                        value={customData.visitSubtitleEn || ""}
                        onChange={e => handleBaseChange("visitSubtitleEn", e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Subtitle (Bangla)</label>
                      <textarea
                        value={customData.visitSubtitleBn || ""}
                        onChange={e => handleBaseChange("visitSubtitleBn", e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 leading-normal"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">YouTube Video ID</label>
                    <input
                      type="text"
                      value={customData.visitVideoUrl || ""}
                      onChange={e => handleBaseChange("visitVideoUrl", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                      placeholder="e.g. dQw4w9WgXcQ"
                    />
                  </div>
                </div>

                {/* Categories Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(customData.visitDestinations || []).map((dest, idx) => (
                    <div key={dest.id || idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{dest.flag}</span>
                          <span className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                            VISIT DESTINATION #{idx + 1}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 block">Cover Image URL</label>
                          <div className="flex gap-3">
                            <div className="w-18 h-18 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-150">
                              {dest.image ? (
                                <img src={dest.image} alt="Cover" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 font-medium text-[10px]">No Image</div>
                              )}
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-2">
                              <input
                                type="text"
                                value={dest.image}
                                onChange={e => handleVisitDestinationChange(idx, "image", e.target.value)}
                                className="w-full text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                placeholder="Image URL..."
                              />
                              <label className="cursor-pointer bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center justify-center hover:bg-slate-200 transition-colors w-full">
                                <span>{lang === "en" ? "Upload Photo" : "ছবি আপলোড"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      compressImage(file, (base64) => {
                                        handleVisitDestinationChange(idx, "image", base64);
                                      });
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Name (EN)</label>
                            <input value={dest.nameEn} onChange={e => handleVisitDestinationChange(idx, "nameEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Name (BN)</label>
                            <input value={dest.nameBn} onChange={e => handleVisitDestinationChange(idx, "nameBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Pricing (EN)</label>
                            <input value={dest.pricingEn} onChange={e => handleVisitDestinationChange(idx, "pricingEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Pricing (BN)</label>
                            <input value={dest.pricingBn} onChange={e => handleVisitDestinationChange(idx, "pricingBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Visa Validity (EN)</label>
                            <input value={dest.visaValidityEn} onChange={e => handleVisitDestinationChange(idx, "visaValidityEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Visa Validity (BN)</label>
                            <input value={dest.visaValidityBn} onChange={e => handleVisitDestinationChange(idx, "visaValidityBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Processing Time (EN)</label>
                            <input value={dest.processingEn} onChange={e => handleVisitDestinationChange(idx, "processingEn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Processing Time (BN)</label>
                            <input value={dest.processingBn} onChange={e => handleVisitDestinationChange(idx, "processingBn", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Rating</label>
                            <input value={dest.rating} onChange={e => handleVisitDestinationChange(idx, "rating", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Flag Emoji</label>
                            <input value={dest.flag} onChange={e => handleVisitDestinationChange(idx, "flag", e.target.value)} className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Requirements (EN - comma separated)</label>
                          <textarea
                            value={(dest.requirementsEn || []).join(", ")}
                            onChange={e => handleVisitDestinationChange(idx, "requirementsEn", e.target.value.split(",").map(s => s.trim()))}
                            rows={2}
                            className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200 leading-normal"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">Requirements (BN - comma separated)</label>
                          <textarea
                            value={(dest.requirementsBn || []).join(", ")}
                            onChange={e => handleVisitDestinationChange(idx, "requirementsBn", e.target.value.split(",").map(s => s.trim()))}
                            rows={2}
                            className="w-full text-xs px-2 py-1.5 rounded bg-slate-50 border border-slate-200 leading-normal"
                          />
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB: CONTACT SUBMISSIONS ================= */}
            {activeTab === "contacts" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-900 border-b pb-2 flex items-center gap-1.5 mb-4">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span>{lang === "en" ? "Contact Form Submissions" : "কন্টাক্ট ফর্ম সাবমিশন"}</span>
                  </h3>

                  {contacts.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      {lang === "en" ? "No contact submissions yet" : "এখনও কোনো কন্টাক্ট সাবমিশন নেই"}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contacts.map((contact, idx) => (
                        <div key={contact.id || idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-sm text-slate-900">{contact.fullName}</span>
                              </div>
                              {contact.email && (
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                  <Mail className="w-3.5 h-3.5" />
                                  <span>{contact.email}</span>
                                </div>
                              )}
                              {contact.phone && (
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>{contact.phone}</span>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-slate-500 bg-slate-200 px-2 py-1 rounded">
                                {contact.visaType}
                              </span>
                              {contact.createdAt && (
                                <div className="text-[10px] text-slate-400 mt-1">
                                  {new Date(contact.createdAt).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                          {contact.profileMessage && (
                            <div className="pt-2 border-t border-slate-200">
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {contact.profileMessage}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Save notice footer */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-250 active:scale-95 shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{lang === "en" ? "Apply Changes Live" : "লাইভ পরিবর্তন প্রয়োগ করুন"}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
