import * as React from 'react';
import { useProject } from '../contexts';
import { TimelineRangeView } from './TimelineRangeView';
import './TimelineFooterView.scss';

const HEIGHT = 32;

interface TimelineFooterViewProps {
  width: number;
  firstColumnWidth: number;
}

export const TimelineFooterView: React.FC<TimelineFooterViewProps> = props => {
  const project = useProject();

  return (
    <div className="timeline-footer">
      <div
        className="timeline-footer__first-column"
        style={{ width: props.firstColumnWidth, height: HEIGHT }}
      >
        {`[${project.motionStartSec}, ${project.motionEndSec}] [${project.timelineStartSec}, ${project.timelineEndSec}]`}
      </div>
      <div className="timeline-footer__range">
        <TimelineRangeView
          width={props.width - props.firstColumnWidth}
          height={HEIGHT}
        />
      </div>
    </div>
  );
};
