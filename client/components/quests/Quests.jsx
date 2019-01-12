import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { List, Icon, Row, Col, Select } from 'antd';
import { listSubjects} from "../subjects/actions";
import { listQuestTypes, listSingleChoice, listMultiChoice, listJudge, listBlank, listQuestAnswer, listmixing } from "./actions";
import { FormattedMessage } from 'react-intl';
import SingleChoiceListView from "./SingleChoiceList.View";

const Option = Select.Option;
class Quests extends Component{

    constructor(){
        super();
        this.state = {
            subject: null,
            questType: 'singleChoice'
        }
    }

    componentDidMount() {
        this.props.listSubjects();
        this.props.listQuestTypes();
        this.props.listSingleChoice('Math');
    }

    getSubjectsChildren = () => {
        const { me } = this.props
        const subjects = me.subjects
        const childrenSubjects = [];
        subjects && subjects.map((item) => {
            childrenSubjects.push(<Option key={item._id}>{item.name}</Option>);
        })
        return childrenSubjects
    }

    getQuestTypesChildren = () => {
        const { questTypes } = this.props
        const childrenQuestTypes = [];
        questTypes && questTypes.map((item) => {
            childrenQuestTypes.push(<Option key={item.questType}><FormattedMessage id={item.questType} /></Option>);
        })
        return childrenQuestTypes
    }

    getQuestType = () => {
        const { questType } = this.state

        if ('singleChoice' === questType){
            const { singleChoices } = this.props
            return (singleChoices && <SingleChoiceListView singleChoices = {singleChoices} />)
        }
    }

    render() {
        const { questType } = this.state
        const { singleChoices } = this.props
        return (
            <div>
                <Row>
                    <Col span={8}>

                    </Col>
                    <Col span={8}>
                        <Select
                            style={{ width: '100%' }}
                        >
                            {this.getSubjectsChildren()}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Select
                            style={{ width: '100%' }}
                        >
                            {this.getQuestTypesChildren()}
                        </Select>
                    </Col>
                </Row>

                {
                    'singleChoice' === questType && singleChoices && <SingleChoiceListView singleChoices = {singleChoices} />
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        me: state.core.me,
        questTypes: state.quests.questTypes,
        singleChoices: state.quests.singleChoices,
        multiChoices: state.quests.multiChoices,
    }
}

const mapDispatchToProps = (dispatch) => ({
    listSubjects: () => dispatch(listSubjects()),
    listQuestTypes: () => dispatch(listQuestTypes()),
    listSingleChoice: (subject) => dispatch(listSingleChoice(subject))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quests));
