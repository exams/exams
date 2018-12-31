import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button } from 'antd';
import { listUsers, addUser } from "./actions";
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
    }

    toggleAddUser = () => {
        this.setState({
            showAddUser: !this.state.showAddUser
        })
    }

    addUser = () => {
        this.props.addUser();
    }

    render() {
        const { users, match } = this.props

        return (
            <div>
                <Row>
                    <Col>
                        <Button onClick={this.toggleAddUser} icon={"plus"}><FormattedMessage id="addUser"/></Button>
                    </Col>
                </Row>
                <Row>
                    <AddUser addUser={this.addUser}/>
                </Row>
                <List
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={item => (
                        <List.Item actions={[<a><Icon type={"edit"}/> <FormattedMessage id="edit"/></a>, <a><Icon type={"delete"}/> <FormattedMessage id="delete"/></a>]}>
                            <List.Item.Meta
                                title={<Link to={match.url + '/' + item.id}>{item.username}</Link>}
                                onClick={this.goDetail}
                            />
                        </List.Item>
                    )}
                />
            </div>
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
    addUser: (user) => dispatch(addUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
