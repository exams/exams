import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { getPapers } from "./action";
import { connect } from 'react-redux'
import LoadingArea from '../LoadingArea'
import { List, Button } from 'antd';

class Papers extends Component{
    componentDidMount() {
        this.props.getPapers()
    }

    render() {
        const { status, papers, match } = this.props

        if ('completed' === status) {
            return (
                <List
                    itemLayout="horizontal"
                    dataSource={papers}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<Link to={match.url + '/' + item.id}>{item.name}</Link>}
                                onClick={this.goDetail}
                            />
                        </List.Item>
                    )}
                />
            );
        }

        return( <LoadingArea status={status} /> )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.papers.status,
        papers: state.papers.papers
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPapers: () => dispatch(getPapers())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Papers));
