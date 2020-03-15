import * as React from 'react';
import {
  TIMELINE_HEADER_HEIGHT,
  TIMELINE_LEFT_MARGIN,
  TIMELINE_RIGHT_MARGIN,
  TIMELINE_SIDE_COLUMN_WIDTH,
} from '../../constants';
import { useEnvironment, useProject } from '../../contexts';
import './TimelineBackgroundView.scss';

const CURSOR_LINE_COLOR = '#3273dc';
const CURSOR_TEXT_COLOR = '#3273dc';
const GRID_LINE_COLOR = 'rgba(255, 255, 255, 0.1)';
const GRID_TEXT_COLOR = '#f5f5f5';

export const TimelineBackgroundView: React.FC = () => {
  const environment = useEnvironment();
  const project = useProject();

  const width = environment.windowWidth - TIMELINE_SIDE_COLUMN_WIDTH;
  const height = environment.windowHeight;

  const grids = React.useMemo(() => {
    const widthSec = project.timelineEndSec - project.timelineStartSec;
    const leftMarginSec = (TIMELINE_LEFT_MARGIN / width) * widthSec;
    const rightMarginSec = (TIMELINE_RIGHT_MARGIN / width) * widthSec;

    const a: { sec: number; px: number }[] = [];
    for (
      let i = Math.ceil(project.timelineStartSec - leftMarginSec);
      i <= project.timelineEndSec + rightMarginSec;
      i++
    ) {
      a.push({
        sec: i,
        px:
          ((i - project.timelineStartSec) / widthSec) *
            (width - TIMELINE_LEFT_MARGIN - TIMELINE_RIGHT_MARGIN) +
          TIMELINE_LEFT_MARGIN,
      });
    }
    return a;
  }, [project.timelineStartSec, project.timelineEndSec, width]);

  const cursorPx = React.useMemo(() => {
    const widthSec = project.timelineEndSec - project.timelineStartSec;

    return (
      ((project.timelineCursorSec - project.timelineStartSec) / widthSec) *
        (width - TIMELINE_LEFT_MARGIN - TIMELINE_RIGHT_MARGIN) +
      TIMELINE_LEFT_MARGIN
    );
  }, [
    project.timelineStartSec,
    project.timelineEndSec,
    project.timelineCursorSec,
    width,
  ]);

  return (
    <div className="timeline-background">
      <svg width={width} height={height} viewBox={`0,0,${width},${height}`}>
        {grids.map(({ sec, px }) => (
          <g key={sec}>
            <line
              className="timeline-background__grid--primary"
              x1={px}
              x2={px}
              y1={TIMELINE_HEADER_HEIGHT - 24}
              y2={height}
              stroke={GRID_LINE_COLOR}
              strokeWidth={2}
            />
            <text x={px} y={TIMELINE_HEADER_HEIGHT - 28} fill={GRID_TEXT_COLOR}>
              {sec}
            </text>
          </g>
        ))}
        <line
          className="timeline-background__grid--primary"
          x1={cursorPx}
          x2={cursorPx}
          y1={TIMELINE_HEADER_HEIGHT}
          y2={height}
          stroke={CURSOR_LINE_COLOR}
          strokeWidth={2}
        />
        <text
          x={cursorPx}
          y={TIMELINE_HEADER_HEIGHT - 6}
          fill={CURSOR_TEXT_COLOR}
        >
          {project.timelineCursorSec.toFixed(3)}
        </text>
      </svg>
    </div>
  );
};
