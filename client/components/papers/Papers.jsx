import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { listPapers, deletePaper } from "./actions";
import { connect } from 'react-redux'
import { List, Icon, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

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
                        <a onClick={() => {this.delete(item, index)}}><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>]}
                    >
                        <List.Item.Meta
                            title={<Link to={{
                                pathname: "/app/papers/create",
                                state: item
                            }}>{item.title}</Link>}
                        />
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
