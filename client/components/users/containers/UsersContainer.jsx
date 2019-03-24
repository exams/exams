import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Popconfirm, Badge, Divider, Table } from 'antd';
import { listUsers, deleteUser } from "../actions";
import { FormattedMessage } from 'react-intl';

class UsersContainer extends Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: <FormattedMessage id="username" />,
            dataIndex: 'username'
        }, {
            title: <FormattedMessage id="role" />,
            dataIndex: 'roles',
            render: roles => (
                <span>
            {roles.map(role => {
                if ('Administrator' === role)
                    return <Badge key={role} count={<FormattedMessage id={"administrator"}/>} style={{ backgroundColor: '#52c41a', margin: 3 }} />
                if ('admin' === role)
                    return <Badge key={role} count={<FormattedMessage id={"admin"}/>} style={{ backgroundColor: '#52c41a', margin: 3 }} />
                if ('user' === role)
                    return <Badge key={role} count={<FormattedMessage id={"teacher"}/>} style={{ backgroundColor: '#52c41a', margin: 3 }} />
            })}
        </span>
            ),
        },{
            title: <FormattedMessage id="subject" />,
            dataIndex: 'subjects',
            render: subjects => (
                <span>
      {subjects.map(subject => {
          return <Badge key={subject._id} count={subject.name} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', margin: 3 }} />;
      })}
    </span>
            ),
        }, {
            title: <FormattedMessage id="action" />,
            key: 'action',
            render: (text, record) => (
                <span>
                    <a><FormattedMessage id="edit" /></a>
                    <Divider type="vertical" />
                    <Popconfirm title={<FormattedMessage id="sureToDelete" />}
                                onConfirm={() => {this.props.deleteUser(record)}}
                                okText={<FormattedMessage id="sure" />}
                                cancelText={<FormattedMessage id="cancel" />}>
                                    <a><FormattedMessage id="delete" /></a>
                                </Popconfirm>
                </span>
            ),
        }];
    }

    componentDidMount() {
        this.props.listUsers();
    }

    render() {
        const { users} = this.props;
        return (
            <Table size={"middle"} columns={this.columns} dataSource={users} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users
    }
}

const mapDispatchToProps = (dispatch) => ({
    listUsers: () => dispatch(listUsers()),
    deleteUser: (user) => dispatch(deleteUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
