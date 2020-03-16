import * as React from 'react';
import { useAnimation, useTimeline } from '../../contexts';
import './TimelineRulerView.scss';

interface TimelineRulerViewProps {
  mainWidth: number;
  sideWidth: number;
  paddingLeft: number;
  paddingRight: number;
}

export const TimelineRulerView: React.FC<TimelineRulerViewProps> = props => {
  const animation = useAnimation();
  const timeline = useTimeline();

  const [dragging, setDragging] = React.useState(false);

  const setCursorSec = React.useCallback(
    (x: number) => {
      const cursorSec =
        ((x - props.paddingLeft) /
          (props.mainWidth - props.paddingLeft - props.paddingRight)) *
          timeline.durationSec +
        timeline.startAtSec;

      timeline.setCursorSec(
        Math.max(animation.startAtSec, Math.min(animation.endAtSec, cursorSec))
      );
    },
    [
      props.mainWidth,
      props.paddingLeft,
      props.paddingRight,
      animation.startAtSec,
      animation.endAtSec,
      timeline.startAtSec,
      timeline.durationSec,
      timeline.cursorSec,
      timeline.setCursorSec,
    ]
  );

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setCursorSec(event.clientX - props.sideWidth);
      setDragging(true);
    },
    [props.sideWidth, setCursorSec, setDragging]
  );

  const onPointerUp = React.useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (dragging) setCursorSec(event.clientX - props.sideWidth);
    },
    [props.sideWidth, dragging, setCursorSec]
  );

  return (
    <div
      className="timeline-ruler"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    ></div>
  );
};
