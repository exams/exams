import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { List, Icon, Layout } from 'antd';
import {addSubject, listSubjects} from "./actions";
import { FormattedMessage } from 'react-intl';
import ModalTagManager from './ModalTagManager'

class Subjects extends Component{

    constructor(){
        super();
        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.props.listSubjects()
    }

    openModal = () => {
        console.log(123)
        this.setState({
            visible: true
        })
    }

    onCancel = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { subjects, match } = this.props
        const { visible } = this.state
        return (
            <Layout>
                <List
                    itemLayout="horizontal"
                    dataSource={subjects}
                    renderItem={item => (
                        <List.Item actions={[<a onClick={this.openModal}><Icon type={"tags"} /> <FormattedMessage id="tagManagement" /></a>, <a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>, <a><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>]}>
                            <List.Item.Meta
                                title={<Link to={match.url + '/' + item.id}>{item.name}</Link>}
                                onClick={this.goDetail}
                            />
                            <span>{item.isDefault ? <FormattedMessage id="systemDefault" />: <FormattedMessage id="userDefinition" />}</span>
                        </List.Item>
                    )}
                />
                <ModalTagManager
                    title={<FormattedMessage id="tagManagement" />}
                    wrappedComponentRef={this.saveFormRef}
                    visible={visible}
                    ref={this.saveFormRef}
                    handleSave={this.handleSave}
                    onCancel={this.onCancel}
                />
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
