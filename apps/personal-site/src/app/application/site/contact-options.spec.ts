import { describe, expect, it } from 'vitest';
import { mapContactLinksToOptions } from './contact-options';

describe('mapContactLinksToOptions', () => {
  it('should map known contact labels to themed options', () => {
    const options = mapContactLinksToOptions([
      { label: 'Email', href: 'mailto:test@example.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/test' },
      { label: 'GitHub', href: 'https://github.com/test' },
    ]);

    expect(options).toEqual([
      {
        id: 'email',
        title: 'Send an Owl',
        detail: 'simone.coletta@outlook.com',
        href: 'mailto:test@example.com',
        iconKind: 'scroll-purple',
        external: false,
      },
      {
        id: 'linkedin',
        title: 'Guild Network',
        detail: 'View Professional Rank',
        href: 'https://linkedin.com/in/test',
        iconKind: 'scroll-blue',
        external: true,
      },
      {
        id: 'github',
        title: 'Ancient Repository',
        detail: 'Inspect Source Spells',
        href: 'https://github.com/test',
        iconKind: 'scroll-red',
        external: true,
      },
    ]);
  });

  it('should fallback unknown labels safely', () => {
    const options = mapContactLinksToOptions([
      { label: 'Mastodon', href: 'https://example.social/@test' },
    ]);

    expect(options[0]).toMatchObject({
      id: 'mastodon',
      title: 'Mastodon',
      detail: 'https://example.social/@test',
      iconKind: 'scroll-red',
      external: true,
    });
  });

  it('should mark unknown non-http links as internal and slugify id', () => {
    const options = mapContactLinksToOptions([
      { label: 'Calendar Invite', href: 'cal://invite-id-123' },
    ]);

    expect(options[0]).toMatchObject({
      id: 'calendar-invite',
      title: 'Calendar Invite',
      detail: 'cal://invite-id-123',
      iconKind: 'scroll-red',
      external: false,
    });
  });
});
