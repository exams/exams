import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button, Table, Divider, Tag, Input } from 'antd';
import { listUsers, addUser, cleanUser } from "./actions";
import { listSubjects } from "../subjects/actions";
import { FormattedMessage } from 'react-intl';
import AddUser from "./AddUser";

class Users extends Component{

    constructor(){
        super();
        this.state = {
            showAddUser: false
        }
    }

    componentDidMount() {
        this.props.listUsers()
        this.props.listSubjects()
    }

    toggleAddUser = () => {
        this.setState({
            showAddUser: !this.state.showAddUser
        })
    }

    addUser = (user) => {
        this.props.addUser(user);
        this.setState({
            showAddUser: false
        })
    }

    getTableColumns = () => {
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '角色',
            key: 'roles',
            dataIndex: 'roles',
            render: roles => (
                <span>{roles.map(role => <Tag color="blue" key={role}>{role}</Tag>)}</span>
            ),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;">Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">Delete</a>
                </span>
            ),
        }];
    }

    formatUsers = (users) => {
        if (!users)
            return
        console.log(users)

        const tableUsers = null;
        let tableUser = null;
        users.map(user => {
            tableUser.key = user.id;
            tableUser.name = user.username;
            tableUser.roles = user.roles;
        })
    }

    render() {
        const { users, match, subjects } = this.props;
        const { showAddUser } = this.state;
        const { user, status } = this.props;
        if (user != null || status === 'failed') {
            this.props.listUsers();
            this.props.cleanUser();
        }
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Button onClick={this.toggleAddUser} icon={"plus"}><FormattedMessage id="addUser" /></Button>
                    </Col>
                    <Col span={18}>
                    </Col>
                </Row>
                {
                    showAddUser && (<Row>
                        <AddUser addUser={this.addUser} subjects={subjects} />
                    </Row>)
                }
                {/*<Table columns={this.getTableColumns} dataSource={this.formatUsers(users)} />*/}
                <List
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={item => (
                        <List.Item actions={[<a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>, <a><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>]}>
                            <List.Item.Meta
                                title={<Link to={match.url + '/' + item.id}>{item.username}</Link>}
                                onClick={this.goDetail}
                            />
                            {item.roles}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        user: state.users.user,
        subjects: state.subjects.subjects,
        status: state.users.status
    }
}

const mapDispatchToProps = (dispatch) => ({
    listUsers: () => dispatch(listUsers()),
    addUser: (user) => dispatch(addUser(user)),
    listSubjects: () => dispatch(listSubjects()),
    cleanUser: () => dispatch(cleanUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
