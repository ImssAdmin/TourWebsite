import { useState, lazy, Suspense, useEffect } from "react";
import { PageId } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppCTA from "./components/WhatsAppCTA";
import { motion, AnimatePresence } from "motion/react";
import { initCustomDataFromServer } from "./utils/customizationStore";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  injectMultipleSchemas
} from "./utils/structuredData";

// Lazy load view components for better performance
const HomeView = lazy(() => import("./components/views/HomeView"));
const StudentVisaView = lazy(() => import("./components/views/StudentVisaView"));
const VisitVisaView = lazy(() => import("./components/views/VisitVisaView"));
const WorkPermitView = lazy(() => import("./components/views/WorkPermitView"));
const BusinessVisaView = lazy(() => import("./components/views/BusinessVisaView"));
const ContactView = lazy(() => import("./components/views/ContactView"));
const AdminView = lazy(() => import("./components/views/AdminView"));

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [lang, setLang] = useState<"en" | "bn">("en");

  useState(() => {
    initCustomDataFromServer();
  });

  // Inject structured data on mount
  useEffect(() => {
    injectMultipleSchemas([
      organizationSchema,
      websiteSchema,
      localBusinessSchema
    ]);
  }, []);

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
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </main>

      {/* 3. Global Floating WhatsApp Button with pulse triggers */}
      <WhatsAppCTA lang={lang} />

      {/* 4. Global Footer matching Brand Identity */}
      <Footer onNavigate={handleNavigate} lang={lang} />

    </div>
  );
}
