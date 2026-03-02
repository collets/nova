import type { BadgeKind, SkillRank } from '../domain/site/value-objects';

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  primaryCta: {
    label: string;
    href: string;
  };
}

export interface NavSection {
  id: string;
  label: string;
  href: string;
}

export interface SkillItem {
  name: string;
  description: string;
  rank: SkillRank;
  badge: {
    kind: BadgeKind;
  };
}

export interface SkillGroup {
  title: string;
  icon: string;
  description: string;
  focus: string[];
  items: SkillItem[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  badge: {
    kind: BadgeKind;
  };
  liveUrl?: string;
  codeUrl?: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface SiteContent {
  config: SiteConfig;
  nav: NavSection[];
  about: string[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  contact: ContactLink[];
}
