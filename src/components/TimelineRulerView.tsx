import * as React from 'react';
import {
  TIMELINE_LEFT_MARGIN,
  TIMELINE_RIGHT_MARGIN,
  TIMELINE_SIDE_COLUMN_WIDTH,
} from '../constants';
import { useEnvironment, useProject } from '../contexts';
import './TimelineRulerView.scss';

export const TimelineRulerView: React.FC = () => {
  const environment = useEnvironment();
  const project = useProject();

  const [dragging, setDragging] = React.useState(false);

  const setCursorSec = React.useCallback(
    (x: number) => {
      const cursorSec =
        ((x - TIMELINE_LEFT_MARGIN) /
          (environment.windowWidth -
            TIMELINE_SIDE_COLUMN_WIDTH -
            TIMELINE_LEFT_MARGIN -
            TIMELINE_RIGHT_MARGIN)) *
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
      environment.windowWidth,
      project.motionStartSec,
      project.motionEndSec,
      project.timelineStartSec,
      project.timelineEndSec,
      project.setTimelineCursorSec,
    ]
  );

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setCursorSec(event.clientX - TIMELINE_SIDE_COLUMN_WIDTH);
      setDragging(true);
    },
    [setCursorSec, setDragging]
  );

  const onPointerUp = React.useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (dragging) setCursorSec(event.clientX - TIMELINE_SIDE_COLUMN_WIDTH);
    },
    [dragging, setCursorSec]
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
