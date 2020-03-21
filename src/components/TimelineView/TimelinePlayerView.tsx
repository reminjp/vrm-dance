import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAnimation, useTimeline } from '../../contexts';
import './TimelinePlayerView.scss';

export const TimelinePlayerView: React.FC = () => {
  const animation = useAnimation();
  const timeline = useTimeline();

  return (
    <div className="timeline-player">
      <button
        className="timeline-player__button"
        onClick={() => {
          timeline.setCursorSec(animation.startAtSec);
        }}
      >
        <FontAwesomeIcon icon="step-backward" size="lg" />
      </button>
      <button
        className="timeline-player__button"
        onClick={() => {
          timeline.setPlaying(!timeline.playing);
        }}
      >
        <FontAwesomeIcon icon={timeline.playing ? 'pause' : 'play'} size="lg" />
      </button>
    </div>
  );
};
