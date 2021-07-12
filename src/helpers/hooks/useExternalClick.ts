import * as React from 'react';

// Had to switch this to "mousedown" event instead of "click" for
// the target to even open up

function useExternalClick<T extends HTMLElement>(
  onExternalClick: (e: MouseEvent) => any
): React.MutableRefObject<T | undefined> {
  const ref = React.useRef<T>();
  // using ref for persistence

  React.useEffect(() => {
    const handleExternalClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onExternalClick(event);
      }
    };

    // bind to doc
    document.addEventListener('mousedown', handleExternalClick);

    // unbind when done
    return () => {
      document.removeEventListener('mousedown', handleExternalClick);
    };
  }, [ref, onExternalClick]);

  return ref;
}

export default useExternalClick;
