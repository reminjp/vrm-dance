import * as React from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { App } from './App';
import './index.scss';

library.add(faPlay);

render(<App />, document.getElementById('root'));
