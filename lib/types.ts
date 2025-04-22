export interface PersonalDetails {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: number; // 1-5 scale
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  skills: string[];
  link: string;
  date: string;
}

export interface CVData {
  personalDetails: PersonalDetails;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
}