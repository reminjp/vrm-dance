import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import SplitPane from 'react-split-pane';
import {
  HeaderView,
  InspectorView,
  SceneView,
  TimelineView,
} from './components';
import { AnimationProvider, TimelineProvider } from './contexts';
import './App.scss';

export const App: React.FC = () => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  return (
    <div className="app">
      <AnimationProvider>
        <TimelineProvider>
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={(w, h) => {
              setWidth(w || 0);
              setHeight(h || 0);
            }}
          />
          <div className="app__header">
            <HeaderView />
          </div>
          <div className="app__body">
            <SplitPane
              split="horizontal"
              defaultSize={20 * 16}
              minSize={10 * 16}
              maxSize={height - 10 * 16}
              primary="second"
            >
              <SplitPane
                split="vertical"
                defaultSize={20 * 16}
                minSize={10 * 16}
                maxSize={width - 10 * 16}
                primary="second"
              >
                <div className="app__scene">
                  <SceneView />
                </div>
                <div className="app__inspector">
                  <InspectorView />
                </div>
              </SplitPane>
              <div className="app__timeline">
                <TimelineView />
              </div>
            </SplitPane>
          </div>
        </TimelineProvider>
      </AnimationProvider>
    </div>
  );
};
