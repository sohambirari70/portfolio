export type SkillStatus =
  | 'practicing'
  | 'using'
  | 'learning'
  | 'editable';

export type SkillCategory = 'Programming' | 'Core Concepts' | 'Tools';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  note: string;
}

export type ProjectCategory =
  | 'Python Projects'
  | 'Web Development'
  | 'AI/ML Experiments'
  | 'College Projects';

export type ProjectStatus =
  | 'Sample Placeholder'
  | 'In Progress'
  | 'Learning Build'
  | 'Completed';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  isPlaceholder: boolean;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  specialization: string;
  period: string;
  status: string;
  description: string;
  isPlaceholder?: boolean;
}

export interface JourneyMilestone {
  id: string;
  phase: string;
  title: string;
  description: string;
  focusTag: string;
  isEditableNote?: boolean;
}

export interface LearningTopic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface ContactLinks {
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  location: string;
}

export interface PortfolioProfile {
  name: string;
  role: string;
  headline: string;
  heroIntro: string;
  animatedRoles: string[];
  aboutParagraphs: string[];
  profileImageUrl: string;
  college: string;
  degree: string;
  specialization: string;
  currentStatus: string;
  interests: string[];
}

export interface PortfolioData {
  version: number;
  profile: PortfolioProfile;
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  journey: JourneyMilestone[];
  currentlyLearning: LearningTopic[];
  contact: ContactLinks;
}
