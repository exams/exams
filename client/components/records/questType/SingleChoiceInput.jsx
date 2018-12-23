import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';
import { Form, Slider, Input, Radio , Button } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class SingleChoiceInput extends Component{

    onSubmit() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }

        return(
            <Form onSubmit={this.onSubmit}>
                <FormItem {...formItemLayout} label={<FormattedMessage id="difficulty" />}>
                    {getFieldDecorator('slider')(
                        <Slider defaultValue={3} max={5} marks={{
                            1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
                        }}
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="stem" />}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <TextArea placeholder={<FormattedMessage id="stemPlaceholder" />} autosize={{ minRows: 3}} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="choiceItem" />}>
                    <RadioGroup onChange={this.onChange}>
                        <p>
                            <Radio value={'A'}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea placeholder={<FormattedMessage id="choiceItemPlaceholder" />} autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                        </p>
                        <p>
                            <Radio value={2}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea placeholder={<FormattedMessage id="choiceItemPlaceholder" />} autosize={{ minRows: 2}} />
                                )}</Radio>
                        </p>
                        <p>
                            <Radio value={3}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea placeholder={<FormattedMessage id="choiceItemPlaceholder" />} autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                        </p>
                        <p>
                            <Radio value={4}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea placeholder={<FormattedMessage id="choiceItemPlaceholder" />} autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                        </p>
                    </RadioGroup>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="analysis" />}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <TextArea placeholder={<FormattedMessage id="analysisPlaceholder" />} autosize={{ minRows: 3}} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout}>
                    <Button>
                        <FormattedMessage id="cancel" />
                    </Button>
                    <Button type="primary">
                        <FormattedMessage id="submit" />
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(SingleChoiceInput)
