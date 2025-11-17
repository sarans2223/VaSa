import { PlaceHolderImages } from './placeholder-images';
import type { ImagePlaceholder } from './placeholder-images';
import { Briefcase, BookOpen, ShieldCheck, Sparkles, LayoutGrid, User } from 'lucide-react';

const findImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      id: 'not-found',
      description: 'Image not found',
      imageUrl: 'https://picsum.photos/seed/error/400/400',
      imageHint: 'error',
    };
  }
  return image;
};

export const onboardingSteps = [
  {
    id: 1,
    title: 'Upskill with AI-Powered Courses',
    description: 'Empower AI suggests personalized learning paths to help you gain in-demand skills and advance your career.',
    image: findImage('onboarding-1'),
  },
  {
    id: 2,
    title: 'Verify Your Profile, Build Trust',
    description: 'Our secure verification process enhances your credibility with potential employers, making your profile stand out.',
    image: findImage('onboarding-2'),
  },
  {
    id: 3,
    title: 'Find Your Perfect Job Match',
    description: 'Let our AI match your skills and career goals with the right job opportunities, just for you.',
    image: findImage('onboarding-3'),
  },
];

export const dashboardItems = [
    { title: "Upskill", icon: Sparkles, href: "/upskill", description: "Personalized learning paths" },
    { title: "Job Match", icon: Briefcase, href: "/jobs", description: "AI-powered job suggestions" },
    { title: "Profile Verify", icon: ShieldCheck, href: "/profile", description: "Build trust with employers" },
    { title: "Career Tips", icon: BookOpen, href: "#", description: "Advice from career coaches" },
];

export const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/upskill', label: 'Upskill', icon: Sparkles },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/profile', label: 'Profile', icon: User },
  ];

export const jobSuggestions = [
    {
      title: "Frontend Developer",
      company: "Innovate Inc.",
      location: "Remote",
      salary: "$90k - $120k",
      tags: ["Full-time", "Remote", "Tech"],
      description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building the client-side of our web applications."
    },
    {
      title: "UX/UI Designer",
      company: "Creative Solutions",
      location: "New York, NY",
      salary: "$85k - $110k",
      tags: ["Full-time", "Hybrid", "Design"],
      description: "Seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design."
    },
    {
      title: "Digital Marketing Specialist",
      company: "Marketify",
      location: "San Francisco, CA",
      salary: "$75k - $95k",
      tags: ["Contract", "On-site", "Marketing"],
      description: "Join our marketing team to plan and execute all digital marketing, including SEO/SEM, marketing database, email, social media and display advertising campaigns."
    },
    {
      title: "Data Analyst",
      company: "DataDriven Co.",
      location: "Remote",
      salary: "$100k - $130k",
      tags: ["Full-time", "Remote", "Data"],
      description: "We're hiring a Data Analyst to interpret data, analyze results using statistical techniques and provide ongoing reports."
    }
];

export const userProfile = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: findImage('user-avatar').imageUrl,
    bio: "Passionate and driven professional with a background in marketing and a newfound interest in UX design. Eager to leverage my skills in a creative and challenging environment.",
    skills: ["Digital Marketing", "SEO", "Social Media Management", "Figma", "User Research"],
    experience: [
        {
            role: "Marketing Coordinator",
            company: "Creative Solutions",
            period: "2018 - 2022",
        }
    ],
    education: [
        {
            degree: "B.A. in Communications",
            university: "State University",
            period: "2014 - 2018"
        }
    ]
};
