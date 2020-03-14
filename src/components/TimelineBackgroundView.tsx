import * as React from 'react';
import {
  TIMELINE_FIRST_COLUMN_WIDTH,
  TIMELINE_LEFT_MARGIN,
  TIMELINE_RIGHT_MARGIN,
} from '../constants';
import { useEnvironment, useProject } from '../contexts';
import './TimelineBackgroundView.scss';

const PRIMARY_GRID_COLOR = 'rgba(255, 255, 255, 0.1)';
const PRIMARY_TEXT_COLOR = '#f5f5f5';

export const TimelineBackgroundView: React.FC = () => {
  const environment = useEnvironment();
  const project = useProject();

  const width = environment.windowWidth - TIMELINE_FIRST_COLUMN_WIDTH;
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
  }, [width, project.timelineStartSec, project.timelineEndSec]);

  return (
    <div className="timeline-background">
      <svg width={width} height={height} viewBox={`0,0,${width},${height}`}>
        {grids.map(({ sec, px }) => (
          <g key={sec}>
            <line
              className="timeline-background__grid--primary"
              x1={px}
              x2={px}
              y1={0}
              y2={height}
              stroke={PRIMARY_GRID_COLOR}
              strokeWidth={1}
            />
            <text x={px + 4} y={24} fill={PRIMARY_TEXT_COLOR}>
              {sec}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
