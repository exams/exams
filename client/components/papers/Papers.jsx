import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { listPapers, deletePaper } from "./actions";
import { connect } from 'react-redux'
import { Popconfirm, Table } from 'antd';
import { FormattedMessage, FormattedDate } from 'react-intl';

class Papers extends Component{
    constructor(){
        super();
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

    render() {
        const {papers} = this.props;
        return (
            <Table size={"middle"} columns={this.columns} dataSource={papers} />
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
