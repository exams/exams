import React, {Component} from 'react';
import MultiChoiceInput from './MultiChoice.Input'
import MultiChoiceView from './MultiChoice.View'
import { addMultiChoice, cleanMultiChoice } from '../actions'
import { connect } from 'react-redux'

class MultiChoice extends Component{

    constructor(){
        super();
        this.state = {
            showView: false,
            newMultiChoice: null
        }
    }

    formatMultiChoice = (multiChoice) => {
        const newMultiChoice = {
            subject: multiChoice.subject,
            stem: multiChoice.stem,
            difficulty: multiChoice.difficulty,
            analysis: multiChoice.analysis,
            answer: multiChoice.answer,
            choiceItems: multiChoice.choiceItems,
            isReal: multiChoice.isReal
        }
        return newMultiChoice
    }

    handleSummit = (multiChoice) => {
        const newMultiChoice = this.formatMultiChoice(multiChoice);
        this.props.addMultiChoice(newMultiChoice);
        this.setState({
            showView: true,
            newMultiChoice: newMultiChoice
        })
    }

    handleAddNew= () => {
        this.props.cleanMultiChoice()
        this.setState({
            showView: false,
            newMultiChoice: null
        })
    }

    render() {
        const { multiChoice, status, me } = this.props
        const { showView, newMultiChoice } = this.state
        // 为了乐观更新,先渲染Post的数据, 后再渲染post返回的数据
        const multiChoiceData = multiChoice || newMultiChoice
        const subjects = me.subjects

        if (showView) {
            return(<MultiChoiceView status={status} subjects={subjects}  multiChoice={multiChoiceData} handleAddNew={this.handleAddNew} />)
        } else {
            return(<MultiChoiceInput subjects={subjects}  handleSummit={this.handleSummit} />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.records.status,
        multiChoice: state.records.multiChoice,
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    addMultiChoice: (multiChoice) => dispatch(addMultiChoice(multiChoice)),
    cleanMultiChoice: () => dispatch(cleanMultiChoice())
})

export default connect(mapStateToProps, mapDispatchToProps)(MultiChoice)
