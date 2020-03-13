import * as React from 'react';
import SplitPane from 'react-split-pane';
import {
  HeaderView,
  InspectorView,
  SceneView,
  TimelineView,
} from './components';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__header">
        <HeaderView />
      </div>
      <div className="app__body">
        <SplitPane
          split="horizontal"
          defaultSize={20 * 16}
          minSize={10 * 16}
          primary="second"
        >
          <SplitPane
            split="vertical"
            defaultSize={20 * 16}
            minSize={10 * 16}
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
    </div>
  );
};
