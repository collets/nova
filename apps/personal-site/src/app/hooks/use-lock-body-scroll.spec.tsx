import { render } from '@testing-library/react';
import { useLockBodyScroll } from './use-lock-body-scroll';

function TestHarness({ isLocked }: { isLocked: boolean }) {
  useLockBodyScroll(isLocked);
  return null;
}

describe('useLockBodyScroll', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should lock body scroll when enabled', () => {
    render(<TestHarness isLocked />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unlock body scroll when disabled', () => {
    const { rerender } = render(<TestHarness isLocked />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<TestHarness isLocked={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('should restore overflow on unmount', () => {
    const { unmount } = render(<TestHarness isLocked />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
