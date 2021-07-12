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
        id="Bold"
        viewBox="0 0 24 24"
        fill="#ffffff"
        width="24px"
        height="24px"
        {...props}
      >
        <path d="M19.061,7.854a1.5,1.5,0,0,0-2.122,0l-4.586,4.585a.5.5,0,0,1-.707,0L7.061,7.854A1.5,1.5,0,0,0,4.939,9.975l4.586,4.586a3.5,3.5,0,0,0,4.95,0l4.586-4.586A1.5,1.5,0,0,0,19.061,7.854Z" />
      </svg>
    </animated.div>
  );
};

export default ArrowIcon;
