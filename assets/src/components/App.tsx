import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Index } from '../pages/Index/Index';
import { ClientRoutes } from '../services/clientRouteContants';

const App: React.FC = () => (
    <>
        <Router>
            <Switch>
                <Route component={Index} path={ClientRoutes.Index} />
                <Redirect to={ClientRoutes.Index} />
            </Switch>
        </Router>
    </>
);

export default App;
