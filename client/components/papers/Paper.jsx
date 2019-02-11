import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { createPaper } from "./actions";
import { connect } from 'react-redux'
import { List, Layout } from 'antd';
import { FormattedMessage } from 'react-intl';
import QuestionSetHeader from './components/QuestionSetHeader'
import QuestionSetView from './components/QuestionSetView'

class Paper extends Component{
    componentDidMount() {
        const template = this.props.location.state;
        this.props.createPaper(template)
    }

    render() {
        const {paper} = this.props;
        console.log(paper)
        if (paper)
            return (
                <div>
                    <p className={"text-center"}>{paper.title}</p>
                    {
                        paper.questions.map((item, questionSetIndex) => {
                            return(
                                <div>
                                    <QuestionSetHeader QuestionSet={item} questionSetIndex={questionSetIndex} />
                                    <QuestionSetView QuestionSet={item} />
                                </div>)
                        })
                    }
                </div>
            )
        else
            return (<p><FormattedMessage id={"createPaperTips"} /></p>)
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
