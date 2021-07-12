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
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#FFFFFF"
        {...props}
      >
        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
      </svg>
    </animated.div>
  );
};

export default ArrowIcon;
