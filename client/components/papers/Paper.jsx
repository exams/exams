import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { createPaper } from "./actions";
import { connect } from 'react-redux'
import { List, Layout } from 'antd';

class Paper extends Component{
    componentDidMount() {
        const template = this.props.location.state;
        this.props.createPaper(template)
    }

    render() {
        const {paper} = this.props;
        console.log(paper)
        return (

            <Layout>
                { paper && <p>{paper.title}</p> }
                <span></span>
            </Layout>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        paper: state.papers.paper
    }
}

const mapDispatchToProps = (dispatch) => ({
    createPaper: (template) => dispatch(createPaper(template))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Paper));
