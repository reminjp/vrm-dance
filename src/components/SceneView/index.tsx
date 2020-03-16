import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { VRMPose } from '@pixiv/three-vrm';
import { useProject } from '../../contexts';
import { TrackType } from '../../models';
import { OrbitControlsComponent } from './OrbitControlsComponent';
import { useVrm } from './useVrm';
import './index.scss';

const defaultVrmUrl = require('../../default.vrm').default;

export const SceneView: React.FC = () => {
  const project = useProject();

  const { vrm, loadVrm } = useVrm();

  React.useEffect(() => {
    loadVrm(defaultVrmUrl);
  }, []);

  React.useEffect(() => {
    if (!vrm) return;

    const pose: VRMPose = {};

    project.tracks.forEach(track => {
      if (track.type !== TrackType.BoneTrack) return;

      if (track.keyframes.length === 0) return;

      const i = track.lowerBound(project.timelineCursorSec);
      let t1: number, q1: THREE.Quaternion, t2: number, q2: THREE.Quaternion;
      if (i - 1 < 0) {
        t1 = project.motionStartSec;
        q1 = track.keyframes[0].value;
      } else {
        t1 = track.keyframes[i - 1].time;
        q1 = track.keyframes[i - 1].value;
      }
      if (i >= track.keyframes.length) {
        t2 = project.motionEndSec;
        q2 = track.keyframes[i - 1].value;
      } else {
        t2 = track.keyframes[i].time;
        q2 = track.keyframes[i].value;
      }
      const q = THREE.Quaternion.slerp(
        q1,
        q2,
        new THREE.Quaternion(),
        (project.timelineCursorSec - t1) / (t2 - t1)
      );

      console.log(q, (project.timelineCursorSec - t1) / (t2 - t1));

      pose[track.name] = {
        rotation: q.toArray() as [number, number, number, number],
      };
    });

    vrm.humanoid.setPose(pose);
  }, [
    project.tracks,
    project.motionStartSec,
    project.motionEndSec,
    project.timelineCursorSec,
    vrm,
  ]);

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
