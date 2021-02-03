import '../css/app.css';

import 'phoenix_html';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';
import {Socket} from "phoenix"

let socket = new Socket("/socket")

socket.connect()
console.log("socketing");
// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("example", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })


// This code starts up the React app when it runs in a browser. It sets up the routing
// configuration and injects the app into a DOM element.
ReactDOM.render(<Root />, document.getElementById('react-app'));
