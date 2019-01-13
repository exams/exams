import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Rate, Input, Checkbox, Radio, Button, Row, Col } from 'antd';
import {Select} from "antd/lib/index";

const RadioGroup = Radio.Group
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class MixingInput extends Component{

    componentDidMount() {
        this.props.form.setFieldsValue({difficulty: 3, isReal: false})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSummit(values)
            }
        });
    }

    getSubjects = () => {
        const { subjects } = this.props
        const childrenSubjects = [];
        subjects && subjects.map((item) => {
            childrenSubjects.push(<Option key={item._id}>{item.name}</Option>);
        })
        return childrenSubjects
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        const halfformItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        }
        const halfformItemLayoutSecond = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        }

        return(
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={12}>
                        <FormItem {...halfformItemLayout} label={<FormattedMessage id="subject" />}>
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
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...halfformItemLayoutSecond} label={<FormattedMessage id="difficulty" />}>
                            {getFieldDecorator('difficulty', {
                                rules: [{ required: true}],
                            })(
                                <Rate />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem {...formItemLayout} label={<FormattedMessage id="stem" />}>
                    <Row>
                        <Col span={20}>
                            {getFieldDecorator('stem', {
                                rules: [{ required: true, message: this.props.intl.messages.stemPlaceholder }],
                            })(
                                <TextArea placeholder={this.props.intl.messages.stemPlaceholder} autosize={{ minRows: 3}} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="answer" />}>
                    {getFieldDecorator('answer', {
                        rules: [{ required: true, message: this.props.intl.messages.answerPlaceholder }],
                    })(
                        <RadioGroup initialValue={"false"} buttonStyle="solid">
                            <Radio.Button value={true}><FormattedMessage id="right" /></Radio.Button>
                            <Radio.Button value={false}><FormattedMessage id="wrong" /></Radio.Button>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="analysis" />}>
                    <Row>
                        <Col span={20}>
                            {getFieldDecorator('analysis')(
                                <TextArea placeholder={this.props.intl.messages.analysisPlaceholder} autosize={{ minRows: 3}} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="isReal" />}>
                    <Row>
                        <Col span={10}>
                            {getFieldDecorator('isReal')(
                                <RadioGroup initialValue={"false"} buttonStyle="solid">
                                    <Radio.Button value={true}><FormattedMessage id="isRealTrue" /></Radio.Button>
                                    <Radio.Button value={false}><FormattedMessage id="isRealFalse" /></Radio.Button>
                                </RadioGroup>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="isRealDescription" />}>
                    <Row>
                        <Col span={10}>
                            {getFieldDecorator('description')(
                                <Input placeholder={this.props.intl.messages.descriptionPlaceholder}/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem wrapperCol={{ span: 15, offset: 4 }}>
                    <Row>
                        <Col span={20}>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                <FormattedMessage id="submit"/>
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        )
    }
}

MixingInput.propTypes = {
    intl: intlShape.isRequired
};

export default Form.create()(injectIntl(MixingInput))
