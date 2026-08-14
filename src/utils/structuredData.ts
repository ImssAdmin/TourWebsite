// Structured Data (JSON-LD) for SEO and Rich Snippets

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Premium Visa Consultancy",
  "alternateName": "Premium Visa",
  "url": "https://your-domain.com",
  "logo": "https://your-domain.com/android-chrome-512x512.png",
  "description": "Expert visa consultation services for Student Visas, Work Permits, Tourist Visas, and Business Visas. Professional guidance for UK, USA, Canada, Australia & Europe immigration.",
  "telephone": "+880-1234-567890",
  "email": "info@premiumvisa.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Dhaka",
    "addressRegion": "Dhaka",
    "postalCode": "1000",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.8103",
    "longitude": "90.4125"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": [
    {
      "@type": "Country",
      "name": "Bangladesh"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Visa Consultation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Student Visa Consultation",
          "description": "Complete support for student visa applications including university selection, document preparation, and interview coaching."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Work Permit Services",
          "description": "Expert assistance for work permit and employment visa applications for skilled professionals."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tourist Visa Services",
          "description": "Fast and reliable tourist and visit visa consultation for leisure and family visits."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Visa Consultation",
          "description": "Specialized services for entrepreneur, investor, and business migration visas."
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/premiumvisa",
    "https://www.linkedin.com/company/premiumvisa",
    "https://www.instagram.com/premiumvisa",
    "https://twitter.com/premiumvisa"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Premium Visa Consultancy",
  "url": "https://your-domain.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://your-domain.com/?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (pageName: string, pageUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://your-domain.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": pageName,
      "item": pageUrl
    }
  ]
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const serviceSchema = (
  name: string,
  description: string,
  serviceType: string
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "provider": {
    "@type": "ProfessionalService",
    "name": "Premium Visa Consultancy"
  },
  "serviceType": serviceType,
  "areaServed": {
    "@type": "Country",
    "name": "Bangladesh"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://your-domain.com",
    "servicePhone": {
      "@type": "ContactPoint",
      "telephone": "+880-1234-567890",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Bengali"]
    }
  }
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Premium Visa Consultancy",
  "image": "https://your-domain.com/og-image.jpg",
  "@id": "https://your-domain.com",
  "url": "https://your-domain.com",
  "telephone": "+880-1234-567890",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Dhaka",
    "addressRegion": "Dhaka",
    "postalCode": "1000",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.8103,
    "longitude": 90.4125
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ]
};

// Helper function to inject JSON-LD script into document head
export function injectStructuredData(data: Record<string, any>) {
  // Remove existing schema if present
  const existingScript = document.querySelector('script[data-schema="true"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Create and inject new schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Helper to inject multiple schemas
export function injectMultipleSchemas(schemas: Array<Record<string, any>>) {
  // Remove existing schemas
  const existingScripts = document.querySelectorAll('script[data-schema="true"]');
  existingScripts.forEach((script) => script.remove());

  // Inject all schemas
  schemas.forEach((schema, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'true');
    script.setAttribute('data-schema-index', index.toString());
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
