import { client } from './client';
import type { AboutPage, ContactPage, HomePage, RegisterPage, SiteSettings } from './types';

// GROQ query for Home Page
const homePageQuery = `*[_type == "homePage"][0]{
  hero {
    title,
    subtitle,
    image {
      asset->{
        _id,
        url
      },
      alt,
      hotspot
    },
    primaryButton {
      text,
      url
    },
    secondaryButton {
      text,
      url
    }
  },
  mission {
    title,
    content
  },
  ctaSection {
    title,
    subtitle,
    button {
      text,
      url
    }
  },
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->{
        _id,
        url
      }
    }
  }
}`;

// GROQ query for Site Settings (for future use)
const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  contactInfo {
    phone,
    email,
    address {
      street,
      city,
      state,
      zip
    }
  },
  socialLinks[] {
    platform,
    url
  }
}`;

// GROQ query for About Page
const aboutPageQuery = `*[_type == "aboutPage"][0]{
  title,
  content,
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->{
        _id,
        url
      }
    }
  }
}`;

// GROQ query for Contact Page
const contactPageQuery = `*[_type == "contactPage"][0]{
  title,
  introText,
  formTitle,
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->{
        _id,
        url
      }
    }
  }
}`;

// GROQ query for Register Page
const registerPageQuery = `*[_type == "registerPage"][0]{
  title,
  subtitle,
  nextSteps {
    title,
    steps[] {
      description
    }
  },
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->{
        _id,
        url
      }
    }
  }
}`;

// Fetch functions with TypeScript types
export async function getHomePage(): Promise<HomePage | null> {
  return await client.fetch(homePageQuery);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await client.fetch(siteSettingsQuery);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return await client.fetch(aboutPageQuery);
}

export async function getContactPage(): Promise<ContactPage | null> {
  return await client.fetch(contactPageQuery);
}

export async function getRegisterPage(): Promise<RegisterPage | null> {
  return await client.fetch(registerPageQuery);
}
