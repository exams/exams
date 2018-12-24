import React, {Component} from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Slider, Input, Radio , Button } from 'antd';
import { addSingleChoice } from '../actions'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class SingleChoiceInput extends Component{

    state = {
        choiceNum: 4
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const choiceItems = [];
                for (var i = 1; i <= this.state.choiceNum; i++){
                    const label = i.toString()
                    const obj = {}
                    obj[label] = values[i]
                    choiceItems.push(obj)
                }
                values.choiceItems = choiceItems;
                this.props.dispatch(addSingleChoice(values))
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }

        const radioStyle = {
            display: 'block',
            height: '100px',
            lineHeight: '100px',
            width: '600px'
        };

        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label={<FormattedMessage id="difficulty" />}>
                    {getFieldDecorator('difficulty')(
                        <RadioGroup buttonStyle={"solid"}>
                            <Radio.Button value={1}>1</Radio.Button>
                            <Radio.Button value={2}>2</Radio.Button>
                            <Radio.Button value={3}>3</Radio.Button>
                            <Radio.Button value={4}>4</Radio.Button>
                            <Radio.Button value={5}>5</Radio.Button>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="stem" />}>
                    {getFieldDecorator('stem', {
                        rules: [{ required: true, message: this.props.intl.messages.stemPlaceholder }],
                    })(
                        <TextArea placeholder={this.props.intl.messages.stemPlaceholder} autosize={{ minRows: 3}} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="choiceItem" />}>
                    {getFieldDecorator('answer')(
                        <RadioGroup>
                            <Radio value={1} style={radioStyle}>
                                {getFieldDecorator('1', {
                                    rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                })(
                                    <TextArea placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                            <Radio value={2} style={radioStyle}>
                                {getFieldDecorator('2', {
                                    rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                })(
                                    <TextArea placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                                )}</Radio>
                            <Radio value={3} style={radioStyle}>
                                {getFieldDecorator('3', {
                                    rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                })(
                                    <TextArea placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                            <Radio value={4} style={radioStyle}>
                                {getFieldDecorator('4', {
                                    rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                })(
                                    <TextArea placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="analysis" />}>
                    {getFieldDecorator('analysis', {
                        rules: [{ required: true, message: this.props.intl.messages.analysisPlaceholder }],
                    })(
                        <TextArea placeholder={this.props.intl.messages.analysisPlaceholder} autosize={{ minRows: 3}} />
                    )}
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                        <FormattedMessage id="submit" htmlType="submit"/>
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

SingleChoiceInput.propTypes = {
    intl: intlShape.isRequired
};

export default connect()(Form.create()(injectIntl(SingleChoiceInput)))
