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
import { VrmComponent } from './VrmComponent';
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

  const onFrame = React.useCallback(
    (delta: number) => {
      if (!timeline.playing) return;

      // TODO: calculate nextCursorSec from the time when start playing
      let nextCursorSec = timeline.cursorSec + delta;
      while (nextCursorSec > animation.endAtSec) {
        nextCursorSec -= animation.endAtSec;
        nextCursorSec += animation.startAtSec;
      }
      timeline.setCursorSec(nextCursorSec);
    },
    [
      animation.startAtSec,
      animation.endAtSec,
      timeline.cursorSec,
      timeline.setCursorSec,
      timeline.playing,
    ]
  );

  return (
    <div className="scene">
      <Canvas
        className="scene__canvas"
        camera={{ position: [0, 1, -5], fov: 30, near: 0.001, far: 100 }}
        pixelRatio={window.devicePixelRatio}
      >
        <OrbitControlsComponent
          target={new THREE.Vector3(0, 1, 0)}
          maxDistance={10}
          screenSpacePanning
        />
        <ambientLight args={[0x202020]} />
        <directionalLight args={[0xffffff]} position={[-1, 1, -1]} />
        <gridHelper args={[10, 10, 0xe0e0e0, 0x808080]} />
        <axesHelper args={[5]} />
        <VrmComponent vrm={vrm} onFrame={onFrame} />
      </Canvas>
    </div>
  );
};
