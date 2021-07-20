import * as React from 'react';

import Particles from 'react-particles-js';
import particleConfig from '#config/particles_login';

//TODO: convert to hook

const getDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { height, width };
};

const LoginParticleBackground = (): React.ReactElement => {
  const [dimensions, setDimensions] = React.useState(getDimensions());

  React.useEffect(() => {
    function handleResize() {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Particles
      className="particles"
      height={dimensions.height}
      width={dimensions.width}
      params={particleConfig}
    />
  );
};

export default LoginParticleBackground;
