import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Rnd } from 'react-rnd';
import { useAnimation, useTimeline } from '../../contexts';
import './TimelineScaleView.scss';

export const TimelineScaleView: React.FC = () => {
  const animation = useAnimation();
  const timeline = useTimeline();

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const barX = (timeline.startAtSec / animation.durationSec) * width;
  const barWidth = (timeline.durationSec / animation.durationSec) * width;

  const handleResizeAndDrag = React.useCallback(
    (x: number, w: number) => {
      const s = (x / width) * animation.durationSec;
      const d = (w / width) * animation.durationSec;
      timeline.setStartAtSec(s);
      timeline.setEndAtSec(s + d);
    },
    [animation.durationSec, timeline.setStartAtSec, timeline.setEndAtSec, width]
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
        minWidth={(1 / animation.durationSec) * width}
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
