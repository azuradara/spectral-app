import * as React from 'react';
import { useSpring, animated } from '@react-spring/web';

const BASE_ORIENTATION = 0; // DEG | Down by default

type Orientation = 'up' | 'right' | 'down' | 'left';

const orientationToDeg = (o: Orientation): number => {
  switch (o) {
    case 'up':
      return BASE_ORIENTATION + 180;

    case 'left':
      return BASE_ORIENTATION * 2;

    case 'down':
      return BASE_ORIENTATION;

    default:
      return 0;
  }
};

interface ArrowProps extends React.SVGProps<SVGSVGElement> {
  orientation: Orientation;
}

const ArrowIcon = (props: ArrowProps): React.ReactElement => {
  const arrSpring = useSpring({
    to: {
      transform: `rotate(${orientationToDeg(props.orientation)}deg)`,
      display: 'flex',
    },
  });
  return (
    <animated.div style={arrSpring}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        {...props}
      >
        <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
      </svg>
    </animated.div>
  );
};

export default ArrowIcon;
