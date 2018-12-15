import React, { Component } from 'react';
import { Layout } from 'antd';
import './style/index.less';
import HeaderCustom from './components/HeaderCustom';
import { receiveData } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
const { Content, Footer } = Layout;

class App extends Component {

    componentWillMount() {
        const { receiveData } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && receiveData(user, 'auth');
        this.getClientWidth();
        window.onresize = () => {
            this.getClientWidth();
        }
    }

    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        const clientWidth = document.body.clientWidth;
        console.log(clientWidth);
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };

    render() {
        const { auth } = this.props;
        return (
            <Layout style={{flexDirection: 'column'}}>
                <HeaderCustom user={auth.data || {}} />
                <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                    <Routes auth={auth} />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    React-Admin ©{new Date().getFullYear()} Created by 719480072@qq.com
                </Footer>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { auth = {data: {}}, responsive = {data: {}} } = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
