import * as React from 'react';

export interface Timeline {
  startAtSec: number;
  setStartAtSec(value: number): void;
  endAtSec: number;
  setEndAtSec(value: number): void;
  durationSec: number;
  cursorSec: number;
  setCursorSec(value: number): void;
  selectedTrackUuid?: string;
  setSelectedTrackUuid(value: string): void;
  selectedKeyframeUuid?: string;
  setSelectedKeyframeUuid(value: string): void;
}

export const TimelineContext = React.createContext<Timeline>({
  startAtSec: 0,
  setStartAtSec: () => {},
  endAtSec: 1,
  setEndAtSec: () => {},
  durationSec: 1,
  cursorSec: 0,
  setCursorSec: () => {},
  setSelectedTrackUuid: () => {},
  setSelectedKeyframeUuid: () => {},
});

export function useTimeline(): Timeline {
  return React.useContext(TimelineContext);
}

export interface TimelineProviderProps {
  onRedirectCallback?(appState: any): void;
}

export const TimelineProvider: React.FC<TimelineProviderProps> = props => {
  const [startAtSec, setStartAtSec] = React.useState(0);
  const [endAtSec, setEndAtSec] = React.useState(5);

  const durationSec = React.useMemo(() => endAtSec - startAtSec, [
    startAtSec,
    endAtSec,
  ]);

  const [cursorSec, setCursorSec] = React.useState(0);

  const [selectedTrackUuid, setSelectedTrackUuid] = React.useState<string>();
  const [selectedKeyframeUuid, setSelectedKeyframeUuid] = React.useState<
    string
  >();

  return (
    <TimelineContext.Provider
      value={{
        startAtSec,
        setStartAtSec,
        endAtSec,
        setEndAtSec,
        durationSec,
        cursorSec,
        setCursorSec,
        selectedTrackUuid,
        setSelectedTrackUuid,
        selectedKeyframeUuid,
        setSelectedKeyframeUuid,
      }}
    >
      {props.children}
    </TimelineContext.Provider>
  );
};
