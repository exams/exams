import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/core/Login';
import App from './App';
import AnswerSheet from './components/papers/AnswerSheet'

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />        
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="/answersheet" component={AnswerSheet} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)