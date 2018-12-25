import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const renderMenuItem = item => (    // item.route 菜单单独跳转的路由
    <Menu.Item
        key={item.route}
    >
        <Link to={item.route}>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text"><FormattedMessage id={item.key} /></span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = item => ( 
    <Menu.SubMenu
        key={item.route}
        title={
            <span>
                {item.icon && <Icon type={item.icon} />}
                <span className="nav-text"><FormattedMessage id={item.key} /></span>
            </span>
        }
    >
        {item.subs.map(item => renderMenuItem(item))}
    </Menu.SubMenu>
);

export default ({ menus, ...props }) => (
    <Menu {...props}>
        {menus && menus.map(item => 
            (item.visible !== false)&&(item.subs ? renderSubMenu(item) : renderMenuItem(item))
        )}
    </Menu>
);