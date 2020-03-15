import * as THREE from 'three';
import { Keyframe } from './Keyframe';

export enum TrackType {
  BoneTrack,
  BlendShapeTrack,
}

class TrackBase<T> {
  public readonly type: TrackType;
  public readonly name: string;
  private _keyframes: Keyframe<T>[];

  constructor(name: string) {
    this.name = name;
    this._keyframes = [];
  }

  get keyframes() {
    return this._keyframes;
  }

  protected insertKeyframe(keyframe: Keyframe<T>) {
    this._keyframes.splice(this.lowerBound(keyframe.time), 0, keyframe);
    this._keyframes = [...this._keyframes];
  }

  public lowerBound(time: number) {
    let head = 0;
    let tail = this.keyframes.length + 1;
    while (head + 1 < tail) {
      const i = head + Math.floor((tail - head) / 2);
      if (i < this.keyframes.length && time < this.keyframes[i].time) {
        head = i + 1;
      } else {
        tail = i;
      }
    }
    return head;
  }
}

export type Track = BoneTrack | BlendShapeTrack;

export class BoneTrack extends TrackBase<THREE.Quaternion> {
  public readonly type: TrackType.BoneTrack;

  constructor(name: string) {
    super(name);
    this.type = TrackType.BoneTrack;
  }

  public createKeyframe(time: number) {
    this.insertKeyframe(new Keyframe(time, new THREE.Quaternion()));
  }
}

export class BlendShapeTrack extends TrackBase<number> {
  public readonly type: TrackType.BlendShapeTrack;

  constructor(name: string) {
    super(name);
    this.type = TrackType.BlendShapeTrack;
  }

  public createKeyframe(time: number) {
    this.insertKeyframe(new Keyframe(time, 0));
  }
}
