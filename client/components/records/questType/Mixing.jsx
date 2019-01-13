import React, {Component} from 'react';
import MixingInut from './Mixing.Input'
import MixingView from './Mixing.View'
import { addMixing, cleanMixing } from '../actions'
import { connect } from 'react-redux'

class Mixing extends Component{

    constructor(){
        super();
        this.state = {
            showView: false,
            newMixing: null
        }
    }

    handleSummit = (mixing) => {
        this.props.addMixing(mixing);
        this.setState({
            showView: true,
            newMixing: mixing
        })
    }

    handleAddNew= () => {
        this.props.cleanMixing()
        this.setState({
            showView: false,
            newMixing: null
        })
    }

    render() {
        const { mixing, status, me } = this.props
        const { showView, newMixing } = this.state
        // 为了乐观更新,先渲染Post的数据, 后再渲染post返回的数据
        const mixingData = mixing || newMixing
        const subjects = me.subjects

        if (showView) {
            return(<MixingView status={status} subjects={subjects} mixing={mixingData} handleAddNew={this.handleAddNew} />)
        } else {
            return(<MixingInut subjects={subjects} handleSummit={this.handleSummit} />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.records.status,
        mixing: state.records.mixing,
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    addMixing: (mixing) => dispatch(addMixing(mixing)),
    cleanMixing: () => dispatch(cleanMixing())
})

export default connect(mapStateToProps, mapDispatchToProps)(Mixing)
