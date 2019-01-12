import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { List, Icon, Row, Col, Select } from 'antd';
import { listSubjects} from "../subjects/actions";
import { listQuestTypes, listSingleChoice, listMultiChoice, listJudge, listBlank, listQuestAnswer, listmixing } from "./actions";
import { FormattedMessage } from 'react-intl';

const Option = Select.Option;
class Quests extends Component{

    constructor(){
        super();
        this.state = {
            subject: null,
            questType: null
        }
    }

    componentDidMount() {
        this.props.listSubjects();
        this.props.listQuestTypes();
        this.props.listSingleChoice('Math');
    }

    render() {
        const { subjects, questTypes, match } = this.props

        const childrenSubjects = [];
        subjects && subjects.map((item) => {
            childrenSubjects.push(<Option key={item._id}>{item.name}</Option>);
        })

        const childrenQuestTypes = [];
        questTypes && questTypes.map((item) => {
            childrenQuestTypes.push(<Option key={item.questType}><FormattedMessage id={item.questType} /></Option>);
        })

        const { questType } = this.state

        return (
            <div>
                <Row>
                    <Col span={8}>

                    </Col>
                    <Col span={8}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                        >
                            {childrenSubjects}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                        >
                            {childrenQuestTypes}
                        </Select>
                    </Col>
                </Row>
                
                <List
                    itemLayout="horizontal"
                    dataSource={subjects}
                    renderItem={item => (
                        <List.Item actions={[<a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>, <a><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>]}>
                            <List.Item.Meta
                                title={<Link to={match.url + '/' + item.id}>{item.name}</Link>}
                                onClick={this.goDetail}
                            />
                            <span>{item.isDefault ? <FormattedMessage id="systemDefault" />: <FormattedMessage id="userDefinition" />}</span>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log( state.quests.singleChoice)
    return {
        subjects: state.subjects.subjects,
        questTypes: state.quests.questTypes,
        singleChoice: state.quests.singleChoice,
        multiChoice: state.quests.multiChoice,
    }
}

const mapDispatchToProps = (dispatch) => ({
    listSubjects: () => dispatch(listSubjects()),
    listQuestTypes: () => dispatch(listQuestTypes()),
    listSingleChoice: (subject) => dispatch(listSingleChoice(subject))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quests));
