import React from "react";
import { motion } from "motion/react";
import { MessageSquarePlus } from "lucide-react";
import { translations } from "../utils/translations";

interface WhatsAppCTAProps {
  lang: "en" | "bn";
}

export default function WhatsAppCTA({ lang }: WhatsAppCTAProps) {
  const t = translations[lang];

  // Official direct WhatsApp action link with custom inquiry text prefix
  const phoneNumber = "+8801712345678";
  const customMessage = lang === "en" 
    ? "Assalamu Alaikum, I would like to get a free visa consultation assessment from Ideal Sky Tours." 
    : "আসসালামু আলাইকুম, আমি আইডিয়াল স্কাই ট্যুরস থেকে ফ্রি ভিসা কনসালটেশন ক্লিয়ারেন্স পেতে চাই।";
  
  const formattedMsg = encodeURIComponent(customMessage);
  const whatsAppLink = `https://wa.me/${phoneNumber}?text=${formattedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-55 pointer-events-auto">
      <motion.a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#128c7e] hover:bg-[#075e54] text-white rounded-full font-sans text-xs md:text-sm font-bold uppercase tracking-wider shadow-2xl filter drop-shadow-[0_6px_20px_rgba(18,140,126,0.35)] cursor-pointer"
        id="floating-whatsapp-btn"
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <MessageSquarePlus className="relative inline-flex rounded-full text-white w-3.5 h-3.5" />
        </span>
        <span>{t.common.whatsAppCta}</span>
      </motion.a>
    </div>
  );
}
