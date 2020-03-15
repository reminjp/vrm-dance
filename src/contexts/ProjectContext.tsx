import * as React from 'react';
import { VRMSchema } from '@pixiv/three-vrm';
import { BoneTrack, Track } from '../models';

export interface Project {
  tracks: Track[];
  createKeyframe(trackName: string, timeSec: number): void;
  motionStartSec: number;
  setMotionStartSec(value: number): void;
  motionEndSec: number;
  setMotionEndSec(value: number): void;
  timelineStartSec: number;
  setTimelineStartSec(value: number): void;
  timelineEndSec: number;
  setTimelineEndSec(value: number): void;
  timelineCursorSec: number;
  setTimelineCursorSec(value: number): void;
}

export const ProjectContext = React.createContext<Project>({
  tracks: [],
  createKeyframe: () => {},
  motionStartSec: 0,
  setMotionStartSec: () => {},
  motionEndSec: 1,
  setMotionEndSec: () => {},
  timelineStartSec: 0,
  setTimelineStartSec: () => {},
  timelineEndSec: 1,
  setTimelineEndSec: () => {},
  timelineCursorSec: 0,
  setTimelineCursorSec: () => {},
});

export function useProject(): Project {
  return React.useContext(ProjectContext);
}

export interface ProjectProviderProps {
  onRedirectCallback?(appState: any): void;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = props => {
  const [tracks, setTracks] = React.useState<Track[]>(() => [
    ...Object.values(VRMSchema.HumanoidBoneName).map(e => new BoneTrack(e)),
  ]);

  const createKeyframe = React.useCallback(
    (trackName: string, timeSec: number) => {
      const track = tracks.find(e => trackName === e.name);
      if (!track) return;

      track.createKeyframe(timeSec);

      setTracks([...tracks]);
    },
    [tracks, setTracks]
  );

  const [motionStartSec, setMotionStartSec] = React.useState(0);
  const [motionEndSec, setMotionEndSec] = React.useState(10);

  const [timelineStartSec, setTimelineStartSec] = React.useState(0);
  const [timelineEndSec, setTimelineEndSec] = React.useState(5);
  const [timelineCursorSec, setTimelineCursorSec] = React.useState(0);

  return (
    <ProjectContext.Provider
      value={{
        tracks,
        createKeyframe,
        motionStartSec,
        setMotionStartSec,
        motionEndSec,
        setMotionEndSec,
        timelineStartSec,
        setTimelineStartSec,
        timelineEndSec,
        setTimelineEndSec,
        timelineCursorSec,
        setTimelineCursorSec,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
