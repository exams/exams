import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button } from 'antd';
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
                    <Col>
                        <Button onClick={this.toggleAddUser} icon={"plus"}><FormattedMessage id="addUser"/></Button>
                    </Col>
                </Row>
                {
                    showAddUser && (<Row>
                        <AddUser addUser={this.addUser} subjects={subjects}/>
                    </Row>)
                }
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
