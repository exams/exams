import React, {Component} from 'react';
import SingleChoiceInput from './SingleChoiceInput'
import SingleChoiceView from './SingleChoiceView'

class SingleChoice extends Component{

    state = {
        view: false
    }

    render() {
        const { view } = this.props
        if (view) {
            return(<SingleChoiceView />)
        } else {
            return(<SingleChoiceInput />)
        }
    }
}

export default SingleChoice
