import React, {Component} from 'react';
import BlankInput from './Blank.Input'
import BlankView from './Blank.View'
import { addBlank, cleanBlank } from '../actions'
import { connect } from 'react-redux'

class Blank extends Component{

    constructor(){
        super();
        this.state = {
            showView: false,
            newBlank: null
        }
    }

    handleSummit = (blank) => {
        this.props.addBlank(blank);
        this.setState({
            showView: true,
            newBlank: blank
        })
    }

    handleAddNew= () => {
        this.props.cleanBlank()
        this.setState({
            showView: false,
            newBlank: null
        })
    }

    render() {
        const { blank, status, me } = this.props
        const { showView, newBlank } = this.state
        // 为了乐观更新,先渲染Post的数据, 后再渲染post返回的数据
        const blankData = blank || newBlank
        const subjects = me.subjects

        if (showView) {
            return(<BlankView status={status} subjects={subjects} blank={blankData} handleAddNew={this.handleAddNew} />)
        } else {
            return(<BlankInput subjects={subjects} handleSummit={this.handleSummit} />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.records.status,
        blank: state.records.blank,
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    addBlank: (blank) => dispatch(addBlank(blank)),
    cleanBlank: () => dispatch(cleanBlank())
})

export default connect(mapStateToProps, mapDispatchToProps)(Blank)
