import * as React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM } from '@pixiv/three-vrm';

export const useVrm = () => {
  const { current: loader } = React.useRef(new GLTFLoader());
  const [vrm, setVrm] = React.useState<VRM>();

  const loadVrm = url => {
    loader.load(
      url,
      async gltf => {
        const vrm = await VRM.from(gltf);
        console.log('Loaded VRM.', vrm);
        setVrm(vrm);
      },
      progress => {
        console.log(
          'Loading VRM...',
          100 * (progress.loaded / progress.total),
          '%'
        );
      },
      error => {
        console.error(error);
      }
    );
  };

  return { vrm, loadVrm };
};
