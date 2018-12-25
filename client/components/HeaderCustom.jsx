import React, { Component } from 'react';
import { Menu, Layout, Button } from 'antd';
import avater from '../style/imgs/b1.jpg';
import TopMenuContainer from './TopMenuContainer';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {

    menuClick = e => {
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('super_exams_token');
        this.props.history.push('/login')
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
                            {
                                intl.enabledLanguages.map(lang => {
                                    return (intl.locale !== lang && <Button size={"small"} key={lang} onClick={() => this.props.switchLanguage(lang)}>
                                        <FormattedMessage id="language" />
                                    </Button>)
                                })
                            }
                            <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                                <MenuItemGroup title="用户中心">
                                    <Menu.Item key="setting:1">你好 - {this.props.user.username}</Menu.Item>
                                    <Menu.Item key="setting:2">个人信息</Menu.Item>
                                    <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}

HeaderCustom.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default withRouter(HeaderCustom);
