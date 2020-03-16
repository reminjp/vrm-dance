import * as React from 'react';
import * as THREE from 'three';
import { useAnimation } from '../../contexts';
import { InspectorNumberInput } from './InspectorNumberInput';
import { InspectorRowView } from './InspectorRowView';
import './InspectorBoneView.scss';

// temporary variables
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();

interface InspectorBoneViewProps {
  trackUuid: string;
  keyframeUuid: string;
  time: number;
  values: number[];
}

export const InspectorBoneView: React.FC<InspectorBoneViewProps> = props => {
  const animation = useAnimation();

  const [x, y, z] = React.useMemo(
    () =>
      _e
        .setFromQuaternion(_q.fromArray(props.values))
        .toArray()
        .map(e => (e / Math.PI) * 180),
    [props.values]
  );

  const onChange = React.useCallback(
    (x: number, y: number, z: number) => {
      console.log(x, y, z);

      const nextValues = _q
        .setFromEuler(
          _e.set((x / 180) * Math.PI, (y / 180) * Math.PI, (z / 180) * Math.PI)
        )
        .toArray();

      animation.setKeyframeValues(
        props.trackUuid,
        props.keyframeUuid,
        nextValues
      );
    },
    [props.trackUuid, props.keyframeUuid, animation.setKeyframeValues]
  );

  return (
    <div className="inspector-bone">
      <div className="inspector-bone__heading">Rotation</div>
      <InspectorRowView label="x">
        <InspectorNumberInput value={x} onChange={x => onChange(x, y, z)} />
      </InspectorRowView>
      <InspectorRowView label="y">
        <InspectorNumberInput value={y} onChange={y => onChange(x, y, z)} />
      </InspectorRowView>
      <InspectorRowView label="z">
        <InspectorNumberInput value={z} onChange={z => onChange(x, y, z)} />
      </InspectorRowView>
    </div>
  );
};
