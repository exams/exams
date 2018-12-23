import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Slider, Input, Radio , Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { addSingleChoice } from '../actions'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class SingleChoiceInput extends Component{

    handleSubmit(e) {
        e.preventDefault();
        console.log(this);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                addSingleChoice(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }

        return(
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '600px'}}>
                <FormItem {...formItemLayout} label={<FormattedMessage id="difficulty" />}>
                    {getFieldDecorator('difficulty')(
                        <Slider initialValue={3} max={5} marks={{
                            1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
                        }}
                        />
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
                    {getFieldDecorator('radio-group')(
                        <RadioGroup onChange={this.onChange}>
                            <Radio value={1}>
                                {getFieldDecorator('1', {
                                    rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                })(
                                    <TextArea placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                            <Radio value={2}>
                                {getFieldDecorator('2', {
                                    rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                })(
                                    <TextArea placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                                )}</Radio>
                            <Radio value={3}>
                                {getFieldDecorator('3', {
                                    rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                })(
                                    <TextArea placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                            <Radio value={4}>
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

export default injectIntl(Form.create()(SingleChoiceInput))
