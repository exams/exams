import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button, Tag } from 'antd';
import { listTemplate, deleteTemplate } from "./actions";
import { FormattedMessage } from 'react-intl';
import TemplateCard from "./TemplateCard";

class Templates extends Component{

    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.props.listTemplate();
    }

    delete = (template) => {
        this.props.deleteTemplate(template);
    }

    render() {
        const { templates } = this.props
        console.log(templates)
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Button onClick={this.toggleAddUser} icon={"plus"}><FormattedMessage id="creatTemplate" /></Button>
                    </Col>
                    <Col span={18}>
                    </Col>
                </Row>
                {
                    templates && templates.map((item, index) => {
                        return(<TemplateCard template={item} key={index} delete={this.delete}/>)
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        me: state.core.me,
        templates: state.template.templates
    }
}

const mapDispatchToProps = (dispatch) => ({
    listTemplate: () => dispatch(listTemplate()),
    deleteTemplate: (template) => dispatch(deleteTemplate(template)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Templates));
