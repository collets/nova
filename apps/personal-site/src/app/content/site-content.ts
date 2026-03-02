import { SiteContent } from '../types/site';

export const siteContent: SiteContent = {
  config: {
    name: 'Simone Coletta',
    role: 'Senior Frontend Developer',
    tagline:
      'Senior frontend developer with 10+ years shipping scalable web applications, UI systems, and high-impact delivery pipelines.',
    primaryCta: {
      label: 'View Quest Board',
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
    "I am a Senior Frontend Developer based in Fiesso d'Artico (Venice, Italy), focused on complex and high-performance web applications with modern frontend frameworks.",
    'Over the last decade, I built advanced UI components, optimized engineering workflows (CI/CD, monorepos, AWS), and delivered maintainable solutions with strong attention to accessibility, reliability, and developer experience.',
    'I work best in collaborative product teams, bring proactive technical leadership when needed, and keep exploring new practices to ship scalable software with consistent impact.',
  ],
  skills: [
    {
      title: 'Core Arcana',
      icon: '◆',
      description:
        'Primary frontend expertise used to build robust and accessible products.',
      focus: ['JavaScript / TypeScript', 'Angular', 'HTML / CSS / SASS', 'A11y'],
      items: [
        {
          name: 'TypeScript & JavaScript',
          description:
            'Builds type-safe and maintainable application logic with modern JavaScript and TypeScript patterns across large codebases.',
          rank: 'Legendary',
          badge: { kind: 'ring' },
        },
        {
          name: 'Angular Architecture',
          description:
            'Designs scalable Angular application structures and reusable component patterns for complex enterprise interfaces.',
          rank: 'Grandmaster',
          badge: { kind: 'shield' },
        },
        {
          name: 'Semantic HTML & CSS',
          description:
            'Creates clean, responsive interfaces using semantic HTML and scalable CSS/SASS styling systems.',
          rank: 'Master',
          badge: { kind: 'sword' },
        },
        {
          name: 'Accessibility Engineering',
          description:
            'Applies accessibility-first practices to keep keyboard, semantics, and assistive technology support production-ready.',
          rank: 'Expert',
          badge: { kind: 'pendant' },
        },
        {
          name: 'Redux & State Patterns',
          description:
            'Implements predictable state-management flows with Redux and pragmatic architecture decisions.',
          rank: 'Expert',
          badge: { kind: 'armor' },
        },
        {
          name: 'LESS & Styling Legacy',
          description:
            'Maintains and migrates legacy styling systems while preserving quality and delivery speed.',
          rank: 'Adept',
          badge: { kind: 'ring' },
        },
      ],
    },
    {
      title: 'Toolsmithing',
      icon: '⚙',
      description:
        'Tooling and infrastructure practices that accelerate delivery at scale.',
      focus: ['Nx', 'GitLab CI', 'pnpm / npm', 'AWS & Containers'],
      items: [
        {
          name: 'Nx Monorepo Ownership',
          description:
            'Owns monorepo architecture, task orchestration, and workspace conventions to keep multi-team delivery efficient and reliable.',
          rank: 'Legendary',
          badge: { kind: 'armor' },
        },
        {
          name: 'CI/CD Pipeline Engineering',
          description:
            'Designs and maintains fast, deterministic pipelines in GitLab CI with strong quality gates and clear feedback loops.',
          rank: 'Grandmaster',
          badge: { kind: 'shield' },
        },
        {
          name: 'Test Automation',
          description:
            'Builds reliable quality suites with Jest, Jasmine, component testing, and Playwright end-to-end coverage.',
          rank: 'Master',
          badge: { kind: 'sword' },
        },
        {
          name: 'Cloud & Infra Integration',
          description:
            'Delivers cloud-aware frontend systems using AWS services, IaC practices, and production deployment workflows.',
          rank: 'Expert',
          badge: { kind: 'pendant' },
        },
        {
          name: 'Containerized Delivery',
          description:
            'Integrates Docker and Kubernetes workflows to align frontend delivery with modern platform standards.',
          rank: 'Expert',
          badge: { kind: 'ring' },
        },
        {
          name: 'Microfrontend Strategy',
          description:
            'Applies modular frontend architecture and integration strategies across independently evolving teams.',
          rank: 'Adept',
          badge: { kind: 'sword' },
        },
      ],
    },
    {
      title: 'Product Alchemy',
      icon: '✦',
      description:
        'Execution mindset balancing product outcomes, leadership, and team health.',
      focus: [
        'Technical Leadership',
        'Teamworking',
        'Proactivity',
        'Continuous Learning',
      ],
      items: [
        {
          name: 'Technical Leadership',
          description:
            'Provides practical technical guidance and helps teams converge on scalable frontend decisions.',
          rank: 'Grandmaster',
          badge: { kind: 'sword' },
        },
        {
          name: 'Cross-Team Collaboration',
          description:
            'Works effectively across design, product, and engineering to deliver coherent and maintainable user experiences.',
          rank: 'Legendary',
          badge: { kind: 'shield' },
        },
        {
          name: 'Product-Focused Delivery',
          description:
            'Prioritizes measurable impact, usability, and maintainability when making frontend architecture choices.',
          rank: 'Master',
          badge: { kind: 'pendant' },
        },
        {
          name: 'Deep Focus Execution',
          description:
            'Thrives in remote setups that require ownership, strong communication, and consistent delivery quality.',
          rank: 'Expert',
          badge: { kind: 'ring' },
        },
        {
          name: 'Proactive Problem Solving',
          description:
            'Anticipates technical risks early and drives practical solutions before they impact release quality.',
          rank: 'Master',
          badge: { kind: 'armor' },
        },
        {
          name: 'Curiosity & Growth',
          description:
            'Constantly explores better practices, tools, and workflows to evolve both product quality and team efficiency.',
          rank: 'Adept',
          badge: { kind: 'shield' },
        },
      ],
    },
  ],
  projects: [
    {
      id: 'docebo',
      title: 'Docebo Spa | Senior Frontend Developer',
      summary:
        'Owned core Angular UI Kit components (data table, calendar, virtual scroll), led Nx monorepo and GitLab CI initiatives, and contributed to architecture and infra guidance across teams.',
      tech: ['Angular', 'Nx', 'GitLab CI', 'AWS'],
      badge: { kind: 'sword' },
      liveUrl: 'https://www.docebo.com',
    },
    {
      id: 'siav',
      title: 'SIAV Spa | Frontend Developer',
      summary:
        'Built key Angular interfaces for a document management product on top of microservices, with strong focus on UX and usability, while also supporting technical leadership activities.',
      tech: ['Angular', 'Microservices', 'UX'],
      badge: { kind: 'shield' },
      liveUrl: 'https://www.siav.com',
    },
    {
      id: 'it-euro-consulting',
      title: 'IT Euro Consulting | Fullstack Developer',
      summary:
        'Delivered frontend-focused ERP capabilities and a 24/7 real-time warehouse dashboard for a major client using Angular, ASP.NET MVC, and SignalR.',
      tech: ['Angular', 'ASP.NET MVC', 'SignalR'],
      badge: { kind: 'ring' },
    },
    {
      id: 'qwerty-studio',
      title: 'QWERTY Studio | Fullstack Web Developer',
      summary:
        'Developed websites and applications with C# and Angular, building both frontend and backoffice systems on Umbraco CMS, including an intranet used daily by hundreds of users.',
      tech: ['C#', 'Angular', 'Umbraco'],
      badge: { kind: 'pendant' },
    },
    {
      id: 'scquadro',
      title: 'SCQUADRO | Freelance Web Developer',
      summary:
        'Delivered websites and custom web solutions for local businesses and professionals, primarily with WordPress and bespoke implementations.',
      tech: ['WordPress', 'Custom Websites'],
      badge: { kind: 'armor' },
    },
  ],
  contact: [
    { label: 'Email', href: 'mailto:simone.coletta@outlook.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/colettasimone' },
    { label: 'GitHub', href: 'https://github.com/collets' },
  ],
};
