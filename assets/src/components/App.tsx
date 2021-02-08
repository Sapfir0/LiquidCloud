import React, { lazy } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ClientRoutes } from '../services/clientRouteContants';

const Index = lazy(() => import('../pages/Index/Index'));
const Login = lazy(() => import('../pages/Login/Login'));

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
