import '../css/app.css';

import 'phoenix_html';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from '../pages/Root/Root';
import {FileSystemChecker} from "./socket"
const fs = new FileSystemChecker()

ReactDOM.render(<Root />, document.getElementById('react-app'));
