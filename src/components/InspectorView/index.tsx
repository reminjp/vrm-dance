import * as React from 'react';
import {
  TrackType,
  TrackChunkSize,
  useAnimation,
  useTimeline,
} from '../../contexts';
import { InspectorBoneView } from './InspectorBoneView';
import './index.scss';

export const InspectorView: React.FC = () => {
  const animation = useAnimation();
  const timeline = useTimeline();

  const track = React.useMemo(
    () => animation.tracks.find(t => t.uuid === timeline.selectedTrackUuid),
    [animation.tracks, timeline.selectedTrackUuid]
  );

  const { trackType, time, values } = React.useMemo(() => {
    if (!track) return {};

    const trackType = track.type;

    const keyframeIndex = track?.uuids.findIndex(
      uuid => uuid === timeline.selectedKeyframeUuid
    );

    if (keyframeIndex === -1) return { trackType };

    const chunkSize = TrackChunkSize[trackType];

    return {
      trackType,
      time: track.times[keyframeIndex],
      values: track.values.slice(
        keyframeIndex * chunkSize,
        (keyframeIndex + 1) * chunkSize
      ),
    };
  }, [track, timeline.selectedKeyframeUuid]);

  return (
    <div className="inspector">
      {trackType === TrackType.Bone && (
        <InspectorBoneView
          trackUuid={timeline.selectedTrackUuid}
          keyframeUuid={timeline.selectedKeyframeUuid}
          time={time}
          values={values}
        />
      )}
    </div>
  );
};
