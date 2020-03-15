import * as React from 'react';
import { TrackType } from '../../models';
import './TimelineKeyframeView.scss';

interface TimelineKeyframeViewProps {
  trackType: TrackType;
  keyframeUuid: string;
  x: number;
}

export const TimelineKeyframeView: React.FC<TimelineKeyframeViewProps> = props => {
  const onDoubleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <div
      className="timeline-keyframe"
      style={{ left: props.x }}
      onDoubleClick={onDoubleClick}
    />
  );
};
