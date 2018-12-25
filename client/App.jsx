import React, { Component } from 'react';
import { Layout, notification } from 'antd';
import './style/index.less';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
import Routes from './routes';
import { getMe } from './components/core/action'
import LoadingArea from './components/LoadingArea'
import PropTypes from "prop-types";
import {switchLanguage} from "./components/core/IntlActions";

const { Content, Footer } = Layout;

class App extends Component {

    componentDidMount() {
        this.props.getMe();
    }

    render() {
        const { status, me, intl } = this.props
        if ('failed' === status) {
            const { error } = this.props
            if ('Network Error' === error.message || 'UnauthorizedError' === error.message ||
            error.response.status === 401) {
                this.context.router.history.push('/login');
            }
        }
        if ('completed' === status) {
            return (
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom user={ me } intl={ intl } switchLanguage={lang => this.props.switchLanguage(lang)} />
                    <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                        <Routes auth={ me } />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        React-Admin ©{new Date().getFullYear()} Created by 719480072@qq.com
                    </Footer>
                </Layout>
            );
        }

        return( <LoadingArea status={status} /> )
    }
}

const mapStateToProps = state => {
    return {
        status: state.me.status,
        me: state.me.me,
        error: state.me.error,
        intl: state.intl
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMe: () => dispatch(getMe()),
    switchLanguage: (values) => dispatch(switchLanguage(values))
})

App.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
