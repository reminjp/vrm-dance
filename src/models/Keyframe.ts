import { v4 as uuidv4 } from 'uuid';

export class Keyframe<T> {
  public readonly uuid: string;
  public readonly time: number;
  public readonly value: T;

  constructor(time: number, value: T) {
    this.uuid = uuidv4();
    this.time = time;
    this.value = value;
  }
}
