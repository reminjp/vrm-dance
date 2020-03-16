import * as React from 'react';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { VRMSchema } from '@pixiv/three-vrm';
import {
  Track,
  TrackChunkSize,
  TrackType,
  // lerpedValue,
  lowerBound,
} from './Track';

export * from './Track';

// temporary variables
const _v3 = new THREE.Vector3();
const _q = new THREE.Quaternion();

export interface Animation {
  tracks: Track[];
  createKeyframe(trackName: string, timeSec: number): string | null;
  startAtSec: number;
  endAtSec: number;
  durationSec: number;
  setDurationSec(value: number): void;
}

export const AnimationContext = React.createContext<Animation>({
  tracks: [],
  createKeyframe: () => null,
  startAtSec: 0,
  endAtSec: 1,
  durationSec: 1,
  setDurationSec: () => {},
});

export function useAnimation(): Animation {
  return React.useContext(AnimationContext);
}

export interface AnimationProviderProps {
  onRedirectCallback?(appState: any): void;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = props => {
  const [tracks, setTracks] = React.useState<Track[]>(() => [
    ...Object.values(VRMSchema.HumanoidBoneName).map(e => ({
      type: TrackType.Bone,
      uuid: uuidv4(),
      name: e,
      uuids: [],
      times: [],
      values: [],
    })),
  ]);

  const createKeyframe = React.useCallback(
    (trackUuid: string, timeSec: number): string | null => {
      const track = tracks.find(e => trackUuid === e.uuid);
      if (!track) return null;

      const chunkSize = TrackChunkSize[track.type];
      const index = lowerBound(track.times, timeSec);

      const uuid = uuidv4();

      const nextUuids = [
        ...track.uuids.slice(0, index),
        uuid,
        ...track.uuids.slice(index),
      ];
      const nextTimes = [
        ...track.times.slice(0, index),
        timeSec,
        ...track.times.slice(index),
      ];
      // const nextValues = [
      //   ...track.values.slice(0, index * chunkSize),
      //   ...lerpedValue(track, timeSec),
      //   ...track.values.slice(index * chunkSize),
      // ];

      // test
      const nextValues = [
        ...track.values.slice(0, index * chunkSize),
        ..._q
          .setFromAxisAngle(
            _v3.set(0, 0, 1),
            (Math.PI / 2) * Math.random() - Math.PI / 4
          )
          .toArray(),
        ...track.values.slice(index * chunkSize),
      ];

      if (track.type === TrackType.Bone) {
        _q.fromArray(nextValues)
          .normalize()
          .toArray(nextValues);
      }

      track.uuids = nextUuids;
      track.times = nextTimes;
      track.values = nextValues;

      setTracks([...tracks]);

      return uuid;
    },
    [tracks, setTracks]
  );

  const [durationSec, setDurationSec] = React.useState(10);

  return (
    <AnimationContext.Provider
      value={{
        tracks,
        createKeyframe,
        startAtSec: 0,
        endAtSec: durationSec,
        durationSec,
        setDurationSec,
      }}
    >
      {props.children}
    </AnimationContext.Provider>
  );
};
