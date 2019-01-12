import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button, Tag } from 'antd';
import { addTemplate, listTemplate } from "./actions";
import { FormattedMessage } from 'react-intl';

class Templates extends Component{

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
            <div>
                <Row>
                    <Col span={6}>
                        <Button onClick={this.toggleAddUser} icon={"plus"}><FormattedMessage id="creatTemplate" /></Button>
                    </Col>
                    <Col span={18}>
                    </Col>
                </Row>

            </div>
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Templates));
