import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import {
  SIZE_TEXT,
  SIZE_TIMELINE_HEADER_HEIGHT,
  SIZE_TIMELINE_SIDE_WIDTH,
} from '../../constants';
import { useAnimation } from '../../contexts';
import { TimelineBackgroundView } from './TimelineBackgroundView';
import { TimelinePlayerView } from './TimelinePlayerView';
import { TimelineRulerView } from './TimelineRulerView';
import { TimelineScaleView } from './TimelineScaleView';
import { TimelineTrackView } from './TimelineTrackView';
import './index.scss';

const PADDING_LEFT = 2 * SIZE_TEXT;
const PADDING_RIGHT = 4 * SIZE_TEXT;

export const TimelineView: React.FC = () => {
  const animation = useAnimation();

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  return (
    <div className="timeline">
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={(w, h) => {
          setWidth(w || 0);
          setHeight(h || 0);
        }}
      />
      <div className="timeline__background">
        <TimelineBackgroundView
          width={width - SIZE_TIMELINE_SIDE_WIDTH}
          height={height}
          headerHeight={SIZE_TIMELINE_HEADER_HEIGHT}
          paddingLeft={PADDING_LEFT}
          paddingRight={PADDING_RIGHT}
        />
      </div>
      <div className="timeline__foreground">
        <div className="timeline__header-side"></div>
        <div className="timeline__header-main">
          <TimelineRulerView
            mainWidth={width - SIZE_TIMELINE_SIDE_WIDTH}
            sideWidth={SIZE_TIMELINE_SIDE_WIDTH}
            paddingLeft={PADDING_LEFT}
            paddingRight={PADDING_RIGHT}
          />
        </div>
        <div className="timeline__body">
          {animation.tracks.map((track, i) => (
            <TimelineTrackView
              key={track.uuid}
              track={track}
              mainWidth={width - SIZE_TIMELINE_SIDE_WIDTH}
              sideWidth={SIZE_TIMELINE_SIDE_WIDTH}
              paddingLeft={PADDING_LEFT}
              paddingRight={PADDING_RIGHT}
              oddRow={i % 2 === 0}
            />
          ))}
        </div>
        <div className="timeline__footer-side">
          <TimelinePlayerView />
        </div>
        <div className="timeline__footer-main">
          <TimelineScaleView />
        </div>
      </div>
    </div>
  );
};
