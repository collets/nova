import { useEffect, type RefObject } from 'react';

export function useRouteFocusFirstInteractive(
  mainRef: RefObject<HTMLElement | null>,
  routeKey: string
): void {
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) {
      return;
    }

    const focusableSelector = [
      'button:not([disabled]):not([data-focus-ignore])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const firstInteractiveElement = mainElement.querySelector<HTMLElement>(
      focusableSelector
    );

    if (!firstInteractiveElement) {
      return;
    }

    window.requestAnimationFrame(() => {
      firstInteractiveElement.focus({ preventScroll: true });
    });
  }, [mainRef, routeKey]);
}
