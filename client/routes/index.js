import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AllComponents from '../components/index';
import routesConfig from './config';

export default class CRouter extends Component {

    requireAuth = (role, component) => {
        const { me } = this.props;
        const { roles } = me.roles;
        if (!roles || !roles.includes(role)) return <Redirect to={'/login'} />;
        return component;
    };

    requireLogin = (component, role) => {
        const { me } = this.props;
        const { roles } = me.roles;
        if (process.env.NODE_ENV === 'production' && !roles) { // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        return role ? this.requireAuth(role, component) : component;
    };

    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key => 
                        routesConfig[key].map(r => {
                            const route = r => {
                                const Component = AllComponents[r.component];
                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact
                                        path={r.route || r.key}
                                        render={props => r.login ? 
                                            <Component {...props} />
                                            : this.requireLogin(<Component {...props} />, r.auth)}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}