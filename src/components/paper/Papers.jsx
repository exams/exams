import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { getPapers } from "./action";
import { connect } from 'react-redux'
import LoadingArea from '../LoadingArea'

class Papers extends Component{
    componentDidMount() {
        this.props.getPapers()
    }
    render() {
        const { status, papers } = this.props

        console.log(papers);
        return (
            <LoadingArea status={status}>
                {
                    () => (
                        papers.map((template, key) => {
                            return (
                                <div>1</div>
                            )
                        })
                    )
                }
            </LoadingArea>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.papers.status,
        papers: state.papers.papers
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPapers: () => dispatch(getPapers())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Papers));
