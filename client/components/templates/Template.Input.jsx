import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button, Tag, Select, Input, Layout } from 'antd';
import { addTemplate } from "./actions";
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Form} from "antd/lib/index";

const Option = Select.Option;
const FormItem = Form.Item;
class TemplateInput extends Component{

    constructor(){
        super();
        this.state = {
            paparStructs: []
        }
    }

    componentDidMount = () => {

    }

    getSubjects = () => {
        const { me } = this.props
        const subjects = me.subjects;
        const childrenSubjects = [];
        subjects && subjects.map((item) => {
            childrenSubjects.push(<Option key={item._id}>{item.name}</Option>);
        })
        return childrenSubjects
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }

        return (
            <Layout>
                <Row>
                    <Col span={18}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="title" />}>
                                <Row>
                                    <Col>
                                        {getFieldDecorator('title', {
                                            rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                        })(
                                            <Input placeholder={this.props.intl.messages.titlePlaceholder}
                                                   style={{ width: '100%' }}
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="subject" />}>
                                <Row>
                                    <Col span={10}>
                                        {getFieldDecorator('subject', {
                                            rules: [{ required: true, message: this.props.intl.messages.subjectPlaceholder }],
                                        })(
                                            <Select
                                                placeholder={this.props.intl.messages.subjectPlaceholder}
                                                style={{ width: '100%' }}
                                            >
                                                {this.getSubjects()}
                                            </Select>
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                                <Row>
                                    <Col>
                                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                            <FormattedMessage id="submit"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={5}>
                        <Row>
                            <Button icon={"plus"} onClick={this.addSingleChoice} style={{width: '100%'}}>
                                <FormattedMessage id="addSingleChoice" />
                            </Button>
                        </Row>
                        <Row>
                            <Button icon={"plus"} onClick={this.addMultiChoice} style={{width: '100%'}}>
                                <FormattedMessage id="addMultiChoice" />
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

TemplateInput.propTypes = {
    intl: intlShape.isRequired
};

const mapStateToProps = (state) => {
    return {
        me: state.core.me
    }
}

const mapDispatchToProps = (dispatch) => ({
    addTemplate: (template) => dispatch(addTemplate(template))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(TemplateInput)));
