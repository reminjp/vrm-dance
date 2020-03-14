import * as React from 'react';
import './TimelineHeaderView.scss';

interface TimelineHeaderViewProps {
  width: number;
  firstColumnWidth: number;
}

export const TimelineHeaderView: React.FC<TimelineHeaderViewProps> = props => {
  return (
    <div className="timeline-header">
      <div
        className="timeline-header__first-column"
        style={{ width: props.firstColumnWidth }}
      >
        Header
      </div>
      <div></div>
    </div>
  );
};
