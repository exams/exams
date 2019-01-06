import React, { Component } from 'react';
import { Layout } from 'antd';
import './style/index.less';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
import Routes from './routes';
import { getMe, cleanMe } from './components/core/actions'
import LoadingArea from './components/LoadingArea'
import PropTypes from "prop-types";
import {switchLanguage} from "./components/core/IntlActions";

const { Content, Footer } = Layout;

class App extends Component {

    componentWillUpdate() {
        const { status } = this.props
        if ('error' === status) {
            const { error } = this.props
            if ('Network Error' === error.message || 'UnauthorizedError' === error.message ||
                error.response.status === 401) {
                this.context.router.history.push('/login');
            }
        }
    }

    componentDidMount() {
        this.props.getMe();
    }

    render() {
        const { status, me, intl } = this.props
        if (me) {
            return (
                <Layout>
                    <HeaderCustom user={ me } intl={ intl } cleanMe={this.props.cleanMe} switchLanguage={lang => this.props.switchLanguage(lang)} />
                    <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                        <Routes auth={ me } />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>

                    </Footer>
                </Layout>
            );
        }

        return( <LoadingArea status={status} /> )
    }
}

const mapStateToProps = state => {
    console.log(state.core)
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
    switchLanguage: (values) => dispatch(switchLanguage(values))
})

App.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
