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
    let tail = this.keyframes.length;
    while (head < tail) {
      const i = head + Math.floor((tail - head) / 2);
      if (time > this.keyframes[i].time) {
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
    // this.insertKeyframe(new Keyframe(time, new THREE.Quaternion()));

    // test
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      (Math.PI / 2) * Math.random() - Math.PI / 4
    );
    this.insertKeyframe(new Keyframe(time, q));
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
