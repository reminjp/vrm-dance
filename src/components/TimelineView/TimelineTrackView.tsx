import * as React from 'react';
import { useProject } from '../../contexts';
import { Track, TrackType } from '../../models';
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
  const project = useProject();

  const onDoubleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const x = event.clientX - props.sideWidth - props.paddingLeft;
      const widthPx = props.mainWidth - props.paddingLeft - props.paddingRight;
      const widthSec = project.timelineEndSec - project.timelineStartSec;
      project.createKeyframe(
        props.track.name,
        (x / widthPx) * widthSec + project.timelineStartSec
      );
    },
    [
      props.track,
      props.mainWidth,
      props.sideWidth,
      props.paddingLeft,
      props.paddingRight,
      project.createKeyframe,
      project.timelineStartSec,
      project.timelineEndSec,
    ]
  );

  const secToPx = React.useCallback(
    sec =>
      ((sec - project.timelineStartSec) /
        (project.timelineEndSec - project.timelineStartSec)) *
        (props.mainWidth - props.paddingLeft - props.paddingRight) +
      props.paddingLeft,
    [
      props.mainWidth,
      props.paddingLeft,
      props.paddingRight,
      project.timelineStartSec,
      project.timelineEndSec,
    ]
  );

  const keyframes = React.useMemo(() => {
    // TODO: refactor
    switch (props.track.type) {
      case TrackType.BoneTrack:
        return props.track.keyframes.map(keyframe => (
          <TimelineKeyframeView
            key={keyframe.uuid}
            trackType={props.track.type}
            keyframeUuid={keyframe.uuid}
            x={secToPx(keyframe.time)}
          />
        ));
      case TrackType.BlendShapeTrack:
        return props.track.keyframes.map(keyframe => (
          <TimelineKeyframeView
            key={keyframe.uuid}
            trackType={props.track.type}
            keyframeUuid={keyframe.uuid}
            x={secToPx(keyframe.time)}
          />
        ));
    }
  }, [props.track.keyframes, secToPx]);

  return (
    <div className="timeline-track">
      <div
        className={
          'timeline-track__first-column' + (props.oddRow ? '--odd' : '')
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
