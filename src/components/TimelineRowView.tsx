import * as React from 'react';
import { TIMELINE_SIDE_COLUMN_WIDTH } from '../constants';
import './TimelineRowView.scss';

interface TimelineRowViewProps {
  humanoidBoneName: string;
  oddRow?: boolean;
}

export const TimelineRowView: React.FC<TimelineRowViewProps> = props => {
  return (
    <div className="timeline-row">
      <div
        className={'timeline-row__first-column' + (props.oddRow ? '--odd' : '')}
        style={{ width: TIMELINE_SIDE_COLUMN_WIDTH }}
      >
        {props.humanoidBoneName}
      </div>
      <div
        className={'timeline-row__body' + (props.oddRow ? '--odd' : '')}
      ></div>
    </div>
  );
};
