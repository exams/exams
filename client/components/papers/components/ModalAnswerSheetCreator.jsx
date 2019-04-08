import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Modal, Form, Radio, Input, Select, Row, Col} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class ModalAnswerSheetCreator extends React.Component {

    handleSave = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const answerSheet = {
                    title: values.title,
                    paperSize: values.paperSize,
                    sheetLayout: values.sheetLayout,
                    identifierCode: values.identifierCode,
                    identifierCodeLength: values.identifierCodeLength,
                    columns: values.columns,
                    identifierInfo: values.identifierInfo
                }
                this.props.handleCreate(answerSheet);
            }
        });
    }

    handlePaperSizeChange = (e) => {
        this.props.form.setFieldsValue({
            columns: e.target.value === 'A4' ? 1 : 2
        });
    }

    render() {
        const { paper } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const sheetTitle = paper.title + this.props.intl.messages.answerSheet;

        return (
            <Modal
                width={900}
                title={<FormattedMessage id="createAnswerSheet" />}
                visible={this.props.visible}
                onOk={this.handleSave}
                okText={<FormattedMessage id={"sure"} />}
                cancelText={<FormattedMessage id={"cancel"} />}
                onCancel={this.props.onCancel}
            >
                <p><span className="ant-form-text"><FormattedMessage id="printTips" /></span></p>
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="title" />}>
                                {getFieldDecorator('title', {
                                    initialValue: sheetTitle,
                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                })(
                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="paperSize" />}>
                                {getFieldDecorator('paperSize', {
                                    initialValue: 'A4',
                                    rules: [{ required: true}],
                                })(
                                    <RadioGroup onChange={this.handlePaperSizeChange}>
                                        <Radio value={"A4"}>A4</Radio>
                                        <Radio value={"A3"}>A3</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="sheetLayout" />}>
                                {getFieldDecorator('sheetLayout', {
                                    initialValue: 'vertical',
                                    rules: [{ required: true}],
                                })(
                                    <RadioGroup>
                                        <Radio value={"vertical"}><FormattedMessage id="vertical" /></Radio>
                                        <Radio value={"horizon"}><FormattedMessage id="horizon" /></Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="columns" />}>
                                {getFieldDecorator('columns', {
                                    initialValue: 1,
                                    rules: [{ required: true}],
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>1 <FormattedMessage id="column" /></Radio>
                                        <Radio value={2}>2 <FormattedMessage id="column" /></Radio>
                                        <Radio value={3}>3 <FormattedMessage id="column" /></Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="identifierCode" />}>
                                {getFieldDecorator('identifierCode', {
                                    initialValue: 'admissionNumber',
                                    rules: [{ required: true}],
                                })(
                                    <RadioGroup>
                                        <Radio value={"admissionNumber"}><FormattedMessage id="admissionNumber" /></Radio>
                                        <Radio value={"studentNumber"}><FormattedMessage id="studentNumber" /></Radio>
                                        <Radio value={"barCode"}><FormattedMessage id="barCode" /></Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="identifierCodeLength" />}>
                                {getFieldDecorator('identifierCodeLength', {
                                    initialValue: '6',
                                    rules: [{ required: true}],
                                })(
                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem  {...{
                                labelCol: { span: 3 },
                                wrapperCol: { span: 16 },
                            }} label={<FormattedMessage id="identifierInfo" />}>
                                {getFieldDecorator('identifierInfo', {
                                    rules: [{ required: true}],
                                })(
                                    <Select
                                        mode="tags"
                                        maxTagCount={4}
                                        allowClear={true}
                                        style={{ width: '100%' }}
                                        placeholder={this.props.intl.messages.identifierInfoPlaceholder}
                                    >
                                        <Select.Option key={this.props.intl.messages.name}><FormattedMessage id="name" /></Select.Option>
                                        <Select.Option key={this.props.intl.messages.school}><FormattedMessage id="school" /></Select.Option>
                                        <Select.Option key={this.props.intl.messages.subject}><FormattedMessage id="subject" /></Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(injectIntl(ModalAnswerSheetCreator))