export interface Project {
  id: string;
  title: string;
  subtitle: string;
  designFocus: string;
  researchInsight: string;
  imageSeed: string;
  tags: string[];
  challenge: string;
  process: string[];
  metrics: string[];
  solution: string;
  methods?: string;
  outcome?: string;
  path?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface AdditionalProject {
  id: string;
  title: string;
  tag: string;
  year: string;
  link?: string;
}
