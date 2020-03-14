import * as React from 'react';
import { Rnd } from 'react-rnd';
import { useProject } from '../contexts';
import './TimelineRangeView.scss';

interface TimelineRangeViewProps {
  width: number;
  height: number;
}

export const TimelineRangeView: React.FC<TimelineRangeViewProps> = props => {
  const project = useProject();
  const motionDurationSec = project.motionEndSec - project.motionStartSec;
  const timelineDurationSec = project.timelineEndSec - project.timelineStartSec;
  const barX = (project.timelineStartSec / motionDurationSec) * props.width;
  const barWidth = (timelineDurationSec / motionDurationSec) * props.width;

  const handleResizeAndDrag = React.useCallback(
    (x: number, width: number) => {
      const nextTimelineStartSec = (x / props.width) * motionDurationSec;
      const nextTimelineDurationSec = (width / props.width) * motionDurationSec;
      project.setTimelineStartSec(nextTimelineStartSec);
      project.setTimelineEndSec(nextTimelineStartSec + nextTimelineDurationSec);
    },
    [
      props.width,
      project.setTimelineStartSec,
      project.setTimelineEndSec,
      motionDurationSec,
    ]
  );

  return (
    <div
      className="timeline-range"
      style={{ width: props.width, height: props.height }}
    >
      <Rnd
        className="timeline-range__bar"
        size={{ width: barWidth, height: props.height }}
        position={{ x: barX, y: 0 }}
        minWidth={(1 / motionDurationSec) * props.width}
        maxWidth={props.width}
        dragAxis="x"
        enableResizing={{ right: true, left: true }}
        resizeHandleStyles={{
          left: { cursor: 'ew-resize' },
          right: { cursor: 'ew-resize' },
        }}
        bounds="parent"
        onDrag={(e, data) => handleResizeAndDrag(data.x, barWidth)}
        onResize={(e, direction, ref, delta, position) =>
          handleResizeAndDrag(
            position.x,
            Number(ref.style.width.replace('px', ''))
          )
        }
      />
    </div>
  );
};
