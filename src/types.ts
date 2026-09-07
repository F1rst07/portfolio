export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'highschool' | 'university';
  year: string;
  projectType: string;
  myRole: string;
  tools: string[];
  learned: string;
  skills: string[];
  imageUrl: string;
  projectUrl?: string;
  buttonText?: string;
}

export interface CategoryConfig {
  allLabel: string;
  allLabelEn: string;
  highSchoolName: string;
  highSchoolEn: string;
  universityName: string;
  universityEn: string;
}

export interface HeroConfig {
  badgeText: string;
  mainHeading: string;
  thaiSubheading: string;
  description: string;
  ownerName: string;
  ownerThaiName: string;
  ownerNickname: string;
  ownerMajor: string;
  ownerFaculty?: string;
  ownerUniversity?: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  heroImageUrl?: string;
}

export interface ContactConfig {
  email: string;
  facebookName: string;
  facebookUrl: string;
  instagramName: string;
  instagramUrl: string;
  note?: string;
}

export interface AboutConfig {
  greeting: string;
  fullName: string;
  nickname: string;
  studentYear: string;
  major: string;
  faculty: string;
  university: string;
  bio: string;
  interests: string[];
}

export interface PortfolioData {
  hero: HeroConfig;
  about: AboutConfig;
  contact: ContactConfig;
  categories: CategoryConfig;
  projects: Project[];
}

