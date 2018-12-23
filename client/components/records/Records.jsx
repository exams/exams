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
                <TabPane tab={<FormattedMessage id="multiChoice" />} key="multiChoice">
                    Content of Tab multiChoice
                </TabPane>
                <TabPane tab={<FormattedMessage id="judge" />} key="judge">
                    Content of Tab judge
                </TabPane>
                <TabPane tab={<FormattedMessage id="blank" />} key="blank">
                    Content of Tab blank
                </TabPane>
                <TabPane tab={<FormattedMessage id="questAnswer" />} key="questAnswer">
                    Content of Tab questAnswer
                </TabPane>
                <TabPane tab={<FormattedMessage id="mixing" />} key="mixing">
                    Content of Tab mixing
                </TabPane>
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

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Records));
