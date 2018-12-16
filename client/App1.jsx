import React, { Component } from 'react';
import { Layout } from 'antd';
import './style/index.less';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
import Routes from './routes';
import { getMe } from './components/core/action'
import LoadingArea from './components/LoadingArea'

const { Content, Footer } = Layout;

class App extends Component {

    componentDidMount() {
        this.props.getMe();
    }

    render() {
        const { status, me } = this.props
        if ('completed' === status) {
            return (
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom user={ me } />
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
        me: state.me.me
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMe: () => dispatch(getMe())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
