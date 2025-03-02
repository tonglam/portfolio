/**
 * Social media profile links
 * Single source of truth for all social media links used throughout the site
 */

/**
 * Main social profiles with structured data
 */
export const socialProfiles = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/tonglam",
    icon: "GithubIcon",
    username: "tonglam",
    ariaLabel: "View GitHub profile",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/qitonglan/",
    icon: "LinkedinIcon",
    username: "qitonglan",
    ariaLabel: "Connect on LinkedIn",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    url: "https://x.com/tong_lam_14",
    icon: "XIcon",
    username: "tong_lam_14",
    ariaLabel: "Follow on X (Twitter)",
  },
];

/**
 * Get a specific social profile by ID
 * @param {string} id - The ID of the social profile to retrieve
 * @returns {Object|undefined} The social profile object or undefined if not found
 */
export const getSocialProfile = (id) => {
  return socialProfiles.find((profile) => profile.id === id);
};

export default socialProfiles;
