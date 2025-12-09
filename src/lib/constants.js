// Site Constants
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "OpenCode'25",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Open Source Hackathon',
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Code. Collaborate. Contribute.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://opencode.in',
  orgName: process.env.NEXT_PUBLIC_ORG_NAME || 'OpenCode',
  year: process.env.NEXT_PUBLIC_ORG_YEAR || '2025',
  eventMonth: process.env.NEXT_PUBLIC_EVENT_MONTH || 'February',
};

// External Links
export const EXTERNAL_LINKS = {
  unstop: process.env.NEXT_PUBLIC_UNSTOP_URL || '',
  githubOrg: process.env.NEXT_PUBLIC_GITHUB_ORG_URL || '',
  discord: process.env.NEXT_PUBLIC_DISCORD_URL || '',
  codeOfConduct: process.env.NEXT_PUBLIC_CODE_OF_CONDUCT_URL || '',
};

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
};

// Image Paths
export const IMAGE_PATHS = {
  logo: '/images/logo.png',
  logoRb: '/images/logo_rb-min.png',
  logoText: '/images/opencode_25.png',
  mainImage: '/images/opencode24.png',
  favicon: '/images/opencode2024.png',
};

// How It Works Steps
export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    number: '1',
    title: 'Claim Issue',
    description:
      "It doesn't matter whether you know how to solve it. Don't look out for issues you know how to solve, but rather the ones you don't know how to solve! This will be your door to learning something new.",
    color: 'rgb(200, 180, 213)',
  },
  {
    id: 2,
    number: '2',
    title: 'Solve Issue',
    description:
      'After claiming the issue, explore ways on how to proceed. Mentors and Google will be your rescue here.',
    color: 'rgb(200, 180, 213)',
  },
  {
    id: 3,
    number: '3',
    title: 'Open a PR',
    description:
      "After reading everything on the internet, it's time to open your PR. This is the golden moment where you discover 100 ways git can make you cry!",
    color: 'rgb(200, 180, 213)',
  },
  {
    id: 4,
    number: '4',
    title: 'Leaderboard',
    description:
      "After a sleepless night waiting for your PR to merge, climb the leaderboard and enjoy the short-lived 'I love programming' feeling!",
    color: 'rgb(200, 180, 213)',
  },
];

// Animation Variants
export const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const FADE_IN_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
