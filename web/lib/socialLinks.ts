import type { SocialLink } from "@/lib/sanity/types";

export const formatSocialLabel = (platform: SocialLink["platform"]) => {
  return platform.charAt(0).toUpperCase() + platform.slice(1);
};
