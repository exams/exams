import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button, Tag } from 'antd';
import { addTemplate, listTemplate } from "./actions";
import TemplateInput from './Template.Input'
import TemplateView from './Template.View'

class Template extends Component{

    constructor(){
        super();
        this.state = {
            showView: false
        }
    }

    componentDidMount() {

    }


    render() {
        const { showView } = this.state

        if (showView) {
            return(<TemplateView />)
        } else {
            return(<TemplateInput />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    listTemplate: () => dispatch(listTemplate()),
    addTemplate: (template) => dispatch(addTemplate(template))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Template));
