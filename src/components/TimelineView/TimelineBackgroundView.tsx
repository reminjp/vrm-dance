import * as React from 'react';
import {
  COLOR_BACKGROUND_LIGHT,
  COLOR_TEXT,
  COLOR_PRIMARY,
  SIZE_BORDER,
  SIZE_TEXT,
} from '../../constants';
import { useProject } from '../../contexts';
import './TimelineBackgroundView.scss';

interface TimelineBackgroundViewProps {
  width: number;
  height: number;
  headerHeight: number;
  paddingLeft: number;
  paddingRight: number;
}

export const TimelineBackgroundView: React.FC<TimelineBackgroundViewProps> = props => {
  const project = useProject();

  const grids = React.useMemo(() => {
    if (props.width === 0) return [];

    const widthSec = project.timelineEndSec - project.timelineStartSec;
    const leftMarginSec = (props.paddingLeft / props.width) * widthSec;
    const rightMarginSec = (props.paddingRight / props.width) * widthSec;

    const a: { sec: number; px: number }[] = [];
    const s = Math.ceil(project.timelineStartSec - leftMarginSec);
    const t = Math.min(s + 100, project.timelineEndSec + rightMarginSec);
    for (let i = s; i <= t; i++) {
      a.push({
        sec: i,
        px:
          ((i - project.timelineStartSec) / widthSec) *
            (props.width - props.paddingLeft - props.paddingRight) +
          props.paddingLeft,
      });
    }
    return a;
  }, [
    props.width,
    props.paddingLeft,
    props.paddingRight,
    project.timelineStartSec,
    project.timelineEndSec,
  ]);

  const cursorPx = React.useMemo(() => {
    const widthSec = project.timelineEndSec - project.timelineStartSec;

    return (
      ((project.timelineCursorSec - project.timelineStartSec) / widthSec) *
        (props.width - props.paddingLeft - props.paddingRight) +
      props.paddingLeft
    );
  }, [
    props.width,
    props.paddingLeft,
    props.paddingRight,
    project.timelineStartSec,
    project.timelineEndSec,
    project.timelineCursorSec,
  ]);

  return (
    <div className="timeline-background">
      <svg
        width={props.width}
        height={props.height}
        viewBox={`0,0,${props.width},${props.height}`}
      >
        {grids.map(({ sec, px }) => (
          <g key={sec}>
            <line
              className="timeline-background__grid--primary"
              x1={px}
              x2={px}
              y1={props.headerHeight - SIZE_BORDER - 1.5 * SIZE_TEXT}
              y2={props.height}
              stroke={COLOR_BACKGROUND_LIGHT}
              strokeWidth={SIZE_BORDER}
            />
            <text
              x={px}
              y={props.headerHeight - SIZE_BORDER - 1.75 * SIZE_TEXT}
              fill={COLOR_TEXT}
            >
              {sec}
            </text>
          </g>
        ))}
        <line
          className="timeline-background__grid--primary"
          x1={cursorPx}
          x2={cursorPx}
          y1={props.headerHeight}
          y2={props.height}
          stroke={COLOR_PRIMARY}
          strokeWidth={SIZE_BORDER}
        />
        <text
          x={cursorPx}
          y={props.headerHeight - SIZE_BORDER - 0.25 * SIZE_TEXT}
          fill={COLOR_PRIMARY}
        >
          {project.timelineCursorSec.toFixed(3)}
        </text>
      </svg>
    </div>
  );
};
