import * as React from 'react';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { VRMSchema } from '@pixiv/three-vrm';
import {
  Track,
  TrackChunkSize,
  TrackType,
  lerpedValue,
  lowerBound,
} from './Track';

export * from './Track';

// temporary variables
const _q = new THREE.Quaternion();

export interface Animation {
  tracks: Track[];
  createKeyframe(trackUuid: string, timeSec: number): string | null;
  eraseKeyframe(trackUuid: string, keyframeUuid: string): void;
  setKeyframeValues(
    trackUuid: string,
    keyframeUuid: string,
    values: number[]
  ): void;
  startAtSec: number;
  endAtSec: number;
  durationSec: number;
  setDurationSec(value: number): void;
}

export const AnimationContext = React.createContext<Animation>({
  tracks: [],
  createKeyframe: () => null,
  eraseKeyframe: () => {},
  setKeyframeValues: () => {},
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
      const nextValues = [
        ...track.values.slice(0, index * chunkSize),
        ...lerpedValue(track, timeSec),
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

  const eraseKeyframe = React.useCallback(
    (trackUuid: string, keyframeUuid: string) => {
      const track = tracks.find(e => trackUuid === e.uuid);
      if (!track) return;

      const index = track.uuids.findIndex(uuid => uuid === keyframeUuid);
      if (index === -1) return;

      const chunkSize = TrackChunkSize[track.type];

      const nextUuids = [...track.uuids];
      const nextTimes = [...track.times];
      const nextValues = [...track.values];

      nextUuids.splice(index, 1);
      nextTimes.splice(index, 1);
      nextValues.splice(index * chunkSize, chunkSize);

      track.uuids = nextUuids;
      track.times = nextTimes;
      track.values = nextValues;

      setTracks([...tracks]);
    },
    [tracks]
  );

  const setKeyframeValues = React.useCallback(
    (trackUuid: string, keyframeUuid: string, values: number[]) => {
      const track = tracks.find(e => trackUuid === e.uuid);
      if (!track) return;

      const index = track.uuids.findIndex(uuid => uuid === keyframeUuid);
      if (index === -1) return;

      const chunkSize = TrackChunkSize[track.type];
      if (values.length !== chunkSize) {
        // TODO: employ assert function
        console.error(
          'Animation',
          'setKeyframeValues',
          'values.length !== chunkSize'
        );
        return;
      }

      const nextValues = [...track.values];
      nextValues.splice(index * chunkSize, chunkSize, ...values);
      track.values = nextValues;

      setTracks([...tracks]);
    },
    [tracks, setTracks]
  );

  const [durationSec, setDurationSec] = React.useState(10);

  return (
    <AnimationContext.Provider
      value={{
        tracks,
        createKeyframe,
        eraseKeyframe,
        setKeyframeValues,
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
