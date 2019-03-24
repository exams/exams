import React, {Component} from 'react';
import {withRouter, Link } from "react-router-dom";
import { listPapers, deletePaper } from "./actions";
import { connect } from 'react-redux'
import { Popconfirm, Table, Divider } from 'antd';
import { FormattedMessage, FormattedDate } from 'react-intl';
import ModalAnswerSheetCreator from './components/ModalAnswerSheetCreator'

class Papers extends Component{
    constructor(){
        super();
        this.state = {
            createAnswerSheetVisible: false,
        }
        this.columns = [{
            title: <FormattedMessage id="title" />,
            render: (text, record) => (<Link to={{
                pathname: "/app/papers/create",
                state: record
            }}>{record.title}</Link>)
        }, {
            title: <FormattedMessage id="subject" />,
            dataIndex: 'subject'
        },{
            title: <FormattedMessage id="createTime" />,
            render: (text, record) => (<FormattedDate value={record.created} />)
        },{
            title: <FormattedMessage id="action" />,
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => {this.openAnswerSheetBox(record)}}><FormattedMessage id="createAnswerSheet" /></a>
                    <Divider type="vertical" />
                    <Popconfirm title={<FormattedMessage id="sureToDelete" />}
                                onConfirm={() => {this.delete(record)}}
                                okText={<FormattedMessage id="sure" />}
                                cancelText={<FormattedMessage id="cancel" />}>
                                    <a><FormattedMessage id="delete" /></a>
                                </Popconfirm>
                </span>
            ),
        }];
    }

    componentDidMount() {
        this.props.listPapers()
    }

    delete = (paper, index) => {
        this.props.deletePaper(paper._id, index);
    }

    openAnswerSheetBox = (paper) => {
        this.setState({createAnswerSheetVisible: true})
    }

    onCancel = () => {
        this.setState({
            createAnswerSheetVisible: false
        })
    }

    handleCreate = (createPaper) => {
        this.setState({
            createAnswerSheetVisible: false
        })

        const path = {
            pathname:'/answersheet',
            state: createPaper
        }
        this.props.history.push(path);
    }

    render() {
        const {papers} = this.props;
        const { createAnswerSheetVisible } = this.state;
        return (
            <div>
                <Table size={"middle"} columns={this.columns} dataSource={papers} />
                {
                    createAnswerSheetVisible &&
                    <ModalAnswerSheetCreator
                        visible={createAnswerSheetVisible}
                        handleCreate={this.handleCreate}
                        onCancel={this.onCancel}
                    />

                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        papers: state.papers.papers
    }
}

const mapDispatchToProps = (dispatch) => ({
    listPapers: () => dispatch(listPapers()),
    deletePaper: (paperId) => dispatch(deletePaper(paperId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Papers));
