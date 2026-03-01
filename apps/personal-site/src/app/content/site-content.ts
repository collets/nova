import { SiteContent } from '../types/site';

export const siteContent: SiteContent = {
  config: {
    name: 'Simone Coletta',
    role: 'Senior Frontend Developer',
    tagline:
      'I build clean, fast web interfaces with strong visual direction and practical UX.',
    primaryCta: {
      label: 'View Quests',
      href: '/quests',
    },
  },
  nav: [
    { id: 'character', label: 'Character', href: '/character' },
    { id: 'skills', label: 'Skill Book', href: '/skills' },
    { id: 'quests', label: 'Quests', href: '/quests' },
    { id: 'messenger', label: 'Messenger', href: '/messenger' },
  ],
  about: [
    'I design and build web interfaces that feel intentional: strong visual systems, clear information hierarchy, and smooth interactions that stay fast under real-world constraints.',
    'My core focus is frontend architecture with TypeScript and React, but I enjoy owning the full delivery loop: planning, implementation, testing, CI/CD, and production hardening.',
    'This page is a placeholder profile in a tactical pixel UI style. I will replace this with my real background, selected case studies, and links to active work.',
  ],
  skills: [
    {
      title: 'Core Arcana',
      icon: '◆',
      description:
        'Foundational magic used to craft fast, scalable interface systems.',
      focus: ['Component architecture', 'Reusable patterns', 'Strong typing'],
      items: [
        {
          name: 'TypeScript Mastery',
          description:
            'Designs strict and expressive type systems that reduce runtime uncertainty across large-scale applications, improve refactor safety, and keep shared domain models coherent between teams and delivery streams.',
          rank: 'Legendary',
          badge: { kind: 'ring' },
        },
        {
          name: 'React Composition',
          description:
            'Builds resilient component trees with clean boundaries and predictable state.',
          rank: 'Grandmaster',
          badge: { kind: 'shield' },
        },
        {
          name: 'Statecraft Patterns',
          description:
            'Orchestrates local and global state with pragmatic architecture choices.',
          rank: 'Master',
          badge: { kind: 'sword' },
        },
        {
          name: 'Semantic Markup',
          description:
            'Creates accessible structures that stay robust across devices and assistive tech.',
          rank: 'Expert',
          badge: { kind: 'pendant' },
        },
        {
          name: 'Performance Tracing',
          description:
            'Profiles and removes rendering bottlenecks for fluid, responsive UI.',
          rank: 'Master',
          badge: { kind: 'armor' },
        },
        {
          name: 'Animation Timing',
          description:
            'Uses motion intentionally to guide attention without sacrificing clarity.',
          rank: 'Adept',
          badge: { kind: 'ring' },
        },
      ],
    },
    {
      title: 'Toolsmithing',
      icon: '⚙',
      description:
        'Automation and workflow enchantments that keep teams fast at scale.',
      focus: ['Monorepo workflows', 'Automated quality gates', 'Release flow'],
      items: [
        {
          name: 'Nx Monorepo Forge',
          description:
            'Shapes project graphs, boundaries, and targets for reliable developer flow, faster incremental builds, and predictable CI execution even when multiple teams deliver features in parallel across shared codebases.',
          rank: 'Legendary',
          badge: { kind: 'armor' },
        },
        {
          name: 'CI Pipeline Rituals',
          description:
            'Designs deterministic pipelines with fast feedback and strong quality gates.',
          rank: 'Grandmaster',
          badge: { kind: 'shield' },
        },
        {
          name: 'Testing Arsenal',
          description:
            'Builds practical test suites that protect releases without slowing delivery.',
          rank: 'Master',
          badge: { kind: 'sword' },
        },
        {
          name: 'Release Automation',
          description:
            'Automates versioning, changelogs, and deployments across environments.',
          rank: 'Expert',
          badge: { kind: 'pendant' },
        },
        {
          name: 'Linting Enforcement',
          description:
            'Maintains code quality through consistent standards and actionable rules.',
          rank: 'Expert',
          badge: { kind: 'ring' },
        },
        {
          name: 'Observability Hooks',
          description:
            'Connects logs, metrics, and alerts to reduce time-to-resolution.',
          rank: 'Adept',
          badge: { kind: 'sword' },
        },
      ],
    },
    {
      title: 'Product Alchemy',
      icon: '✦',
      description:
        'Product execution focused on clarity, outcomes, and long-term UX health.',
      focus: ['UX clarity', 'Accessibility', 'Performance perception'],
      items: [
        {
          name: 'Interaction Design',
          description:
            'Turns complex workflows into intuitive and readable interface journeys.',
          rank: 'Legendary',
          badge: { kind: 'sword' },
        },
        {
          name: 'Design Systems',
          description:
            'Builds cohesive UI kits and tokenized foundations that scale across products.',
          rank: 'Grandmaster',
          badge: { kind: 'shield' },
        },
        {
          name: 'Accessibility Craft',
          description:
            'Ensures inclusive experiences with keyboard-first and screen-reader-ready flows.',
          rank: 'Master',
          badge: { kind: 'pendant' },
        },
        {
          name: 'Conversion UX',
          description:
            'Optimizes critical paths with measurable experiments and content hierarchy.',
          rank: 'Expert',
          badge: { kind: 'ring' },
        },
        {
          name: 'Performance Perception',
          description:
            'Uses skeletons, transitions, and instant feedback to improve perceived speed.',
          rank: 'Master',
          badge: { kind: 'armor' },
        },
        {
          name: 'Stakeholder Sync',
          description:
            'Aligns product, design, and engineering through concise technical communication.',
          rank: 'Adept',
          badge: { kind: 'shield' },
        },
      ],
    },
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Project One',
      summary:
        'Portfolio-ready web app with strong interaction design and production-grade code quality.',
      tech: ['React', 'TypeScript', 'Vite'],
      badge: { kind: 'sword' },
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com/example/repo-1',
    },
    {
      id: 'project-2',
      title: 'Project Two',
      summary:
        'Internal dashboard that improved team velocity through better information architecture.',
      tech: ['Nx', 'React', 'Testing Library'],
      badge: { kind: 'shield' },
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com/example/repo-2',
    },
    {
      id: 'project-3',
      title: 'Project Three',
      summary:
        'Design-system migration that unified component APIs and reduced frontend regressions across releases.',
      tech: ['TypeScript', 'Storybook', 'Monorepo'],
      badge: { kind: 'ring' },
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com/example/repo-3',
    },
    {
      id: 'project-4',
      title: 'Project Four',
      summary:
        'Landing-to-app funnel redesign focused on conversion clarity, mobile UX, and measurable performance gains.',
      tech: ['React', 'A/B Testing', 'Analytics'],
      badge: { kind: 'pendant' },
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com/example/repo-4',
    },
    {
      id: 'project-5',
      title: 'Project Five',
      summary:
        'Developer platform toolkit with opinionated templates and CI defaults to accelerate project bootstrap.',
      tech: ['Nx', 'CI/CD', 'Developer Experience'],
      badge: { kind: 'armor' },
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com/example/repo-5',
    },
    {
      id: 'project-6',
      title: 'Project Six',
      summary:
        'Data-heavy admin portal optimized for dense workflows with keyboard support and accessible semantics.',
      tech: ['React', 'State Management', 'Accessibility'],
      badge: { kind: 'sword' },
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com/example/repo-6',
    },
  ],
  contact: [
    { label: 'Email', href: 'mailto:you@example.com' },
    { label: 'GitHub', href: 'https://github.com/your-profile' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-profile' },
  ],
};
