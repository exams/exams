import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { getPaperTemplates } from "./action";
import { connect } from 'react-redux'
import { TemplateCard } from './TemplateCard'
import LoadingArea from '../LoadingArea'

class PaperTemplate extends Component{
    componentDidMount() {
        this.props.getPaperTemplates()
    }
    render() {
        const { status, templates } = this.props

        if ('completed' === status) {
            return (
                templates.map((template, key) => {
                    return (
                        <TemplateCard template={template} key={key}/>
                    )
                })
            );
        }

        return( <LoadingArea status={status}/> )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.paperTemplates.status,
        templates: state.paperTemplates.templates
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPaperTemplates: () => dispatch(getPaperTemplates())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaperTemplate));
