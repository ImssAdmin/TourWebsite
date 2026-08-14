import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export function useSEO({
  title,
  description,
  keywords,
  ogImage = '/og-image.jpg',
  canonical
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update meta tags
    const metaTags: Record<string, string> = {
      'description': description,
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    if (keywords) {
      metaTags['keywords'] = keywords;
    }

    // Update existing meta tags or create new ones
    Object.entries(metaTags).forEach(([key, value]) => {
      // Check for meta tag by name
      let meta = document.querySelector(`meta[name="${key}"]`) as HTMLMetaElement;
      
      // Check for meta tag by property (for Open Graph)
      if (!meta && key.startsWith('og:')) {
        meta = document.querySelector(`meta[property="${key}"]`) as HTMLMetaElement;
      }
      
      // Check for Twitter meta tags
      if (!meta && key.startsWith('twitter:')) {
        meta = document.querySelector(`meta[name="${key}"]`) as HTMLMetaElement;
      }

      if (meta) {
        meta.setAttribute('content', value);
      } else {
        // Create new meta tag
        const newMeta = document.createElement('meta');
        
        if (key.startsWith('og:')) {
          newMeta.setAttribute('property', key);
        } else {
          newMeta.setAttribute('name', key);
        }
        
        newMeta.setAttribute('content', value);
        document.head.appendChild(newMeta);
      }
    });

    // Update canonical URL if provided
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      
      if (link) {
        link.href = canonical;
      } else {
        link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    // Cleanup function
    return () => {
      // Reset to default title on unmount
      document.title = 'Premium Visa Consultancy - Student, Work & Business Visa Services';
    };
  }, [title, description, keywords, ogImage, canonical]);
}

// SEO data for each page
export const seoData = {
  home: {
    title: 'Premium Visa Consultancy - Student, Work & Business Visa Services',
    description: 'Expert visa consultation services for Student Visas, Work Permits, Tourist Visas, and Business Visas. Professional guidance for UK, USA, Canada, Australia & Europe immigration.',
    keywords: 'visa consultancy, immigration services, visa application, study abroad, work abroad'
  },
  'student-visa': {
    title: 'Student Visa Services - Study Abroad Consultation | Premium Visa',
    description: 'Get expert guidance for student visa applications. Complete support for studying in UK, USA, Canada, Australia, and European countries. MOI exemption and interview preparation included.',
    keywords: 'student visa, study abroad, university admission, student visa consultation, MOI exemption, study in UK, study in USA'
  },
  'visit-visa': {
    title: 'Tourist & Visit Visa Services - Travel Visa Consultation | Premium Visa',
    description: 'Professional tourist and visit visa consultation services. Expert assistance for UK, USA, Canada, Australia, and Schengen visa applications. Fast processing and high success rate.',
    keywords: 'tourist visa, visit visa, travel visa, vacation visa, visa consultation, Schengen visa, UK tourist visa'
  },
  'work-permit': {
    title: 'Work Permit & Employment Visa Services | Premium Visa Consultancy',
    description: 'Secure your work permit with expert consultation. Assistance for skilled worker visas, employment authorization, and job placement in UK, USA, Canada, Australia, and Europe.',
    keywords: 'work permit, employment visa, skilled worker visa, work abroad, job visa, work authorization'
  },
  'business-visa': {
    title: 'Business & Investment Visa Services - Entrepreneur Visa | Premium Visa',
    description: 'Start your business abroad with expert business visa consultation. Startup investor visas, entrepreneur visas, and business migration services for global expansion.',
    keywords: 'business visa, entrepreneur visa, investor visa, startup visa, business immigration, expand business abroad'
  },
  contact: {
    title: 'Contact Us - Get Free Visa Consultation | Premium Visa Consultancy',
    description: 'Contact our visa experts for free consultation. WhatsApp, phone, and email support available. Visit our office or schedule an online meeting for personalized visa guidance.',
    keywords: 'contact visa consultant, free consultation, visa help, immigration support, visa consultation contact'
  },
  admin: {
    title: 'Admin Dashboard - Manage Website Content | Premium Visa',
    description: 'Admin panel for managing website content, visa information, team members, and client inquiries.',
    keywords: 'admin panel, dashboard, content management'
  }
};
