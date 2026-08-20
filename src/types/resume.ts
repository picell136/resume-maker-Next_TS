export type TemplateId = "classic" | "modern" | "minimal";

export interface PersonalInfo {
  lastName: string;
  firstName: string;
  patronymic: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  telegram: string;
  max: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  description: string;
  technologies: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Resume {
  id: string;
  draftName: string;
  updatedAt: string;
  template: TemplateId;
  accentColor: string;
  fontFamilyId: string;
  fontStyleId: string;
  fontSize: number;
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string;
  projects: ProjectItem[];
  languages: LanguageItem[];
  certificates: CertificateItem[];
}
