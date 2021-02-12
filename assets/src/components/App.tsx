import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Index from '../pages/Index/Index';
import Login from '../pages/Login/Login';
import { ClientRoutes } from '../services/clientRouteContants';

const App: React.FC = () => (
    <>
        <Router>
            <Switch>
                <Route component={Index} path={ClientRoutes.Index} />
                <Route component={Login} path={ClientRoutes.Login} />
                <Redirect to={ClientRoutes.Index} />
            </Switch>
        </Router>
    </>
);

export default App;
