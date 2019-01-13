import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button } from 'antd';
import { addTemplate } from "./actions";
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Form} from "antd/lib/index";

const FormItem = Form.Item;
class TemplateView extends Component{

    constructor(){
        super();
        this.state = {
            showAddUser: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>qwe</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    addTemplate: (template) => dispatch(addTemplate(template))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(TemplateView)));
