import React, {Component} from 'react';
import SingleChoiceInput from './SingleChoice.Input'
import SingleChoiceView from './SingleChoice.View'
import { addSingleChoice, cleanSingleChoice } from '../actions'
import { connect } from 'react-redux'

class SingleChoice extends Component{

    constructor(){
        super();
        this.state = {
            showView: false,
            newSingleChoice: null
        }
    }

    formatSingleChoice = (singleChoice) => {
        const newSingleChoice = {
            subject: singleChoice.subject,
            title: singleChoice.stem,
            difficulty: singleChoice.difficulty,
            analysis: singleChoice.analysis,
            answer: singleChoice.answer,
            choiceItems: singleChoice.choiceItems,
            isReal: singleChoice.isReal
        }
        return newSingleChoice
    }

    handleSummit = (singleChoice) => {
        const newSingleChoice = this.formatSingleChoice(singleChoice);
        this.props.addSingleChoice(newSingleChoice);
        this.setState({
            showView: true,
            newSingleChoice: newSingleChoice
        })
    }

    handleAddNew= () => {
        this.props.cleanSingleChoice()
        this.setState({
            showView: false,
            newSingleChoice: null
        })
    }

    render() {
        const { singleChoice, status, me } = this.props
        const { showView, newSingleChoice } = this.state
        // 为了乐观更新,先渲染Post的数据, 后再渲染post返回的数据
        const singleChoiceData = singleChoice || newSingleChoice
        const subjects = me.subjects

        if (showView) {
            return(<SingleChoiceView status={status} subjects={subjects} singleChoice={singleChoiceData} handleAddNew={this.handleAddNew} />)
        } else {

            return(<SingleChoiceInput subjects={subjects} handleSummit={this.handleSummit} />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.records.status,
        singleChoice: state.records.singleChoice,
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    addSingleChoice: (singleChoice) => dispatch(addSingleChoice(singleChoice)),
    cleanSingleChoice: () => dispatch(cleanSingleChoice())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleChoice)
