import * as React from 'react';
import { TIMELINE_SIDE_COLUMN_WIDTH } from '../../constants';
import './TimelineTrackView.scss';

interface TimelineTrackViewProps {
  humanoidBoneName: string;
  oddRow?: boolean;
}

export const TimelineTrackView: React.FC<TimelineTrackViewProps> = props => {
  return (
    <div className="timeline-track">
      <div
        className={
          'timeline-track__first-column' + (props.oddRow ? '--odd' : '')
        }
        style={{ width: TIMELINE_SIDE_COLUMN_WIDTH }}
      >
        {props.humanoidBoneName}
      </div>
      <div
        className={'timeline-track__body' + (props.oddRow ? '--odd' : '')}
      ></div>
    </div>
  );
};
