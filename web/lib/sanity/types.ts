// TypeScript types for Sanity content
// These will be used in Batch 2 for type-safe queries

import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset } from '@sanity/types';

// Image with alt text
export type SanityImage = {
  asset: ImageAsset;
  alt: string;
  hotspot?: {
    x: number;
    y: number;
  };
};

// Button component
export type Button = {
  text: string;
  url: string;
};

// Social media link
export type SocialLink = {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  url: string;
};

// Address
export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

// Contact information
export type ContactInfo = {
  phone: string;
  email: string;
  address: Address;
};

// Site Settings document
export type SiteSettings = {
  _id: string;
  _type: 'siteSettings';
  siteName: string;
  tagline?: string;
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
};

// SEO settings (reusable across pages)
export type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
};

// Home Page document
export type HomePage = {
  _id: string;
  _type: 'homePage';
  hero: {
    title: string;
    subtitle: string;
    image: SanityImage;
    primaryButton: Button;
    secondaryButton?: Button;
  };
  mission: {
    title: string;
    content: PortableTextBlock[];
  };
  ctaSection: {
    title: string;
    subtitle: string;
    button: Button;
  };
  seo?: SEO;
};

// About Page document
export type AboutPage = {
  _id: string;
  _type: 'aboutPage';
  title: string;
  content: PortableTextBlock[];
  seo?: SEO;
};

// Contact Page document
export type ContactPage = {
  _id: string;
  _type: 'contactPage';
  title: string;
  introText: string;
  formTitle: string;
  seo?: SEO;
};

// Register Page document
export type RegisterPage = {
  _id: string;
  _type: 'registerPage';
  title: string;
  subtitle: string;
  nextSteps: {
    title: string;
    steps: Array<{
      description: string;
    }>;
  };
  seo?: SEO;
};
