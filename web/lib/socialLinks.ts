import type { SocialLink } from "@/lib/sanity/types";

export const formatSocialLabel = (platform: SocialLink["platform"]) => {
  return platform.charAt(0).toUpperCase() + platform.slice(1);
};

export const getSafeSocialUrl = (url: string) => {
  if (!url) {
    return undefined;
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return url;
    }
  } catch {
    return undefined;
  }

  return undefined;
};
