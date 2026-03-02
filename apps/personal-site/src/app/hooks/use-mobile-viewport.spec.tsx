import { act, render, waitFor } from '@testing-library/react';
import { useMobileViewport } from './use-mobile-viewport';

function TestHarness({ threshold = 850 }: { threshold?: number }) {
  const isMobile = useMobileViewport(threshold);
  return <div data-testid="value">{isMobile ? 'mobile' : 'desktop'}</div>;
}

describe('useMobileViewport', () => {
  afterEach(() => {
    window.innerWidth = 1024;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
  });

  it('should compute state from current viewport width', async () => {
    window.innerWidth = 600;
    render(<TestHarness />);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="value"]')?.textContent).toBe(
        'mobile'
      );
    });
  });

  it('should react to resize events', async () => {
    render(<TestHarness threshold={700} />);
    expect(document.querySelector('[data-testid="value"]')?.textContent).toBe('desktop');

    window.innerWidth = 500;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => {
      expect(document.querySelector('[data-testid="value"]')?.textContent).toBe(
        'mobile'
      );
    });
  });
});
