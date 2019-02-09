import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Select, Button } from 'antd';
import { listQuestTypes} from "../actions";
import { FormattedMessage } from 'react-intl';

const Option = Select.Option;
class QuestsFilterContainer extends Component{

    componentDidMount() {
        this.props.listQuestTypes();
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

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Link to={'/app/records'} key="create">
                            <Button><FormattedMessage id="recordQuests"/></Button>
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Select style={{ width: 220 }}>
                            {this.getSubjectsChildren()}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select style={{ width: 220 }}>
                            {this.getQuestTypesChildren()}
                        </Select>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        me: state.core.me,
        questTypes: state.quests.questTypes
    }
}

const mapDispatchToProps = (dispatch) => ({
    listQuestTypes: () => dispatch(listQuestTypes())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestsFilterContainer);
