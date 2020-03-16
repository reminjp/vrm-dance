import * as THREE from 'three';

export interface Track {
  type: TrackType;
  uuid: string;
  name: string;
  uuids: string[];
  times: number[];
  values: number[];
}

export enum TrackType {
  Bone,
  BlendShape,
}

export const TrackChunkSize = {
  [TrackType.Bone]: 4,
  [TrackType.BlendShape]: 1,
};

export const TrackChunkDefaultValues = {
  [TrackType.Bone]: new THREE.Quaternion().toArray(),
  [TrackType.BlendShape]: [0],
};

export function lerpedValue(track: Track, time: number): number[] {
  if (track.times.length === 0) {
    return [...TrackChunkDefaultValues[track.type]];
  }

  const chunkSize = TrackChunkSize[track.type];
  const index = lowerBound(track.times, time);

  let timeStart: number, chunkStart: number, timeEnd: number, chunkEnd: number;
  if (index - 1 < 0) {
    timeStart = time - 1;
    chunkStart = 0;
  } else {
    timeStart = track.times[index - 1];
    chunkStart = (index - 1) * chunkSize;
  }
  if (index >= track.times.length) {
    timeEnd = time;
    chunkEnd = (track.times.length - 1) * chunkSize;
  } else {
    timeEnd = track.times[index];
    chunkEnd = index * chunkSize;
  }
  const t = (time - timeStart) / (timeEnd - timeStart);

  const target = new Array(chunkSize);
  for (let i = 0; i < chunkSize; i++) {
    target[i] =
      (1 - t) * track.values[chunkStart + i] + t * track.values[chunkEnd + i];
  }
  return target;
}

export function lowerBound(array: number[], value: number): number {
  let head = 0;
  let tail = array.length;
  while (head < tail) {
    const i = head + Math.floor((tail - head) / 2);
    if (value > array[i]) {
      head = i + 1;
    } else {
      tail = i;
    }
  }
  return head;
}
