import * as React from 'react';
import {
  COLOR_BACKGROUND_LIGHT,
  COLOR_TEXT,
  COLOR_PRIMARY,
  SIZE_BORDER,
  SIZE_TEXT,
} from '../../constants';
import { useTimeline } from '../../contexts';
import './TimelineBackgroundView.scss';

interface TimelineBackgroundViewProps {
  width: number;
  height: number;
  headerHeight: number;
  paddingLeft: number;
  paddingRight: number;
}

export const TimelineBackgroundView: React.FC<TimelineBackgroundViewProps> = props => {
  const timeline = useTimeline();

  const grids = React.useMemo(() => {
    if (props.width === 0) return [];

    const paddingLeftSec =
      (props.paddingLeft / props.width) * timeline.durationSec;
    const paddingRightSec =
      (props.paddingRight / props.width) * timeline.durationSec;

    const a: { timeSec: number; x: number }[] = [];
    const s = Math.ceil(timeline.startAtSec - paddingLeftSec);
    const t = Math.min(s + 100, timeline.endAtSec + paddingRightSec);
    for (let i = s; i <= t; i++) {
      a.push({
        timeSec: i,
        x:
          ((i - timeline.startAtSec) / timeline.durationSec) *
            (props.width - props.paddingLeft - props.paddingRight) +
          props.paddingLeft,
      });
    }
    return a;
  }, [
    props.width,
    props.paddingLeft,
    props.paddingRight,
    timeline.startAtSec,
    timeline.endAtSec,
    timeline.durationSec,
  ]);

  const cursorX = React.useMemo(
    () =>
      ((timeline.cursorSec - timeline.startAtSec) / timeline.durationSec) *
        (props.width - props.paddingLeft - props.paddingRight) +
      props.paddingLeft,
    [
      props.width,
      props.paddingLeft,
      props.paddingRight,
      timeline.startAtSec,
      timeline.durationSec,
      timeline.cursorSec,
    ]
  );

  return (
    <div className="timeline-background">
      <svg
        width={props.width}
        height={props.height}
        viewBox={`0,0,${props.width},${props.height}`}
      >
        {grids.map(({ timeSec, x }) => (
          <g key={timeSec}>
            <line
              className="timeline-background__grid--primary"
              x1={x}
              x2={x}
              y1={props.headerHeight - SIZE_BORDER - 1.5 * SIZE_TEXT}
              y2={props.height}
              stroke={COLOR_BACKGROUND_LIGHT}
              strokeWidth={SIZE_BORDER}
            />
            <text
              x={x}
              y={props.headerHeight - SIZE_BORDER - 1.75 * SIZE_TEXT}
              fill={COLOR_TEXT}
            >
              {timeSec}
            </text>
          </g>
        ))}
        <line
          className="timeline-background__grid--primary"
          x1={cursorX}
          x2={cursorX}
          y1={props.headerHeight}
          y2={props.height}
          stroke={COLOR_PRIMARY}
          strokeWidth={SIZE_BORDER}
        />
        <text
          x={cursorX}
          y={props.headerHeight - SIZE_BORDER - 0.25 * SIZE_TEXT}
          fill={COLOR_PRIMARY}
        >
          {timeline.cursorSec.toFixed(3)}
        </text>
      </svg>
    </div>
  );
};
