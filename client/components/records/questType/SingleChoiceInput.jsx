import React, {Component} from 'react';
import { Form, Slider, Input, Radio , Checkbox } from 'antd';
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const { TextArea } = Input;

class SingleChoiceInput extends Component{

    onSubmit() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.onSubmit}>
                <FormItem label={"难度"}>
                    {getFieldDecorator('slider')(
                        <Slider defaultValue={3} max={5} marks={{
                            1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
                        }}
                        />
                    )}
                </FormItem>
                <FormItem label={"题干"}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <TextArea placeholder="请输入问题的题干" autosize={{ minRows: 3}} />
                    )}
                </FormItem>
                <FormItem label={"选项"}>
                    <RadioGroup onChange={this.onChange}>
                        <p>
                            <Radio value={'A'}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea placeholder="请输入问题的选项" autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                        </p>
                        <p>
                            <Radio value={2}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea placeholder="请输入问题的选项" autosize={{ minRows: 2}} />
                                )}</Radio>
                        </p>
                        <p>
                            <Radio value={3}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea placeholder="请输入问题的选项" autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                        </p>
                        <p>
                            <Radio value={4}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea placeholder="请输入问题的选项" autosize={{ minRows: 2}} />
                                )}
                            </Radio>
                        </p>
                    </RadioGroup>
                </FormItem>
                <FormItem label={"解析"}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <TextArea placeholder="请输入问题的解析" autosize={{ minRows: 3}} />
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(SingleChoiceInput)
