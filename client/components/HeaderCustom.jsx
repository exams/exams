import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import avater from '../style/imgs/b1.jpg';
import TopMenuContainer from './TopMenuContainer';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class HeaderCustom extends Component {

    menuClick = e => {
        e.key === 'logout' && this.logout();

    };
    logout = () => {
        this.props.logout()
    };

    render() {
        const { intl } = this.props
        return (
            <Header className="custom-theme" >
                <Row>
                    <Col span={18}>
                        <TopMenuContainer />
                    </Col>
                    <Col span={6}>
                        <Menu
                            mode="horizontal"
                            theme="dark"
                            style={{float: 'right', height:'60px', lineHeight: '60px' }}
                            onClick={this.menuClick}
                        >
                            <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                                <Menu.Item key="setting:1"><FormattedMessage id="hello" /> {this.props.user.username}</Menu.Item>
                                <Menu.Item key="setting:2">个人信息</Menu.Item>
                                {
                                    intl.enabledLanguages.map(lang => {
                                        return (intl.locale !== lang && <Menu.Item key={lang}><span onClick={() => this.props.switchLanguage(lang)}>
                                            <FormattedMessage id="language" />
                                        </span></Menu.Item>)
                                    })
                                }
                                <Menu.Item key="logout"><span onClick={this.logout}><FormattedMessage id="signOut" /></span></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default HeaderCustom;
