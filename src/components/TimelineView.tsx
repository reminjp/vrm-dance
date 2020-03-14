import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { VRMSchema } from '@pixiv/three-vrm';
import { TIMELINE_FIRST_COLUMN_WIDTH } from '../constants';
import { TimelineBackgroundView } from './TimelineBackgroundView';
import { TimelineFooterView } from './TimelineFooterView';
import { TimelineHeaderView } from './TimelineHeaderView';
import { TimelineRowView } from './TimelineRowView';
import './TimelineView.scss';

export const TimelineView: React.FC = () => {
  return (
    <div className="timeline">
      <ReactResizeDetector handleWidth>
        {({ width }) => {
          const clampedWidth = Math.max(
            width || 0,
            TIMELINE_FIRST_COLUMN_WIDTH + 1
          );
          return (
            <>
              <div
                className="timeline__background"
                style={{ left: TIMELINE_FIRST_COLUMN_WIDTH }}
              >
                <TimelineBackgroundView />
              </div>
              <div className="timeline__foreground">
                <div className="timeline__header">
                  <TimelineHeaderView
                    width={clampedWidth}
                    firstColumnWidth={TIMELINE_FIRST_COLUMN_WIDTH}
                  />
                </div>
                <div className="timeline__body">
                  {Object.entries(VRMSchema.HumanoidBoneName).map(
                    ([key, value], i) => (
                      <TimelineRowView
                        key={key}
                        width={clampedWidth}
                        firstColumnWidth={TIMELINE_FIRST_COLUMN_WIDTH}
                        humanoidBoneName={value}
                        oddRow={i % 2 === 0}
                      />
                    )
                  )}
                </div>
                <div className="timeline__footer">
                  <TimelineFooterView
                    width={clampedWidth}
                    firstColumnWidth={TIMELINE_FIRST_COLUMN_WIDTH}
                  />
                </div>
              </div>
            </>
          );
        }}
      </ReactResizeDetector>
    </div>
  );
};
