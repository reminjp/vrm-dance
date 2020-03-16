import * as React from 'react';
import { Track, useAnimation, useTimeline } from '../../contexts';
import { TimelineKeyframeView } from './TimelineKeyframeView';
import './TimelineTrackView.scss';

interface TimelineTrackViewProps {
  track: Track;
  mainWidth: number;
  sideWidth: number;
  paddingLeft: number;
  paddingRight: number;
  oddRow?: boolean;
}

export const TimelineTrackView: React.FC<TimelineTrackViewProps> = props => {
  const animation = useAnimation();
  const timeline = useTimeline();

  const onDoubleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const x = event.clientX - props.sideWidth - props.paddingLeft;
      const w = props.mainWidth - props.paddingLeft - props.paddingRight;

      const createdKeyframeUuid = animation.createKeyframe(
        props.track.uuid,
        (x / w) * timeline.durationSec + timeline.startAtSec
      );

      timeline.setSelectedTrackUuid(props.track.uuid);
      timeline.setSelectedKeyframeUuid(createdKeyframeUuid);
    },
    [
      props.track.uuid,
      props.mainWidth,
      props.sideWidth,
      props.paddingLeft,
      props.paddingRight,
      animation.createKeyframe,
      timeline.startAtSec,
      timeline.durationSec,
      timeline.setSelectedTrackUuid,
      timeline.setSelectedKeyframeUuid,
    ]
  );

  const secToPx = React.useCallback(
    sec =>
      ((sec - timeline.startAtSec) / timeline.durationSec) *
        (props.mainWidth - props.paddingLeft - props.paddingRight) +
      props.paddingLeft,
    [
      props.mainWidth,
      props.paddingLeft,
      props.paddingRight,
      timeline.startAtSec,
      timeline.durationSec,
    ]
  );

  // TODO: binary-search left and right ends.
  const keyframes = React.useMemo(
    () =>
      props.track.uuids.map((uuid, i) => (
        <TimelineKeyframeView
          key={uuid}
          trackType={props.track.type}
          trackUuid={props.track.uuid}
          keyframeUuid={uuid}
          x={secToPx(props.track.times[i])}
        />
      )),
    [
      props.track.type,
      props.track.uuid,
      props.track.uuids,
      props.track.times,
      secToPx,
    ]
  );

  const active = React.useMemo(
    () => props.track.uuid === timeline.selectedTrackUuid,
    [props.track.uuid, timeline.selectedTrackUuid]
  );

  return (
    <div className="timeline-track">
      <div
        className={
          'timeline-track__first-column' +
          (active ? '--active' : props.oddRow ? '--odd' : '')
        }
      >
        {props.track.name}
      </div>
      <div
        className={'timeline-track__body' + (props.oddRow ? '--odd' : '')}
        onDoubleClick={onDoubleClick}
      >
        {keyframes}
      </div>
    </div>
  );
};
