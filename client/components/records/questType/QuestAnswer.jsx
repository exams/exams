import React, {Component} from 'react';
import QuestAnswerInput from './QuestAnswer.Input'
import QuestAnswerView from './QuestAnswer.View'
import { addQuestAnswer, cleanQuestAnswer } from '../actions'
import { connect } from 'react-redux'

class QuestAnswer extends Component{

    constructor(){
        super();
        this.state = {
            showView: false,
            newQuestAnswer: null
        }
    }

    handleSummit = (questAnswer) => {
        this.props.addQuestAnswer(questAnswer);
        this.setState({
            showView: true,
            newQuestAnswer: questAnswer
        })
    }

    handleAddNew= () => {
        this.props.cleanQuestAnswer()
        this.setState({
            showView: false,
            newQuestAnswer: null
        })
    }

    render() {
        const { questAnswer, status, me } = this.props
        const { showView, newQuestAnswer } = this.state
        // 为了乐观更新,先渲染Post的数据, 后再渲染post返回的数据
        const questAnswerData = questAnswer || newQuestAnswer
        const subjects = me.subjects

        if (showView) {
            return(<QuestAnswerView status={status} subjects={subjects} questAnswer={questAnswerData} handleAddNew={this.handleAddNew} />)
        } else {
            return(<QuestAnswerInput subjects={subjects} handleSummit={this.handleSummit} />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.records.status,
        questAnswer: state.records.questAnswer,
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    addQuestAnswer: (questAnswer) => dispatch(addQuestAnswer(questAnswer)),
    cleanQuestAnswer: () => dispatch(cleanQuestAnswer())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestAnswer)
