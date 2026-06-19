import { useState } from "react";
import { PageId } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/views/HomeView";
import StudentVisaView from "./components/views/StudentVisaView";
import VisitVisaView from "./components/views/VisitVisaView";
import WorkPermitView from "./components/views/WorkPermitView";
import BusinessVisaView from "./components/views/BusinessVisaView";
import ContactView from "./components/views/ContactView";
import AdminView from "./components/views/AdminView";
import WhatsAppCTA from "./components/WhatsAppCTA";
import { motion, AnimatePresence } from "motion/react";
import { initCustomDataFromServer } from "./utils/customizationStore";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [lang, setLang] = useState<"en" | "bn">("en");

  useState(() => {
    initCustomDataFromServer();
  });

  // Handle navigation to different pages
  const handleNavigate = (id: PageId) => {
    setCurrentPage(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const renderView = () => {
    switch (currentPage) {
      case "home":
        return <HomeView lang={lang} onNavigate={handleNavigate} />;
      case "student-visa":
        return <StudentVisaView lang={lang} onNavigate={handleNavigate} />;
      case "visit-visa":
        return <VisitVisaView lang={lang} onNavigate={handleNavigate} />;
      case "work-permit":
        return <WorkPermitView lang={lang} onNavigate={handleNavigate} />;
      case "business-visa":
        return <BusinessVisaView lang={lang} onNavigate={handleNavigate} />;
      case "contact":
        return <ContactView lang={lang} onNavigate={handleNavigate} />;
      case "admin":
        return <AdminView lang={lang} onNavigate={handleNavigate} />;
      default:
        return <HomeView lang={lang} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-800 scroll-smooth">
      
      {/* 1. Header with Language and Route selector indicators */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        lang={lang} 
        setLang={setLang} 
      />

      {/* 2. Main content container displaying selected visa route view */}
      <main className="flex-1" id="main-content-canvas">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${lang}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Floating WhatsApp Button with pulse triggers */}
      <WhatsAppCTA lang={lang} />

      {/* 4. Global Footer matching Brand Identity */}
      <Footer onNavigate={handleNavigate} lang={lang} />
      
    </div>
  );
}
