import React, {Component} from 'react';
import MultiChoiceInput from './MultiChoice.Input'
import MultiChoiceView from './MultiChoice.View'
import { addSingleChoice, cleanSingleChoice } from '../actions'
import { connect } from 'react-redux'

class MultiChoice extends Component{

    constructor(){
        super();
        this.state = {
            showView: false,
            newSingleChoice: null
        }
    }

    formatSingleChoice = (singleChoice) => {
        const newSingleChoice = {
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
        const { singleChoice, status } = this.props
        const { showView, newSingleChoice } = this.state
        // 为了乐观更新,先渲染Post的数据, 后再渲染post返回的数据
        const singleChoiceData = singleChoice || newSingleChoice

        console.log(singleChoiceData)
        if (showView) {
            return(<MultiChoiceView status={status} singleChoice={singleChoiceData} handleAddNew={this.handleAddNew} />)
        } else {
            return(<MultiChoiceInput handleSummit={this.handleSummit}/>)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.records.status,
        singleChoice: state.records.singleChoice
    }
}

const mapDispatchToProps = (dispatch) => ({
    addSingleChoice: (singleChoice) => dispatch(addSingleChoice(singleChoice)),
    cleanSingleChoice: () => dispatch(cleanSingleChoice())
})

export default connect(mapStateToProps, mapDispatchToProps)(MultiChoice)
