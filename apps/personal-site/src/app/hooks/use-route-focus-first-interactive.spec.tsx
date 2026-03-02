import { render } from '@testing-library/react';
import { useRef } from 'react';
import { useRouteFocusFirstInteractive } from './use-route-focus-first-interactive';

function FocusHarness({
  routeKey,
  mode = 'focusable',
}: {
  routeKey: string;
  mode?: 'focusable' | 'none' | 'ignore-and-disabled';
}) {
  const ref = useRef<HTMLElement | null>(null);
  useRouteFocusFirstInteractive(ref, routeKey);

  return (
    <main ref={ref}>
      {mode === 'focusable' ? <button type="button">First Action</button> : null}
      {mode === 'ignore-and-disabled' ? (
        <>
          <button type="button" data-focus-ignore>
            Ignored
          </button>
          <button type="button" disabled>
            Disabled
          </button>
          <a href="/quests">Fallback Link</a>
        </>
      ) : null}
      {mode === 'none' ? <div>No interactive item</div> : null}
    </main>
  );
}

describe('useRouteFocusFirstInteractive', () => {
  it('should focus first interactive element when route key changes', () => {
    const rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        callback(0);
        return 1;
      });

    const { rerender } = render(<FocusHarness routeKey="/character" />);
    expect(document.activeElement?.textContent).toContain('First Action');

    rerender(<FocusHarness routeKey="/quests" />);
    expect(document.activeElement?.textContent).toContain('First Action');

    rafSpy.mockRestore();
  });

  it('should skip ignored and disabled elements', () => {
    const rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        callback(0);
        return 1;
      });

    render(<FocusHarness routeKey="/skills" mode="ignore-and-disabled" />);

    expect(document.activeElement?.textContent).toContain('Fallback Link');
    rafSpy.mockRestore();
  });

  it('should no-op when there is no interactive element', () => {
    const rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        callback(0);
        return 1;
      });

    render(<FocusHarness routeKey="/none" mode="none" />);
    expect(document.activeElement).toBe(document.body);

    rafSpy.mockRestore();
  });
});
