import * as React from 'react';
import { VRMSchema } from '@pixiv/three-vrm';
import { TIMELINE_SIDE_COLUMN_WIDTH } from '../../constants';
import { TimelineBackgroundView } from './TimelineBackgroundView';
import { TimelineTrackView } from './TimelineTrackView';
import { TimelineRulerView } from './TimelineRulerView';
import { TimelineScaleBarView } from './TimelineScaleBarView';
import './index.scss';

export const TimelineView: React.FC = () => {
  return (
    <div className="timeline">
      <div
        className="timeline__background"
        style={{ left: TIMELINE_SIDE_COLUMN_WIDTH }}
      >
        <TimelineBackgroundView />
      </div>
      <div
        className="timeline__foreground"
        style={{ gridTemplateColumns: `${TIMELINE_SIDE_COLUMN_WIDTH}px 1fr` }}
      >
        <div className="timeline__header-side"></div>
        <div className="timeline__header-main">
          <TimelineRulerView />
        </div>
        <div className="timeline__body">
          {Object.entries(VRMSchema.HumanoidBoneName).map(([key, value], i) => (
            <TimelineTrackView
              key={key}
              humanoidBoneName={value}
              oddRow={i % 2 === 0}
            />
          ))}
        </div>
        <div className="timeline__footer-side"></div>
        <div className="timeline__footer-main">
          <TimelineScaleBarView />
        </div>
      </div>
    </div>
  );
};
