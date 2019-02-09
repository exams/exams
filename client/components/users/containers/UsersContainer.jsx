import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Col, Popconfirm, List, Icon, Badge } from 'antd';
import { listUsers, deleteUser } from "../actions";
import { FormattedMessage } from 'react-intl';

class UsersContainer extends Component {

    componentDidMount() {
        this.props.listUsers();
    }

    getRolesTags = (roles) => {
        const tags = [];
        for (var i = 0; i < roles.length; i++){
            if ('Administrator' === roles[i])
                tags.push( <Badge key={roles[i]} count={<FormattedMessage id={"administrator"}/>} style={{ backgroundColor: '#52c41a', margin: 3 }} />)
            if ('admin' === roles[i])
                tags.push(<Badge key={roles[i]} count={<FormattedMessage id={"admin"}/>} style={{ backgroundColor: '#52c41a', margin: 3 }} />)
            if ('user' === roles[i])
                tags.push(<Badge key={roles[i]} count={<FormattedMessage id={"teacher"}/>} style={{ backgroundColor: '#52c41a', margin: 3 }} />)
        }
        return tags
    }

    render() {
        const { users} = this.props;
        return (
            <List
                itemLayout="horizontal"
                dataSource={users}
                renderItem={item => (
                    <List.Item actions={[<a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>,
                        <Popconfirm title={<FormattedMessage id="sureToDelete" />}
                                    onConfirm={() => {this.props.deleteUser(item)}}
                                    okText={<FormattedMessage id="sure" />}
                                    cancelText={<FormattedMessage id="cancel" />}>
                            <a><Icon type={"delete"} /><FormattedMessage id="delete" /></a>
                        </Popconfirm>
                    ]}
                    >
                        <List.Item.Meta
                            title={item.username}
                        />
                        <Col span={4}>
                            {this.getRolesTags(item.roles)}
                        </Col>
                        <Col span={12}>
                            {
                                item.subjects && item.subjects.map((subject) => {
                                    return (<Badge key={subject._id} count={subject.name} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', margin: 3 }} />)
                                })
                            }
                        </Col>
                    </List.Item>
                )}
            />
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
