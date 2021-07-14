import React, { Suspense } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

import LoginForm from './LoginForm';
import { TextureLoader } from 'three';

const Login = (): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const normalMap = useLoader(TextureLoader, require('./fetch.jpg'));

  return (
    <>
      <div className="login">
        {' '}
        {/* <LoginForm /> */}
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Sphere args={[1, 250, 250]}>
            <meshStandardMaterial
              roughness={0}
              metalness={0.5}
              attach="material"
              color="#ff7420"
              normalMap={normalMap}
            />
          </Sphere>
        </Canvas>
      </div>
    </>
  );
};

export default Login;
