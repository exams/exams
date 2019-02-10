import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { listPapers, deletePaper } from "./actions";
import { connect } from 'react-redux'
import { List, Icon, Col, Popconfirm } from 'antd';
import { FormattedMessage, FormattedDate } from 'react-intl';

class Papers extends Component{
    componentDidMount() {
        this.props.listPapers()
    }

    delete = (paper, index) => {
        this.props.deletePaper(paper._id, index);
    }

    render() {
        const {papers} = this.props;
        return (
            <List
                itemLayout="horizontal"
                dataSource={papers}
                renderItem={(item, index) => (
                    <List.Item actions={[<a><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>,
                        <a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>,
                        <Popconfirm title={<FormattedMessage id="sureToDelete" />}
                                    onConfirm={() => {this.delete(item, index)}}
                                    okText={<FormattedMessage id="sure" />}
                                    cancelText={<FormattedMessage id="cancel" />}>
                            <a><Icon type={"delete"} /><FormattedMessage id="delete" /></a>
                        </Popconfirm>]}
                    >
                        <List.Item.Meta
                            title={<Link to={{
                                pathname: "/app/papers/create",
                                state: item
                            }}>{item.title}</Link>}
                        />
                        <Col span={6}><FormattedDate value={item.created} /></Col>
                        <Col span={4}>{item.subject}</Col>
                    </List.Item>
                )}
            />
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
    deletePaper: (paperId, index) => dispatch(deletePaper(paperId, index))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Papers));
