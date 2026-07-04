export interface RelocationDestination {
  flag: string;
  code: string;
  nameEn: string;
  nameBn: string;
  descEn: string;
  descBn: string;
  image: string;
}

export interface CustomHeroSlide {
  image: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
}

export interface CustomSuccessStory {
  name: string;
  visaType: string;
  destination: string;
  quoteEn: string;
  quoteBn: string;
  image: string;
}

export interface CustomBlog {
  titleEn: string;
  titleBn: string;
  date: string;
  descEn: string;
  descBn: string;
  tagEn: string;
  tagBn: string;
}

export interface StudentCountry {
  id: string;
  nameEn: string;
  nameBn: string;
  flag: string;
  image: string;
  taglineEn: string;
  taglineBn: string;
  intakesEn: string;
  intakesBn: string;
  costRangeEn: string;
  costRangeBn: string;
  ieltsRequirementEn: string;
  ieltsRequirementBn: string;
  incentivesEn: string[];
  incentivesBn: string[];
}

export interface WorkOpportunity {
  id: string;
  countryEn: string;
  countryBn: string;
  flag: string;
  image: string;
  successRate: string;
  avgSalaryEn: string;
  avgSalaryBn: string;
  tradesEn: string[];
  tradesBn: string[];
  processingTimeEn: string;
  processingTimeBn: string;
  accommodationEn: string;
  accommodationBn: string;
}

export interface BusinessProgram {
  id: string;
  nameEn: string;
  nameBn: string;
  flag: string;
  image: string;
  capitalEn: string;
  capitalBn: string;
  visaValidityEn: string;
  visaValidityBn: string;
  highlightEn: string;
  highlightBn: string;
  pointsEn: string[];
  pointsBn: string[];
}

export interface VisitDestination {
  id: string;
  nameEn: string;
  nameBn: string;
  flag: string;
  image: string;
  pricingEn: string;
  pricingBn: string;
  rating: string;
  processingEn: string;
  processingBn: string;
  visaValidityEn: string;
  visaValidityBn: string;
  requirementsEn: string[];
  requirementsBn: string[];
}

export interface HomeCategoryCustomize {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  image: string;
  num: string;
}

export interface TeamMember {
  name: string;
  roleEn: string;
  roleBn: string;
  image: string;
}

export interface CustomData {
  // Homepage existing text and settings
  heroTagEn: string;
  heroTagBn: string;
  heroTitleEn: string;
  heroTitleBn: string;
  heroTitleHighlightEn: string;
  heroTitleHighlightBn: string;
  heroSubtitleEn: string;
  heroSubtitleBn: string;

  aboutTitleEn: string;
  aboutTitleBn: string;
  aboutDesc1En: string;
  aboutDesc1Bn: string;
  aboutDesc2En: string;
  aboutDesc2Bn: string;

  officeAddressEn: string;
  officeAddressBn: string;
  officePhoneEn: string;
  officePhoneBn: string;
  officeEmailEn: string;
  officeEmailBn: string;
  officeHoursEn: string;
  officeHoursBn: string;

  destinations: RelocationDestination[];

  // Homepage media, video and stats
  homeVideoUrl: string;
  homeSlides: CustomHeroSlide[];
  homeCategories: HomeCategoryCustomize[];
  homeTeamMembers: TeamMember[];
  successStories: CustomSuccessStory[];
  blogs: CustomBlog[];

  statsProcessedEn: string;
  statsProcessedBn: string;
  statsRatioEn: string;
  statsRatioBn: string;
  statsSuccessEn: string;
  statsSuccessBn: string;
  statsCountriesEn: string;
  statsCountriesBn: string;

  // Student Visa Category Customization
  studentTitleEn: string;
  studentTitleBn: string;
  studentSubtitleEn: string;
  studentSubtitleBn: string;
  studentVideoUrl: string;
  studentCountries: StudentCountry[];

  // Work Permit Category Customization
  workTitleEn: string;
  workTitleBn: string;
  workSubtitleEn: string;
  workSubtitleBn: string;
  workVideoUrl: string;
  workOpportunities: WorkOpportunity[];

  // Business Visa Category Customization
  businessTitleEn: string;
  businessTitleBn: string;
  businessSubtitleEn: string;
  businessSubtitleBn: string;
  businessVideoUrl: string;
  businessPrograms: BusinessProgram[];

  // Visit Visa Category Customization
  visitTitleEn: string;
  visitTitleBn: string;
  visitSubtitleEn: string;
  visitSubtitleBn: string;
  visitVideoUrl: string;
  visitDestinations: VisitDestination[];

  // Contact Category Customization
  contactTitleEn: string;
  contactTitleBn: string;
  contactSubtitleEn: string;
  contactSubtitleBn: string;
  contactMapEmbedUrl: string;
}

