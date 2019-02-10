import React, { Component } from 'react';
import { Layout } from 'antd';
import './style/index.less';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
import Routes from './routes';
import { getMe, cleanMe, cleanAuthenticate } from './components/core/actions'
import LoadingArea from './components/LoadingArea'
import PropTypes from "prop-types";
import {switchLanguage} from "./components/core/IntlActions";

const { Content, Footer } = Layout;

class App extends Component {

    componentDidMount() {
        this.props.getMe();
    }

    logout = () => {
        this.props.cleanAuthenticate();
        this.props.cleanMe();
        localStorage.removeItem('super_exams_token');
        this.props.history.push('/login')
    }

    render() {
        const { status, intl, me, error } = this.props
        if (status === 'error' || error) {
            if ('Network Error' === error.message || 'UnauthorizedError' === error.message ||
                error.response.status === 401) {
                this.context.router.history.push('/login');
            }
        }

        if (me) {
            return (
                <div style={{height: "inherit"}}>
                    <HeaderCustom user={ me } intl={ intl } logout={this.logout} switchLanguage={lang => this.props.switchLanguage(lang)} />
                    <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0', height: "inherit" }}>
                        <Routes auth={ me } />
                    </Content>
                </div>
            );
        }

        return( <LoadingArea status={status} /> )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.core.status,
        me: state.core.me,
        error: state.core.error,
        intl: state.intl
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMe: () => dispatch(getMe()),
    cleanMe: () => dispatch(cleanMe()),
    cleanAuthenticate: () => dispatch(cleanAuthenticate()),
    switchLanguage: (values) => dispatch(switchLanguage(values))
})

App.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
