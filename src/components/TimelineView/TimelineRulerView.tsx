import * as React from 'react';
import { useProject } from '../../contexts';
import './TimelineRulerView.scss';

interface TimelineRulerViewProps {
  mainWidth: number;
  sideWidth: number;
  paddingLeft: number;
  paddingRight: number;
}

export const TimelineRulerView: React.FC<TimelineRulerViewProps> = props => {
  const project = useProject();

  const [dragging, setDragging] = React.useState(false);

  const setCursorSec = React.useCallback(
    (x: number) => {
      const cursorSec =
        ((x - props.paddingLeft) /
          (props.mainWidth - props.paddingLeft - props.paddingRight)) *
          (project.timelineEndSec - project.timelineStartSec) +
        project.timelineStartSec;

      project.setTimelineCursorSec(
        Math.max(
          project.motionStartSec,
          Math.min(project.motionEndSec, cursorSec)
        )
      );
    },
    [
      props.mainWidth,
      props.sideWidth,
      props.paddingLeft,
      props.paddingRight,
      project.motionStartSec,
      project.motionEndSec,
      project.timelineStartSec,
      project.timelineEndSec,
      project.setTimelineCursorSec,
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
