import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { Tabs, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import SingleChoice from "./questType/SingleChoice";
import MultiChoice from "./questType/MultiChoice";
import Judge from './questType/Judge';
import Blank from './questType/Blank'
import QuestAnswer from './questType/QuestAnswer'
import Mixing from './questType/Mixing'

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
                    <MultiChoice />
                </TabPane>
                <TabPane tab={<FormattedMessage id="judge" />} key="judge">
                    <Judge />
                </TabPane>
                <TabPane tab={<FormattedMessage id="blank" />} key="blank">
                    <Blank />
                </TabPane>
                <TabPane tab={<FormattedMessage id="questAnswer" />} key="questAnswer">
                    <QuestAnswer />
                </TabPane>
                <TabPane tab={<FormattedMessage id="mixing" />} key="mixing">
                    <Mixing />
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Records));
