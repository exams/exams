import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { List, Icon, Layout, Collapse, Row, Col } from 'antd';
import {addSubject, listSubjects} from "./actions";
import { FormattedMessage } from 'react-intl';
import ModalTagManager from './ModalTagManager'

class Subjects extends Component{

    constructor(){
        super();
        this.state = {
            visible: false,
            editSubject: null
        }
    }

    componentDidMount() {
        this.props.listSubjects()
    }

    openModal = (subject) => {
        this.setState({
            visible: true,
            editSubject: subject
        })
    }

    onCancel = () => {
        this.setState({
            visible: false,
            editSubject: null
        })
    }



    render() {
        const { subjects } = this.props
        const { visible, editSubject } = this.state;

        return (
            <Layout>
                <List
                    itemLayout="horizontal"
                    dataSource={subjects}
                    renderItem={item => (
                        <List.Item actions={[<a onClick={() => {this.openModal(item);}}><Icon type={"tags"} /> <FormattedMessage id="tagManagement" /></a>, <a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>, <a><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>]}>
                            <List.Item.Meta
                                title={item.name}
                            />
                            <span>{item.isDefault ? <FormattedMessage id="systemDefault" />: <FormattedMessage id="userDefinition" />}</span>
                        </List.Item>
                    )}
                />

                {
                    visible && <ModalTagManager
                        title={[<FormattedMessage id="tagManagement"/>, ' - ' + editSubject.name]}
                        visible={visible}
                        subject={editSubject}
                        onCancel={this.onCancel}
                    />
                }
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects.subjects
    }
}

const mapDispatchToProps = (dispatch) => ({
    listSubjects: () => dispatch(listSubjects()),
    addSubject: (subject) => dispatch(addSubject(subject))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subjects));
