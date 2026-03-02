import { type ContactLink } from '../../types/site';

export type ContactIconKind = 'scroll-purple' | 'scroll-blue' | 'scroll-red';

export interface ContactOptionViewModel {
  id: string;
  title: string;
  detail: string;
  href: string;
  iconKind: ContactIconKind;
  external: boolean;
}

const CONTACT_META: Record<string, Omit<ContactOptionViewModel, 'id' | 'href'>> = {
  email: {
    title: 'Send an Owl',
    detail: 'simone.coletta@outlook.com',
    iconKind: 'scroll-purple',
    external: false,
  },
  linkedin: {
    title: 'Guild Network',
    detail: 'View Professional Rank',
    iconKind: 'scroll-blue',
    external: true,
  },
  github: {
    title: 'Ancient Repository',
    detail: 'Inspect Source Spells',
    iconKind: 'scroll-red',
    external: true,
  },
};

function toId(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '-');
}

export function mapContactLinksToOptions(
  links: ContactLink[]
): ContactOptionViewModel[] {
  return links.map((link) => {
    const id = toId(link.label);
    const fallback: Omit<ContactOptionViewModel, 'id' | 'href'> = {
      title: link.label,
      detail: link.href,
      iconKind: 'scroll-red',
      external: /^https?:\/\//.test(link.href),
    };
    const meta = CONTACT_META[id] ?? fallback;

    return {
      id,
      href: link.href,
      ...meta,
    };
  });
}
