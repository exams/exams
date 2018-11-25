import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux'

class Paper extends Component{
    componentDidMount() {

    }
    render() {
        return( <div>test</div> )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Paper));