export const DEFAULT_CUSTOM_DATA: CustomData = {
  heroTagEn: "🏆 Bangladesh's Most Trusted Visa Agency",
  heroTagBn: "🏆 বাংলাদেশের সবচেয়ে বিশ্বস্ত ভিসা এজেন্সি",
  heroTitleEn: "Your Gateway to Global Opportunities with",
  heroTitleBn: "গ্লোবাল ক্যারিয়ারের বিশ্বস্ত পার্টনার",
  heroTitleHighlightEn: "Ideal Sky Tours",
  heroTitleHighlightBn: "আইডিয়াল স্কাই ট্যুরস",
  heroSubtitleEn: "We specialize in processing high-success rate Student Visas, Work Permits, Express Tourist Packages, and Business Setups. Officially registered and authorized in Dhaka, Bangladesh.",
  heroSubtitleBn: "আমরা সর্বোচ্চ ভিসা সাকসেস রেট সহ স্টুডেন্ট ভিসা, ওয়ার্ক পারমিট, ফাস্ট-ট্র্যাক ট্যুরিস্ট ভিসা এবং বিজনেস সেটআপ প্রসেস করে থাকি। ঢাকা, বাংলাদেশে আমাদের অফিসিয়াল কার্যালয়ে আপনাকে স্বাগতম।",

  aboutTitleEn: "Pioneering Legal Global Mobility Since 2018",
  aboutTitleBn: "২০১৮ থেকে বৈধ ও আইনি উপায়ে গ্লোবাল মুভমেন্ট",
  aboutDesc1En: "Ideal Sky Tours is a premier visa consultancy based in Dhaka, Bangladesh. We are committed to turning your dreams of studying, working, conducting business, or travelling abroad into reality with unparalleled transparency and expert compliance legal standards.",
  aboutDesc1Bn: "আইডিয়াল স্কাই ট্যুরস ঢাকা, বাংলাদেশে অবস্থিত একটি প্রিমিয়াম ভিসা পরামর্শক প্রতিষ্ঠান। আমরা স্বচ্ছতা এবং অত্যন্ত কঠোর আইনি মানদণ্ড বজায় রেখে আপনার বিদেশে পড়াশোনা, কাজ, ব্যবসা বা ভ্রমণের স্বপ্ন পূরণ করতে অঙ্গীকারবদ্ধ।",
  aboutDesc2En: "We understand that international visa procedures can be overwhelming. That is why our team of licensed migration advisers works round-the-clock to coordinate directly with certified state departments and embassy portals to streamline your file processing.",
  aboutDesc2Bn: "আমরা জানি যে আন্তর্জাতিক ভিসা প্রক্রিয়াগুলি অত্যন্ত জটিল হতে পারে। এই কারণেই আমাদের লাইসেন্সপ্রাপ্ত মাইগ্রেশন উপদেষ্টাদের টিম সরাসরি নিবন্ধিত অ্যাম্বেসি পোর্টালগুলির সাথে সমন্বয় করে আপনার ফাইলের নির্ভুল প্রসেসিং নিশ্চিত করে।",

  officeAddressEn: "Suite 402, Level 4, Concord Tower, Kazi Nazrul Islam Avenue, Shahbagh, Dhaka-1215, Bangladesh.",
  officeAddressBn: "স্যুট ৪০২, লেভে ৪, কনকর্ড টাওয়ার, কাজী নজরুল ইসলাম এভিনিউ, শাহবাগ, ঢাকা-১২১৫, বাংলাদেশ।",
  officePhoneEn: "+880 1712-345678, +880 2-9876543",
  officePhoneBn: "+৮৮০ ১৭১২-৩৪৫৬৭৮, +৮৮০ ২-৯৮৭৬৫৪৩",
  officeEmailEn: "info@idealskytoursbd.com",
  officeEmailBn: "info@idealskytoursbd.com",
  officeHoursEn: "Saturday - Thursday: 09:30 AM - 07:00 PM (Friday Closed)",
  officeHoursBn: "শনিবার - বৃহস্পতিবার: সকাল ০৯:৩০ - রাত ০৭:০০ (শুক্রবার সাপ্তাহিক বন্ধ)",

  destinations: [
    {
      flag: "🇬🇧",
      code: "GB",
      nameEn: "United Kingdom",
      nameBn: "যুক্তরাজ্য",
      descEn: "No IELTS admissions, PGWP rights, master degrees.",
      descBn: "আইএলটিএস ছাড়া সরাসরি উচ্চশিক্ষা ও মাস্টার্স ডিগ্রির সুযোগ।",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80"
    },
    {
      flag: "🇨🇦",
      code: "CA",
      nameEn: "Canada Pathways",
      nameBn: "কানাডা পাথওয়ে",
      descEn: "Study permit admissions, certified DLIs, PGWP routes.",
      descBn: "স্টাডি পারমিটের মাধ্যমে নির্ভরযোগ্য সেটেলমেন্ট ও পিজিডব্লিউপি।",
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=600&q=80"
    },
    {
      flag: "🇪🇺",
      code: "EU",
      nameEn: "Romania & Poland",
      nameBn: "রোমানিয়া ও পোল্যান্ড",
      descEn: "Labor permits, gastronomy and skilled trades legally.",
      descBn: "বৈধ ওয়ার্ক পারমিট, গ্যাস্ট্রোনমি এবং অন্যান্য টেকনিক্যাল জব।",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80"
    },
    {
      flag: "🇸🇦",
      code: "SA",
      nameEn: "Saudi & Gulf Permits",
      nameBn: "সৌদি ও গালফ ভিসা",
      descEn: "Express company visa approvals, healthcare professionals.",
      descBn: "দ্রুততম সময়ে সরকারি ভিসা ও আকর্ষণীয় ক্যারিয়ার সুযোগ।",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
    }
  ],

  // Default Home Slides
  homeVideoUrl: "https://www.youtube.com/embed/5D3vAt593YI", // Default visa guide or intro video
  homeCategories: [
    {
      id: "student-visa",
      titleEn: "Student Visa", titleBn: "স্টুডেন্ট ভিসা",
      descEn: "Secure admissions and permits in UK, Canada, USA, and Europe.",
      descBn: "যুক্তরাজ্য, কানাডা, আমেরিকা এবং ইউরোপে পড়াশোনার সুবর্ণ সুযোগ!",
      num: "3200+",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "visit-visa",
      titleEn: "Visit Visa", titleBn: "ভিসিট ভিসা",
      descEn: "Perfect family and individual holiday plans with solid documentation.",
      descBn: "সহজ ট্যুরিস্ট ভিসা ও আকর্ষণীয় ফ্যামিলি ট্রাভেল প্ল্যানিং সার্ভিস।",
      num: "5100+",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "work-permit",
      titleEn: "Work Permit", titleBn: "ওয়ার্ক পারমিট",
      descEn: "Join Romanian, Croatian, and Middle Eastern employment sectors legally.",
      descBn: "পোল্যান্ড ও রোমানিয়াসহ মিডল ইস্টে নিশ্চিত ও বৈধ সরকারি ওয়ার্ক পারমিট।",
      num: "2800+",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "business-visa",
      titleEn: "Business Visa", titleBn: "বিজনেস ভিসা",
      descEn: "Relocate your business, set up startups, or attend trade summits.",
      descBn: "বিদেশে নতুন কোম্পানি রেজিস্ট্রেশন, স্টার্টআপ এবং ইনভেস্টর গোল্ডেন ভিসা।",
      num: "1400+",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    }
  ],
  homeTeamMembers: [
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
  ],
  homeSlides: [
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
      titleEn: "Secure Admissions & Student Visa for UK",
      titleBn: "কোন আইএলটিএস ছাড়াই ইউকে স্টুডেন্ট ভিসা",
      descEn: "Process with MOI option. Complete interview guidelines by certified counselors.",
      descBn: "এমওআই (MOI) ব্যবহার করে সরাসরি আবেদনের সুবিধা এবং ইন্টারভিউয়ের সম্পূর্ণ প্রস্তুতি।"
    },
    {
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1600&q=80",
      titleEn: "Fast-Track Canada Study Permits",
      titleBn: "কানাডা স্টুডেন্ট ভিসা প্রসেসিং ২০২৬",
      descEn: "Apply through SDS & Non-SDS streams with high visa success rates.",
      descBn: "এসডিএস এবং নন-এসডিএস ক্যাটাগরিতে দ্রুত ও নির্ভরযোগ্য ফাইল প্রসেসিং।"
    },
    {
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
      titleEn: "Legal Work Permits to Poland & Romania",
      titleBn: "পোল্যান্ড ও রোমানিয়ায় কাজের সুযোগ",
      descEn: "100% genuine labor permits from ministries with transparent agreements.",
      descBn: "মন্ত্রণালয় অনুমোদিত কাজের পারমিট এবং নতুন দিল্লির অ্যাম্বেসি ফেস করার নিশ্চয়তা।"
    },
    {
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
      titleEn: "Saudi Arabia & Gulf Relocation Schemes",
      titleBn: "সৌদি আরব ও পারস্য উপসাগরীয় ওয়ার্ক পারমিট",
      descEn: "Skilled employment pathways for hospitality and construction professionals.",
      descBn: "দক্ষ চাকরিজীবি, হোটেল ও কনস্ট্রাকশন খাতে আকর্ষণীয় বেতনে কাজের সুযোগ।"
    }
  ],

  // Default Stats
  statsProcessedEn: "12,500+",
  statsProcessedBn: "১২,৫০০+",
  statsRatioEn: "98.5%",
  statsRatioBn: "৯৮.৫%",
  statsSuccessEn: "Visa Approvals",
  statsSuccessBn: "ভিসা অনুমোদন",
  statsCountriesEn: "120+ Destinations",
  statsCountriesBn: "১২০+ দেশ",

  // Default Success Stories
  successStories: [
    {
      name: "Fahim Rahman",
      visaType: "Student Visa (UK)",
      destination: "University of Bedfordshire, UK",
      quoteEn: "Processing my UK student visa with Ideal Sky was seamless. No IELTS was required due to my MOI waiver, and they guided me perfectly for the credibility interview.",
      quoteBn: "আইডিয়াল স্কাইয়ের সাথে আমার ইউকে স্টুডেন্ট ভিসা প্রসেস করা অত্যন্ত সহজ ছিল। এমওআই ওয়েভারের কারণে কোনো আইএলটিএস প্রয়োজন ছিল না এবং তারা আমাকে ইন্টারভিউয়ের জন্য নিখুঁতভাবে প্রস্তুত করেছিল।",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Ariful Islam",
      visaType: "Work Permit (Romania)",
      destination: "Logistics Industry, Romania",
      quoteEn: "Highly recommended agency! They processed my Romanian work permit under a fully legal contract. Truly transparent and professional from start to finish.",
      quoteBn: "অত্যন্ত বিশ্বস্ত এজেন্সি! তারা শতভাগ বৈধ নোটারি চুক্তির মাধ্যমে আমার রোমানিয়া কাজের পারমিট প্রসেস করেন। নতুন দিল্লির অ্যাম্বেসি ইন্টারভিউসহ প্রতিটি ধাপে তারা আমাকে সম্পূর্ণ সহযোগিতা করেছিলেন।",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Mst. Sumaiya Akhtar",
      visaType: "Student Visa (Canada)",
      destination: "Seneca College, Toronto",
      quoteEn: "Getting my Canadian Study Permit within 45 days was like a dream come true. Their detailed document compilation made sure my file had zero weaknesses.",
      quoteBn: "মাত্র ৪৫ দিনের মধ্যে কানাডার স্টাডি পারমিট পাওয়া আমার জন্য স্বপ্নের মতো ছিল। তাদের নিখুঁত ডকুমেন্ট সাজানোর ফলেই আমার ফাইলে কোনো দুর্বলতা ছিল না এবং কোনো জটিলতা ছাড়াই ভিসা পাই।",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    }
  ],

  // Default Blogs
  blogs: [
    {
      titleEn: "Canada Study Enrollment Rules 2026 Latest Updates",
      titleBn: "কানাডা স্টুডেন্ট এনরোলমেন্ট বিধিমালা ২০ ২৬ সর্বশেষ আপডেট",
      date: "June 05, 2026",
      descEn: "Detailed look into DLI provincial attestation caps and PGWP post-graduate modifications for international students.",
      descBn: "আন্তর্জাতিক শিক্ষার্থীদের জন্য পিজিডব্লিউপি (PGWP) ওয়ার্ক পারমিটের নতুন যোগ্যতা এবং প্রভিন্সিয়াল লেটার রুলস সংক্রান্ত বিস্তারিত তথ্য বিশ্লেষণ।",
      tagEn: "Canada Update",
      tagBn: "কানাডা আপডেট"
    },
    {
      titleEn: "Europe Skilled Worker Quotas: Romania & Poland Expansion",
      titleBn: "ইউরোপের নতুন জব কোটা: রোমানিয়া ও হাঙ্গেরি সুযোগসমূহ",
      date: "May 28, 2026",
      descEn: "Eastern European consulates expand visa intake caps for construction, nursing and hospitality professionals from Bangladesh.",
      descBn: "নির্মাণশিল্প, নার্সিং এবং হোটেল রেস্টুরেন্ট কর্মীদের জন্য ভিসা কোটা বৃদ্ধি করেছে পূর্ব ইউরোপের অন্যতম স্বনামধন্য কনস্যুলেটগুলো।",
      tagEn: "Work Permit",
      tagBn: "ওয়ার্ক পারমিট"
    },
    {
      titleEn: "Drafting a Flawless Visa SOP: 5 Key Principles",
      titleBn: "ভিসার জন্য মানসম্মত এসওপি (SOP) লেখার ৫টি গুরুত্বপূর্ণ কৌশল",
      date: "April 15, 2026",
      descEn: "How to explain flight intention, home country ties and financial source-of-wealth transparently to Visa Officers.",
      descBn: "কীভাবে হোম কান্ট্রি টাই এবং আয়ের স্পষ্ট উৎস ভিসা কর্মকর্তার কাছে নিখুঁতভাবে ফুটিয়ে তুলবেন তার বিস্তারিত গাইড।",
      tagEn: "Advisory Tip",
      tagBn: "পরামর্শ টিপস"
    }
  ],

  // Student Section Defaults
  studentTitleEn: "Student Visa Solutions",
  studentTitleBn: "স্টুডেন্ট ভিসা সলিউশন",
  studentSubtitleEn: "Secure admissions at elite DLIs and government-accredited universities across the globe with complete post-study work authorization.",
  studentSubtitleBn: "বিশ্বের সেরা সরকারি অনুমোদিত ইউনিভার্সিটি এবং ডিএলআই-তে ভর্তি নিশ্চিত করার পাশাপাশি স্টাডি পরবর্তী কাজের অনুমতি অর্জন করুন।",
  studentVideoUrl: "https://www.youtube.com/embed/5D3vAt593YI",
  studentCountries: [
    {
      id: "uk",
      nameEn: "United Kingdom",
      nameBn: "যুক্তরাজ্য (UK)",
      flag: "🇬🇧",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
      taglineEn: "Post-Graduate Work Permit (PGWP) & Immediate Spouse Intake",
      taglineBn: "উচ্চ সাকসেস রেট এবং অবিলম্বে স্পাউস সহ আবেদনের চমৎকার সুযোগ",
      intakesEn: "Sept, Jan & May",
      intakesBn: "সেপ্টেম্বর, জানুয়ারি ও মে",
      costRangeEn: "£11,000 - £18,000 / Year",
      costRangeBn: "বছরে ১১,০০০ - ১৮,০০০ পাউন্ড",
      ieltsRequirementEn: "6.0 minimum (MOI accepted for selected universities)",
      ieltsRequirementBn: "৬.০ ন্যূনতম (কিছু ইউনিভার্সিটিতে আইএলটিএস ছাড়া আবেদন সম্ভব)",
      incentivesEn: [
        "Graduate Immigration Route: 2 Years work permit",
        "Scholarships of up to £4,000 available on merit",
        "Weekly 20 hours legal work permit during class terms"
      ],
      incentivesBn: [
        "গ্র্যাজুয়েশন সম্পন্ন করার পর ২ বছরের স্পেশাল ওয়ার্ক পারমিট",
        "যোগ্যতা অনুযায়ী ৪,০০০ পাউন্ড পর্যন্ত স্কলারশিপ লাভের সুযোগ",
        "ক্লাস চলাকালীন সপ্তাহে ২০ ঘণ্টা আইনি কাজের সুযোগ"
      ]
    },
    {
      id: "canada",
      nameEn: "Canada",
      nameBn: "কানাডা (Canada)",
      flag: "🇨🇦",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80",
      taglineEn: "Highest Rated Destination for Durable PR Pathways & Post-Study Visas",
      taglineBn: "পিআর (PR) অর্জনের সহজ পথ এবং দীর্ঘমেয়াদি ক্যারিয়ার গড়ার সেরা দেশ",
      intakesEn: "September & January",
      intakesBn: "সেপ্টেম্বর এবং জানুয়ারি",
      costRangeEn: "$15,000 - $25,000 CAD / Year",
      costRangeBn: "বছরে ১৫,০০০ - ২৫,০০০ কানাডিয়ান ডলার",
      ieltsRequirementEn: "6.0 / 6.5 bands overall (SDS Portal stream)",
      ieltsRequirementBn: "৬.০ বা ৬.৫ ব্যান্ড (এসডিএস ফাস্ট প্রসেস পোর্টালে আবেদনের জন্য)",
      incentivesEn: [
        "Direct PGWP Visa duration matching your academic timeline",
        "High ranking DLI universities with affordable tuition structures",
        "Straightforward Provincial Nominee Programs (PNP) for PR registry"
      ],
      incentivesBn: [
        "কোর্সের মেয়াদ অনুযায়ী ৩ বছর পর্যন্ত পূর্ণ পিজিডব্লিউপি ওয়ার্ক পারমিট",
        "সবচেয়ে কম খরচে ওয়ার্ল্ড-ক্লাস ডিএলআই (DLI) কলেজ ও ইউনিভার্সিটি",
        "স্থায়ীভাবে বসবাসের জন্য সহজ প্রভিন্সিয়াল নমিনি (PNP) প্রোগ্রাম"
      ]
    },
    {
      id: "usa",
      nameEn: "United States",
      nameBn: "ইউনাইটেড স্টেটস (USA)",
      flag: "🇺🇸",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
      taglineEn: "STEM Program Specializations & Prestigious Assistantships",
      taglineBn: "স্টেম (STEM) ডবল-ডিগ্রি এবং ইউনিভার্সিটিতে ফুল-ফান্ডেড স্কলারশিপ",
      intakesEn: "Fall (Aug) & Spring (Jan)",
      intakesBn: "ফল (আগস্ট) এবং স্প্রিং (জানুয়ারি)",
      costRangeEn: "$18,000 - $35,000 USD / Year",
      costRangeBn: "বছরে ১৮,০০০ - ৩৫,০০০ ইউএস ডলার",
      ieltsRequirementEn: "6.5 bands (Duolingo / TOEFL also accepted)",
      ieltsRequirementBn: "৬.৫ ব্যান্ড (ডুওলিঙ্গো বা টোফেল দিয়েও সরাসরি ভর্তি সম্ভব)",
      incentivesEn: [
        "OPT options for up to 3 years of fully authorized tech work",
        "Intensive mock visa interview coaching from our Dhaka advisors",
        "Generous graduate research or teaching assistant funding options"
      ],
      incentivesBn: [
        "স্টেম গ্র্যাজুয়েটদের ৩ বছর পর্যন্ত নিশ্চিত কাজের অধিকার (OPT)",
        "আমাদের ঢাকা টিম থেকে অ্যাম্বেসি ফেস করার স্পেশাল মক ইন্টারভিউ সেশন",
        "রিসার্থ অ্যাসিস্ট্যান্টশিপ ও টিচিং অ্যাসিস্ট্যান্টশিপ পাওয়ার ভালো সুযোগ"
      ]
    },
    {
      id: "germany",
      nameEn: "Germany & Europe",
      nameBn: "জার্মানি ও ইউরোপীয় ইউনিয়ন",
      flag: "🇩🇪",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80",
      taglineEn: "Zero Tuition Fees in State Universities & Schengen-wide Travel Stream",
      taglineBn: "পাবলিক ইউনিভার্সিটিতে সম্পূর্ণ ফ্রি পড়ার সুযোগ এবং ইউরোপজুড়ে ভ্রমণের স্বাধীনতা",
      intakesEn: "Winter (Oct) & Summer (April)",
      intakesBn: "উইন্টার (অক্টোবর) এবং সামার (এপ্রিল)",
      costRangeEn: "No tuition fees (Admin charge €200 - €400)",
      costRangeBn: "কোন ভর্তি বা টিউশন ফি নেই (নামমাত্র এডমিন চার্জ ২০০-৪০০ ইউরো)",
      ieltsRequirementEn: "6.0 / 6.5 bands (German language test A1/B2 if applying via language lane)",
      ieltsRequirementBn: "৬.০ বা ৬.৫ ব্যান্ড (জার্মান মাধ্যম কোর্সের জন্য এ১/বি২ লেভেল)",
      incentivesEn: [
        "18-month job seeker visa stamp provided post graduation",
        "Highest success rate under Schengen-visa state frameworks",
        "Fully English taught Master & Bachelor streams available"
      ],
      incentivesBn: [
        "পড়াশোনা শেষে চাকরি খোঁজার জন্য ১৮ মাসের কাজের অনুমতি ও রেসিডেন্সি",
        "শেনজেন ভিসাধারীদের জন্য ইউরোপের যেকোনো দেশে বসবাসের অবারিত ক্ষেত্র",
        "শতভাগ ইংরেজি মাধ্যমে পাঠদানকারী ব্যাচেলর ও মাস্টার্স কোর্স সমূহ"
      ]
    }
  ],

  // Work Permit Section Defaults
  workTitleEn: "Global Skilled Work Permits",
  workTitleBn: "গ্লোবাল স্কিলড ওয়ার্ক পারমিট",
  workSubtitleEn: "Legitimate employment placements and work rights registry visas for European Union, Middle East, and elite Asian countries.",
  workSubtitleBn: "ইউরোপীয় ইউনিয়ন, মধ্যপ্রাচ্য এবং এশিয়ার শীর্ষস্থানীয় দেশগুলিতে আইনি চাকরি এবং ওয়ার্ক পারমিট ভিসা প্রসেসিং।",
  workVideoUrl: "https://www.youtube.com/embed/5D3vAt593YI",
  workOpportunities: [
    {
      id: "romania",
      countryEn: "Romania (European Union)",
      countryBn: "রোমানিয়া (ইইউ ওয়ার্ক পারমিট)",
      flag: "🇷🇴",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
      successRate: "98.5%",
      avgSalaryEn: "$750 - $1100 / Month",
      avgSalaryBn: "$৭৫০ - $১১০০ প্রতি মাসে",
      tradesEn: [
        "Civil Construction & Finishing Work",
        "Gastronomy / Chefs & Kitchen helpers",
        "Logistics, Delivery & Warehouse loading"
      ],
      tradesBn: [
        "কনস্ট্রাকশন ও সিভিল বিল্ডিং কাজ",
        "হোটেল ও রেস্টুরেন্ট কিচেন স্টাফ",
        "ডেলিভারি রাইডার ও ওয়্যারহাউজ অ্যাসিস্ট্যান্ট"
      ],
      processingTimeEn: "4 - 5 Months",
      processingTimeBn: "৪ - ৫ মাস",
      accommodationEn: "Free (Provided by Polish/Romanian Employers)",
      accommodationBn: "ফ্রি (কোম্পানি বহন করবে)"
    },
    {
      id: "croatia",
      countryEn: "Croatia (Schengen Zone)",
      countryBn: "ক্রোয়েশিয়া (শেনজেন এলাকা)",
      flag: "🇭🇷",
      image: "https://images.unsplash.com/photo-1555992336-03a23c7b20eb?auto=format&fit=crop&w=600&q=80",
      successRate: "95.0%",
      avgSalaryEn: "€800 - €1200 / Month",
      avgSalaryBn: "৮০০ - ১২০০ ইউরো প্রতি মাসে",
      tradesEn: [
        "Hospitality sector staff & room cleanings",
        "Food Packing, Farming & Greenhouse picking",
        "Welding, Plumbing & Automotive mechanics"
      ],
      tradesBn: [
        "হোটেল সার্ভিস স্টাফ ও হাউসকিপিং",
        "ফুড প্যাকিং ও এগ্রিকালচার চাষ কাজ",
        "ফেব্রিকটর, ওয়েল্ডার ও অটোমোবাইল মেকানিক"
      ],
      processingTimeEn: "5 - 6 Months",
      processingTimeBn: "৫ - ৬ মাস",
      accommodationEn: "Employer-Sponsored Living Housing",
      accommodationBn: "কোম্পানি স্পন্সরড আবাসন সুবিধা"
    },
    {
      id: "saudi-arabia",
      countryEn: "Saudi Arabia & Gulf States",
      countryBn: "সৌদি আরব এবং মধ্যপ্রাচ্য",
      flag: "🇸🇦",
      image: "https://images.unsplash.com/photo-1586724237569-f38559db826c?auto=format&fit=crop&w=600&q=80",
      successRate: "99.0%",
      avgSalaryEn: "1500 - 2500 SAR / Month",
      avgSalaryBn: "১৫০০ - ২৫০০ রিয়াল প্রতি মাসে",
      tradesEn: [
        "Heavy Equipment Operators & Crane crews",
        "Certified Hospital Nurses & Caretakers",
        "Commercial Driving (Light & Heavy license)"
      ],
      tradesBn: [
        "ভারী ক্রেন বা ইক্যুইপমেন্ট অপারেটর",
        "নার্স ও সার্টিফাইড হেলথকেয়ার অ্যাসিস্ট্যান্ট",
        "লাইট ও হেভি লাইসেন্স ড্রাইভিং পেশা"
      ],
      processingTimeEn: "45 - 60 Calendar Days",
      processingTimeBn: "৪৫ - ৬০ দিন",
      accommodationEn: "Company camp housing & medical cards standard",
      accommodationBn: "কোম্পানি স্পন্সরড আকামা, আবাসন ও হেলথ কার্ড"
    }
  ],

  // Business Section Defaults
  businessTitleEn: "Business & Investor Visas",
  businessTitleBn: "বিজনেস ও ইনভেস্টর ভিসা",
  businessSubtitleEn: "Corporate formation, investment immigration, startup pathways, and business sponsor visa processing globally.",
  businessSubtitleBn: "বিশ্বব্যাপী বিজনেস সেটআপ, ইনভেস্টমেন্ট ইমিগ্রেশন এবং বিজনেস স্পন্সরশিপ প্রসেসিং সেবা।",
  businessVideoUrl: "https://www.youtube.com/embed/5D3vAt593YI",
  businessPrograms: [
    {
      id: "uk-innovator",
      nameEn: "UK Innovator Founder Visa",
      nameBn: "ইউকে ইনোভেটর ফাউন্ডার ভিসা",
      flag: "🇬🇧",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      capitalEn: "£50,000 Minimum",
      capitalBn: "৫০,০০০ পাউন্ড ন্যূনতম",
      visaValidityEn: "3 Years (Direct PR Pathway)",
      visaValidityBn: "৩ বছর (সরাসরি পিআর উপায়)",
      highlightEn: "No core asset limitations, direct access to London digital market hubs.",
      highlightBn: "ফাস্ট-ট্র্যাক পিআর এবং লন্ডনের গ্লোবাল ফিনটেক মার্কেটে সরাসরি প্রবেশের বৈধ সুযোগ।",
      pointsEn: [
        "Endorsement letter required from an approved UK business body",
        "Settle permanent local office and register as a director",
        "No minimum IELTS scores under selected fast-track streams"
      ],
      pointsBn: [
        "ইউকে অনুমোদিত বডি হতে প্রোটোটাইপ ইনোভেশন লেটার",
        "অনুমোদিত লোকাল অফিস লিয়াজোঁ ও কোম্পানির ডিরেক্টর পদ",
        "স্পেশাল ইনভেস্টমেন্ট স্কিমে কোনো প্রকার কঠিন পরীক্ষা বাধ্যবাধকতা নেই"
      ]
    },
    {
      id: "usa-l1",
      nameEn: "USA L-1 Corporate Transfer",
      nameBn: "ইউএসএ এল-১ ইন্ট্রা-কোম্পানি ট্রান্সফার",
      flag: "🇺🇸",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      capitalEn: "Flexible capital setup",
      capitalBn: "সুবিধাজনক ক্যাপিটাল সেটআপ",
      visaValidityEn: "1 to 7 Years duration",
      visaValidityBn: "১ থেকে ৭ বছর মেয়াদ",
      highlightEn: "Transfer senior executives or branch partners directly to USA subsidiaries.",
      highlightBn: "বাংলাদেশের মূল কোম্পানির ডিরেক্টর বা সিনিয়র অফিসারদের সরাসরি আমেরিকার অঙ্গপ্রতিষ্ঠানটিতে স্থানান্তরের সুবিধা।",
      pointsEn: [
        "Requires continuous employment of 1 year at Dhaka parent firm",
        "Active office rental lease agreement set up in USA",
        "Direct EB-1C Green Card pathway available inside 18 months"
      ],
      pointsBn: [
        "বাংলাদেশের মূল কোম্পানিতে অন্তত ১ বছর নিরবচ্ছিন্ন ডিরেক্টরশিপ থাকা",
        "আমেরিকার যেকোনো স্টেটে ভৌত অফিস চুক্তি পত্র ক্লিয়ারেন্স",
        "মাত্র ১৮ মাসের মধ্যে সরাসরি ইবি-১সি গ্রীন কার্ড পাওয়ার দারুণ সুযোগ"
      ]
    },
    {
      id: "canada-suv",
      nameEn: "Canada Start-Up Visa (SUV)",
      nameBn: "কানাডা স্টার্ট-আপ ভিসা (SUV)",
      flag: "🇨🇦",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      capitalEn: "$45,000 CAD Registry",
      capitalBn: "৪৫,০০০ কানাডিয়ান ডলার",
      visaValidityEn: "Direct permanent residency (PR)",
      visaValidityBn: "সরাসরি পিআর (PR) সুযোগ",
      highlightEn: "World's most secure investor stream. Group of up to 5 partners allowed.",
      highlightBn: "বিশ্বের সবচেয়ে অন্যতম সেরা ইনভেস্টর ইমিগ্রেশন যা ৫ জন পর্যন্ত অংশীদার সাপোর্ট করে।",
      pointsEn: [
        "Letter of Support from Designated Venture Funds or Angel networks",
        "CLB-5 English proficiency band criteria overall",
        "Full PR status before relocation to Canada targets"
      ],
      pointsBn: [
        "অনুমোদিত ভেঞ্চার ফান্ড হতে অফিসিয়াল সাপোর্ট অফ লেটার",
        "ন্যূনতম সিএলবি-৫ ইংলিশ ল্যাঙ্গুয়েজ ব্যান্ড যোগ্যতা",
        "কানাডায় ল্যান্ডিং করার আগেই সরাসরি পিআর (PR) অনুমোদন"
      ]
    }
  ],

  // Visit Section Defaults
  visitTitleEn: "Visit Visa & Tourism Streams",
  visitTitleBn: "ভিসিট ভিসা এবং ট্যুরিজম স্ট্রিম",
  visitSubtitleEn: "Bespoke tourist visas and travel packages for individuals and families wanting to explore stunning global destinations.",
  visitSubtitleBn: "ব্যক্তিগত এবং পারিবারিক ভ্রমণের জন্য বিশ্বের জনপ্রিয় গন্তব্যগুলোর সহজ ট্যুরিস্ট ভিসা এবং সম্পূর্ণ ট্রাভেল প্যাকেজ।",
  visitVideoUrl: "https://www.youtube.com/embed/5D3vAt593YI",
  visitDestinations: [
    {
      id: "dubai",
      nameEn: "United Arab Emirates (Dubai)",
      nameBn: "দুবাই (UAE ভিসিট)",
      flag: "🇦🇪",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      pricingEn: "BDT 18,500",
      pricingBn: "১৮,৫০০ টাকা",
      rating: "5.0 ★",
      processingEn: "3 - 5 Working Days",
      processingBn: "৩ - ৫ কর্মদিবস",
      visaValidityEn: "30 / 60 Days Single Entry",
      visaValidityBn: "৩০ / ৬০ দিন সিঙ্গেল এন্ট্রি",
      requirementsEn: [
        "Pristine high-res Bangladesh Passport scan copy",
        "White background digital photo passport format",
        "National ID Card scanning"
      ],
      requirementsBn: [
        "পাসপোর্টের ক্লিয়ার রঙিন স্ক্যান কপি",
        "সদ্য তোলা ল্যাব প্রিন্ট ল্যাঙ্গুয়েজ ব্যাকগ্রাউন্ড ছবি",
        "জাতীয় পরিচয়পত্রের কপি"
      ]
    },
    {
      id: "singapore",
      nameEn: "Singapore eVisa Package",
      nameBn: "সিঙ্গাপুর ই-ভিসা প্যাকেজ",
      flag: "🇸🇬",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
      pricingEn: "BDT 9,500",
      pricingBn: "৯,৫০০ টাকা",
      rating: "4.9 ★",
      processingEn: "5 - 7 Working Days",
      processingBn: "৫ - ৭ কর্মদিবস",
      visaValidityEn: "2 Years Multiple Entry eVisa",
      visaValidityBn: "২ বছর মেয়াদী মাল্টিপল এন্ট্রি",
      requirementsEn: [
        "Active Singapore Sponsor Invitation (V39A) or agency escrow",
        "6-month bank statement with minimum 2 Lakh BDT savings",
        "Professional NOC / Trade License translation"
      ],
      requirementsBn: [
        "সিঙ্গাপুর এজেন্টের অফিসিয়াল ইনভাইটেশন (V39A)",
        "৬ মাসের ব্যাংক স্টেটমেন্ট (ন্যূনতম ২ লক্ষ টাকা ব্যালেন্স)",
        "চাকরিজীবীদের এনওসি (NOC) বা ব্যবসায়ীদের ট্রেড লাইসেন্স"
      ]
    },
    {
      id: "thailand-malaysia",
      nameEn: "Thailand & Malaysia Combos",
      nameBn: "থাইল্যান্ড ও মালয়েশিয়া কম্বো",
      flag: "🇹🇭 🇲🇾",
      image: "https://images.unsplash.com/photo-1528181304800-2f190854897d?auto=format&fit=crop&w=600&q=80",
      pricingEn: "BDT 14,000",
      pricingBn: "১৪,০০০ টাকা",
      rating: "4.8 ★",
      processingEn: "5 - 8 Working Days",
      processingBn: "৫ - ৮ কর্মদিবস",
      visaValidityEn: "3 Months Single Entry Travel",
      visaValidityBn: "৩ মাস মেয়াদ সিঙ্গেল ভ্রমণ",
      requirementsEn: [
        "Original Bangladesh Passport (Minimum 6-month validity)",
        "Bank statement & Solvency letter with active bank seals",
        "Confirmed hotel bookings & roundtrip air tickets draft"
      ],
      requirementsBn: [
        "মূল পাসপোর্ট (কমপক্ষে ৬ মাসের মেয়াদ থাকতে হবে)",
        "ব্যাংক স্টেটমেন্ট ও সলভেন্সি সার্টিফিকেট (সিলযুক্ত)",
        "হোটেল বুকিং এবং ট্রাভেল আইটিনেরারি টিকিট কপি"
      ]
    },
    {
      id: "schengen-tourist",
      nameEn: "Schengen Holiday Dossier",
      nameBn: "ইউরোপীয় শেনজেন ট্যুরিস্ট ফাইল",
      flag: "🇪🇺",
      image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=600&q=80",
      pricingEn: "BDT 45,000 Expert Filing",
      pricingBn: "৪৫,০০০ টাকা প্যাকেজ ফাইলিং",
      rating: "5.0 ★",
      processingEn: "15 - 20 Calendar Days",
      processingBn: "১৫ - ২০ কর্মদিবস",
      visaValidityEn: "Flexible according to tour itinerary specs",
      visaValidityBn: "আইটিনেরারি এবং ট্রাভেল হিস্ট্রি অনুসারে",
      requirementsEn: [
        "Dynamic source of income documentation (3-year Tax Returns)",
        "Strict asset backing (Property deeds, FDR certificates)",
        "Premium customized Day-to-Day tour itinerary cover letter"
      ],
      requirementsBn: [
        "ব্যবসায়িক ট্যাক্স রিটার্ন ও আয়কর ফাইলের কপি (৩ বছর)",
        "সম্পত্তি ও এফডিআর (FDR) এর দলিল বা প্রমাণাদি",
        "পেশাদার ডেই-টু-ডেই ট্রাভেল প্ল্যান ও নিখুঁত কভার লেটার"
      ]
    }
  ],

  // Contact / Contract defaults
  contactTitleEn: "Reach Our Central Dhaka Office",
  contactTitleBn: "আমাদের ঢাকা হেড অফিসে যোগাযোগ করুন",
  contactSubtitleEn: "Visit our main location, text us on WhatsApp, or send an enquiry. Our experts will respond within 2 hours.",
  contactSubtitleBn: "সরাসরি অফিসে আসুন, হোয়াটসঅ্যাপ করুন অথবা এই ফর্মের মাধ্যমে আমাদের জানান। আমাদের বিশেষজ্ঞরা মাত্র ২ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।",
  contactMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3364951478147!2d90.39578277595355!3d23.735384189033376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8eb8ad3397f%3A0x3cd6bc6b58315729!2sConcord%20Tower!5e0!3m2!1sen!2sbd!4v1717868000000!5m2!1sen!2sbd"
};

