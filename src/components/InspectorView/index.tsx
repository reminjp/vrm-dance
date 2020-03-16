import * as React from 'react';
import { useTimeline } from '../../contexts';

export const InspectorView: React.FC = () => {
  const timeline = useTimeline();

  return (
    <div className="inspector">
      <div>{timeline.selectedTrackUuid}</div>
      <div>{timeline.selectedKeyframeUuid}</div>
    </div>
  );
};
