import * as React from 'react';
import { render } from 'react-dom';
import { EnvironmentProvider, ProjectProvider } from './contexts';
import { App } from './App';
import './index.scss';

render(
  <EnvironmentProvider>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </EnvironmentProvider>,
  document.getElementById('root')
);
