import { fireEvent, render } from '@testing-library/react';
import { useEscapeToClose } from './use-escape-to-close';

function TestHarness({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEscapeToClose(isOpen, onClose);
  return null;
}

describe('useEscapeToClose', () => {
  it('should only close on Escape when open', () => {
    const onClose = vi.fn();
    const { rerender } = render(<TestHarness isOpen={false} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(0);

    rerender(<TestHarness isOpen onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Enter' });
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should clean up keydown listener', () => {
    const onClose = vi.fn();
    const addListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<TestHarness isOpen onClose={onClose} />);

    expect(addListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    unmount();
    expect(removeListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
