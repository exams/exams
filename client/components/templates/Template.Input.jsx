import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button, Tag, Select, Input, Layout, Form } from 'antd';
import { addTemplate } from "./actions";
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import ModalAddQuest from './ModalAddQuest'

const Option = Select.Option;
const FormItem = Form.Item;
class TemplateInput extends Component{

    constructor(){
        super();
        this.state = {
            visible: false,
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


    OpenModal = () => {
        this.setState({
            visible: true
        })
    }
    onCancel = () => {
        this.setState({
            visible: false
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }
        const { paparStructs, visible } = this.state
        return (
            <Layout>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="title" />}>
                        <Row>
                            <Col>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                })(
                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} />
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
                    {
                        paparStructs.length > 0 && <List
                            itemLayout="horizontal"
                            dataSource={paparStructs}
                            renderItem={item => (
                                <List.Item actions={[<a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>, <a><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>]}>
                                    <List.Item.Meta
                                        title={item.number}
                                    />
                                </List.Item>
                            )}
                        />
                    }
                    <Row>
                        <Col span={15} offset={6}>
                            <Button icon={"plus"} onClick={this.OpenModal} style={{width: '100%'}}>
                                <FormattedMessage id="addQuestType" />
                            </Button>
                        </Col>
                    </Row>
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
                <ModalAddQuest
                    title={<FormattedMessage id="addSubQuest" />}
                    wrappedComponentRef={this.saveFormRef}
                    visible={visible}
                    ref={this.saveFormRef}
                    handleSave={this.handleSave}
                    onCancel={this.onCancel}
                />
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
