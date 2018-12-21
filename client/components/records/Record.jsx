import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux'

class Record extends Component{
    componentDidMount() {

    }
    render() {
        const { match } = this.props
        return(
            <div>
                <p>test</p>
                <p>{match.params.id}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Record));
