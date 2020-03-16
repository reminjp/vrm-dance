import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactThreeFiber, extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line no-undef
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>;
    }
  }
}

export const OrbitControlsComponent: React.FC<any> = props => {
  const { camera, gl } = useThree();
  const controlsRef = React.useRef<OrbitControls>();

  useFrame(() => controlsRef.current?.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};
