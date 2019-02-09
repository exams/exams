import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd';
import { addUser } from "../actions";
import { listSubjects } from "../../subjects/actions";
import { FormattedMessage } from 'react-intl';
import AddUser from "../components/AddUser";

class UserAddContainer extends Component{

    constructor(){
        super();
        this.state = {
            showAddUser: false
        }
    }

    componentDidMount() {
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
        const { subjects } = this.props;
        const { showAddUser } = this.state;
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects.subjects
    }
}

const mapDispatchToProps = (dispatch) => ({
    addUser: (user) => dispatch(addUser(user)),
    listSubjects: () => dispatch(listSubjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAddContainer);
