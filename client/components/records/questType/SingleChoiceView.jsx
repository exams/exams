import React, {Component} from 'react';
import {getSingleChoice} from "../reducer";

class SingleChoiceView extends Component{

    render() {
        return(
            <div>
                <p>test</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        singleChoice: getSingleChoice(state)
    }
}

export default SingleChoiceView
