import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControlsComponent } from './OrbitControlsComponent';
import { useVrm } from './useVrm';
import './index.scss';

const defaultVrmUrl = require('../../default.vrm').default;

export const SceneView: React.FC = () => {
  const { vrm, loadVrm } = useVrm();

  React.useEffect(() => {
    loadVrm(defaultVrmUrl);
  }, []);

  return (
    <div className="scene">
      <Canvas
        className="scene__canvas"
        camera={{ position: [0, 1.5, -1.5], fov: 50, near: 0.001, far: 10 }}
        pixelRatio={window.devicePixelRatio}
      >
        <OrbitControlsComponent
          target={new THREE.Vector3(0, 1.125, 0)}
          screenSpacePanning
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {vrm && <primitive object={vrm.scene} />}
      </Canvas>
    </div>
  );
};
