import * as React from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStepBackward,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { App } from './App';
import './index.scss';

library.add(faStepBackward, faPause, faPlay);

render(<App />, document.getElementById('root'));
