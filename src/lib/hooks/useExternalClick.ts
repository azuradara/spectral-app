import * as React from 'react';

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
    document.addEventListener('click', handleExternalClick);

    // unbind when done
    return () => {
      document.removeEventListener('click', handleExternalClick);
    };
  }, [ref, onExternalClick]);

  return ref;
}

export default useExternalClick;
