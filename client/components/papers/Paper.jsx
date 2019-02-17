import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { createPaper } from "./actions";
import { connect } from 'react-redux'
import { Card } from 'antd';
import { FormattedMessage } from 'react-intl';
import QuestionSetHeader from './components/QuestionSetHeader'
import QuestionSetView from './components/QuestionSetView'

class Paper extends Component{
    componentDidMount() {
        const template = this.props.location.state;
        console.log(template)
        this.props.createPaper(template)
    }

    render() {
        const {paper} = this.props;
        if (paper)
            return (
                <Card>
                    <p className={"text-center"} style={{fontSize: '20px'}}>{paper.title}</p>
                    {
                        paper.questions.map((item, questionSetIndex) => {
                            return(
                                <div key={questionSetIndex}>
                                    <QuestionSetHeader QuestionSet={item} questionSetIndex={questionSetIndex} />
                                    <QuestionSetView QuestionSet={item} />
                                </div>)
                        })
                    }
                </Card>
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
