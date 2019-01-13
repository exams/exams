import React, {Component} from 'react';
import JudgeInput from './Judge.Input'
import JudgeView from './Judge.View'
import { addJudge, cleanJudge } from '../actions'
import { connect } from 'react-redux'

class Judge extends Component{

    constructor(){
        super();
        this.state = {
            showView: false,
            newJudge: null
        }
    }


    handleSummit = (judge) => {
        this.props.addJudge(judge);
        this.setState({
            showView: true,
            newJudge: judge
        })
    }

    handleAddNew= () => {
        this.props.cleanJudge()
        this.setState({
            showView: false,
            newJudge: null
        })
    }

    render() {
        const { judge, status, me } = this.props
        const { showView, newJudge } = this.state
        // 为了乐观更新,先渲染Post的数据, 后再渲染post返回的数据
        const judgeData = judge || newJudge
        const subjects = me.subjects

        if (showView) {
            return(<JudgeView status={status} subjects={subjects} judge={judgeData} handleAddNew={this.handleAddNew} />)
        } else {

            return(<JudgeInput subjects={subjects} handleSummit={this.handleSummit} />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.records.status,
        judge: state.records.judge,
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    addJudge: (judge) => dispatch(addJudge(judge)),
    cleanJudge: () => dispatch(cleanJudge())
})

export default connect(mapStateToProps, mapDispatchToProps)(Judge)
