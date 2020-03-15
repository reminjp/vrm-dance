import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Rnd } from 'react-rnd';
import { useProject } from '../../contexts';
import './TimelineScaleView.scss';

export const TimelineScaleView: React.FC = () => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const project = useProject();
  const motionDurationSec = project.motionEndSec - project.motionStartSec;
  const timelineDurationSec = project.timelineEndSec - project.timelineStartSec;
  const barX = (project.timelineStartSec / motionDurationSec) * width;
  const barWidth = (timelineDurationSec / motionDurationSec) * width;

  const handleResizeAndDrag = React.useCallback(
    (x: number, w: number) => {
      const nextTimelineStartSec = (x / width) * motionDurationSec;
      const nextTimelineDurationSec = (w / width) * motionDurationSec;
      project.setTimelineStartSec(nextTimelineStartSec);
      project.setTimelineEndSec(nextTimelineStartSec + nextTimelineDurationSec);
    },
    [
      width,
      project.setTimelineStartSec,
      project.setTimelineEndSec,
      motionDurationSec,
    ]
  );

  return (
    <div className="timeline-scale">
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={(width, height) => {
          setWidth(width || 0);
          setHeight(height || 0);
        }}
      />
      <Rnd
        className="timeline-scale__bar"
        size={{ width: barWidth, height: height }}
        position={{ x: barX, y: 0 }}
        minWidth={(1 / motionDurationSec) * width}
        maxWidth={width}
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
