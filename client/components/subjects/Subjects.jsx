import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { List, Icon, Row, Popconfirm, Button } from 'antd';
import {addSubject, listSubjects, deleteSubject} from "./actions";
import { FormattedMessage } from 'react-intl';
import ModalTagManager from './ModalTagManager'
import ModalSubjectCreator from './ModalSubjectCreator'

class Subjects extends Component{

    constructor(){
        super();
        this.state = {
            visible: false,
            createVisible: false,
            editSubject: null,
            shared: true
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

    openSharedModal = () => {
        this.setState({
            visible: true,
            editSubject: null,
            shared: true
        })
    }

    openCreateModal = () => {
        this.setState({
            createVisible: true
        })
    }

    onCancel = () => {
        this.setState({
            visible: false,
            createVisible: false,
            editSubject: null,
            shared: false
        })
    }

    handleCreate = (subject) => {
        this.props.addSubject(subject)
        this.setState({
            createVisible: false
        })
    }

    getTitle = () => {
        const { editSubject, shared } = this.state;
        if (shared)
            return (<FormattedMessage id="sharedTagManagement"/>)
        else
            return ([<FormattedMessage id="tagManagement"/>, ' - ' + editSubject.name])
    }

    render() {
        const { subjects } = this.props
        const { visible, editSubject, shared, createVisible } = this.state;

        return (
            <div>
                <Row>
                    <Button onClick={this.openCreateModal}><FormattedMessage id="createSubject"/></Button>
                    <Button onClick={this.openSharedModal}><FormattedMessage id="sharedTagManagement"/></Button>
                </Row>
                <List
                    itemLayout="horizontal"
                    dataSource={subjects}
                    renderItem={item => (
                        <List.Item actions={[<a onClick={() => {this.openModal(item);}}><Icon type={"tags"} /> <FormattedMessage id="tagManagement" /></a>,
                            <a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>,
                            <Popconfirm title={<FormattedMessage id="sureToDelete" />}
                                        onConfirm={() => {this.props.deleteSubject(item)}}
                                        okText={<FormattedMessage id="sure" />}
                                        cancelText={<FormattedMessage id="cancel" />}>
                                <a><Icon type={"delete"} /><FormattedMessage id="delete" /></a>
                            </Popconfirm>]}>
                            <List.Item.Meta
                                title={item.name}
                            />
                            <span>{item.isDefault ? <FormattedMessage id="systemDefault" />: <FormattedMessage id="userDefinition" />}</span>
                        </List.Item>
                    )}
                />
                {
                    visible &&
                    <ModalTagManager
                        title={this.getTitle()}
                        visible={visible}
                        subject={editSubject}
                        shared={shared}
                        onCancel={this.onCancel}
                    />
                }
                {
                    createVisible &&
                    <ModalSubjectCreator
                        visible={createVisible}
                        handleCreate={this.handleCreate}
                        onCancel={this.onCancel}
                    />
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
    listSubjects: () => dispatch(listSubjects()),
    addSubject: (subject) => dispatch(addSubject(subject)),
    deleteSubject: (subject) => dispatch(deleteSubject(subject))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subjects));
