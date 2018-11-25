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
        const { status, papers } = this.props

        if ('completed' === status) {
            return (
                <List
                    itemLayout="horizontal"
                    dataSource={papers}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<Link to="/app/paper">{item.name}</Link>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
