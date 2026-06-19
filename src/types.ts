export type PageId = 'home' | 'student-visa' | 'visit-visa' | 'work-permit' | 'business-visa' | 'contact' | 'admin';

export interface NavItem {
  id: PageId;
  label: string;
}

export interface SkyTourPackage {
  title: string;
  duration: string;
  description: string;
  basePrice: number;
  featured: boolean;
  tag: string;
  features: string[];
}