const STORAGE_KEY = "ideal_sky_custom_data";

export function loadCustomData(): CustomData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_CUSTOM_DATA;
    const parsed = JSON.parse(saved);
    // Deep fallback reconciliation
    return { ...DEFAULT_CUSTOM_DATA, ...parsed };
  } catch (err) {
    console.error("Error loading custom template data:", err);
    return DEFAULT_CUSTOM_DATA;
  }
}

let _initFetched = false;
export function initCustomDataFromServer() {
  if (_initFetched) return;
  _initFetched = true;
  fetch("/api/data")
    .then(res => res.json())
    .then(data => {
      if (data && Object.keys(data).length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new Event("customDataUpdated"));
      }
    })
    .catch(console.error);
}

export function saveCustomData(data: CustomData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 401 || res.status === 403) {
        alert("You do not have permission to save modifications.");
      }
    }).catch(console.error);

    window.dispatchEvent(new Event("customDataUpdated"));
    return true;
  } catch (err) {
    console.error("Error saving custom template data:", err);
    return false;
  }
}

export function resetCustomData(): CustomData {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("customDataUpdated"));
    return DEFAULT_CUSTOM_DATA;
  } catch (err) {
    console.error("Error reseting custom template data:", err);
    return DEFAULT_CUSTOM_DATA;
  }
}
