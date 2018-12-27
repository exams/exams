import React, {Component} from 'react';
import SingleChoiceInput from './SingleChoiceInput'
import SingleChoiceView from './SingleChoiceView'
import { addSingleChoice } from '../actions'
import { connect } from 'react-redux';

class SingleChoice extends Component{

    state = {
        view: false
    }

    handleSummit = (silgleChoice) => {
        this.props.dispatch(addSingleChoice(silgleChoice));
    }

    render() {
        const { singleChoice } = this.props
        console.log(singleChoice);
        if (singleChoice) {
            return(<SingleChoiceView />)
        } else {
            return(<SingleChoiceInput handleSummit={this.handleSummit}/>)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        singleChoice: state.singleChoice
    }
}

export default connect((mapStateToProps))(SingleChoice)
