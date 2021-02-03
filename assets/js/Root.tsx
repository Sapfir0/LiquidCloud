import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages';
import CounterPage from './pages/counter';
import FetchDataPage from './pages/fetch-data';


// var socket=io.connect("localhost:4000");


const Root: React.FC = () => (
  <>
    <Header />

    
  </>
);

export default Root;
