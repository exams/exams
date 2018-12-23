import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { getPapers } from "./action";
import { connect } from 'react-redux'
import { Tabs } from 'antd';
import { FormattedMessage } from 'react-intl';
import SingleChoice from "./questType/SingleChoice";

const TabPane = Tabs.TabPane;

class Records extends Component{
    componentDidMount() {
        // this.props.getPapers()
    }

    tabChange(key) {
        console.log(key);
    }

    render() {
        return (
            <Tabs defaultActiveKey="singleChoice" onChange={this.tabChange}>
                <TabPane tab={<FormattedMessage id="singleChoice" />} key="singleChoice">
                    <SingleChoice />
                </TabPane>
                <TabPane tab="多选题" key="multiChoice">Content of Tab multiChoice</TabPane>
                <TabPane tab="判断题" key="judge">Content of Tab judge</TabPane>
                <TabPane tab="填空题" key="blank">Content of Tab blank</TabPane>
                <TabPane tab="问答题" key="questAnswer">Content of Tab questAnswer</TabPane>
                <TabPane tab="组合题" key="mixing">Content of Tab mixing</TabPane>
            </Tabs>
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Records));
