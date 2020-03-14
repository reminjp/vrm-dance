import * as React from 'react';
import './TimelineRowView.scss';

interface TimelineRowViewProps {
  width: number;
  firstColumnWidth: number;
  humanoidBoneName: string;
  oddRow?: boolean;
}

export const TimelineRowView: React.FC<TimelineRowViewProps> = props => {
  return (
    <div className="timeline-row">
      <div
        className={'timeline-row__first-column' + (props.oddRow ? '--odd' : '')}
        style={{ width: props.firstColumnWidth }}
      >
        {props.humanoidBoneName}
      </div>
      <div
        className={'timeline-row__body' + (props.oddRow ? '--odd' : '')}
      ></div>
    </div>
  );
};
