import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { VRMPose } from '@pixiv/three-vrm';
import {
  TrackType,
  lerpedValue,
  useAnimation,
  useTimeline,
} from '../../contexts';
import { OrbitControlsComponent } from './OrbitControlsComponent';
import { useVrm } from './useVrm';
import './index.scss';

const defaultVrmUrl = require('../../three-vrm-girl.vrm').default;

export const SceneView: React.FC = () => {
  const animation = useAnimation();
  const timeline = useTimeline();

  const { vrm, loadVrm } = useVrm();

  React.useEffect(() => {
    loadVrm(defaultVrmUrl);
  }, []);

  React.useEffect(() => {
    if (!vrm) return;

    const pose: VRMPose = {};

    animation.tracks.forEach(track => {
      if (track.uuids.length === 0) return;

      // TODO: implement TrackType.BlendShape
      if (track.type !== TrackType.Bone) return;

      const value = lerpedValue(track, timeline.cursorSec);

      pose[track.name] = {
        rotation: value as [number, number, number, number],
      };
    });

    vrm.humanoid.setPose(pose);
  }, [animation.tracks, timeline.cursorSec, vrm]);

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
        <ambientLight args={[0x404040]} />
        <directionalLight args={[0xffffff]} position={[1, 1, 1]} />
        <gridHelper args={[10, 10, 0xe0e0e0, 0x808080]} />
        <axesHelper args={[5]} />
        {vrm && <primitive object={vrm.scene} />}
      </Canvas>
    </div>
  );
};
