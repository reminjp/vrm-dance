import * as React from 'react';
import { useAnimation } from '../../contexts';
import { InspectorNumberInput } from './InspectorNumberInput';
import { InspectorRowView } from './InspectorRowView';
import './InspectorTimeView.scss';

interface InspectorTimeViewProps {
  trackUuid: string;
  keyframeUuid: string;
  time: number;
}

export const InspectorTimeView: React.FC<InspectorTimeViewProps> = props => {
  const animation = useAnimation();

  const onChange = React.useCallback(
    (time: number) => {
      animation.setKeyframeTime(props.trackUuid, props.keyframeUuid, time);
    },
    [props.trackUuid, props.keyframeUuid, animation.setKeyframeValues]
  );

  return (
    <div className="inspector-time">
      <div className="inspector-time__heading">Time</div>
      <InspectorRowView label="Time">
        <InspectorNumberInput value={props.time} onChange={t => onChange(t)} />
      </InspectorRowView>
    </div>
  );
};
