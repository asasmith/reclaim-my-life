import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getClient } from "./client";
import type { AboutPage, ContactPage, HomePage, RegisterPage, SiteSettings } from "./types";

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
    _key,
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
  formFields[] {
    fieldKey,
    label,
    type,
    required,
    placeholder,
    helpText,
    options
  },
  thankYou {
    title,
    message
  },
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
export async function getHomePage(options?: { preview?: boolean }): Promise<HomePage | null> {
  return await getClient(options).fetch(homePageQuery);
}

const getSiteSettingsCached = cache(async (preview?: boolean): Promise<SiteSettings | null> => {
  if (preview) {
    return await getClient({ preview }).fetch(siteSettingsQuery);
  }

  const fetchSiteSettings = unstable_cache(
    async () => {
      return await getClient({ preview }).fetch(siteSettingsQuery);
    },
    ["siteSettings"],
    { tags: ["siteSettings"] }
  );

  return await fetchSiteSettings();
});

export async function getSiteSettings(options?: { preview?: boolean }): Promise<SiteSettings | null> {
  return await getSiteSettingsCached(options?.preview);
}

export async function getAboutPage(options?: { preview?: boolean }): Promise<AboutPage | null> {
  return await getClient(options).fetch(aboutPageQuery);
}

export async function getContactPage(options?: { preview?: boolean }): Promise<ContactPage | null> {
  return await getClient(options).fetch(contactPageQuery);
}

export async function getRegisterPage(options?: { preview?: boolean }): Promise<RegisterPage | null> {
  return await getClient(options).fetch(registerPageQuery);
}
