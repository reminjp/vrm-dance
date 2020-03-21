import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import { VRM } from '@pixiv/three-vrm';

interface VrmComponentProps {
  vrm?: VRM;
  onFrame?(delta: number): void;
}

export const VrmComponent: React.FC<VrmComponentProps> = props => {
  useFrame((state, delta) => {
    if (props.onFrame) props.onFrame(delta);

    if (props.vrm) props.vrm.update(delta);
  });

  if (!props.vrm) return null;

  return <primitive object={props.vrm.scene} />;
};
