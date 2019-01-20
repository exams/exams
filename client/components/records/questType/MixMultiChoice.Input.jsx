import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Input, Checkbox, Button, Row, Col } from 'antd';
import {getLabelByIndex} from "../../../utils/utils";

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
class MixMultiChoiceInput extends Component{
    constructor(){
        super();
        this.state = {
            choiceNum: 4
        }
    }

    componentDidMount() {
        this.props.form.setFieldsValue({choiceNum: this.state.choiceNum})
    }

    addChoiceItem = () => {
        const choiceItemVal = this.state.choiceNum;
        if (choiceItemVal < 10){
            this.setState({choiceNum: choiceItemVal + 1})
            this.props.form.setFieldsValue({choiceNum: choiceItemVal + 1})
        }
    }

    delChoiceItem = () => {
        const choiceItem = this.state.choiceNum;
        if (choiceItem > 2){
            this.setState({choiceNum: choiceItem - 1})
            this.props.form.setFieldsValue({choiceNum: choiceItem - 1})
        }
    }

    getChoiceItemArray = () => {
        const choiceItem = this.state.choiceNum;
        var choiceItemRes = [];
        for (var i = 0; i < choiceItem; i++){
            const label = getLabelByIndex(i)
            choiceItemRes.push({label: label, index: i})
        }
        return choiceItemRes;
    }

    getChoiceItemLabel = () => {
        const choiceItem = this.state.choiceNum;
        var choiceItemRes = [];
        for (var i = 0; i < choiceItem; i++){
            const label = getLabelByIndex(i)
            choiceItemRes.push(label)
        }
        return choiceItemRes;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        return(
            <Form>
                {getFieldDecorator('choiceNum')(
                    <Input type='hidden'/>
                )}
                <FormItem {...formItemLayout} label={<FormattedMessage id="stem" />}>
                    <Row>
                        <Col span={20}>
                            {getFieldDecorator('stem')(
                                <TextArea placeholder={this.props.intl.messages.stemPlaceholder} autosize={{ minRows: 3}} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                {
                    this.getChoiceItemArray().map((item) => {
                        const index = item.index;
                        return(
                            <FormItem {...formItemLayout} label={item.label} key={item.label}>
                                <Row>
                                    <Col span={20}>
                                        {getFieldDecorator(item.label, {
                                            rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                        })(
                                            <Input placeholder={this.props.intl.messages.choiceItemPlaceholder} />
                                        )}
                                    </Col>
                                    <Col span={1}>
                                        {index > 1 && <Button icon={"minus"} onClick={this.delChoiceItem}  style={{marginLeft: '5px'}} />}
                                    </Col>
                                </Row>
                            </FormItem>
                        )
                    })
                }
                <Row>
                    <Col span={15} offset={4}>
                        <Button icon={"plus"} onClick={this.addChoiceItem} style={{width: '100%'}}>
                            <FormattedMessage id="addChoiceItem" />
                        </Button>
                    </Col>
                </Row>
                <FormItem {...formItemLayout} label={<FormattedMessage id="answer" />}>
                    {getFieldDecorator('answer', {
                        rules: [{ required: true, message: this.props.intl.messages.answerPlaceholder }],
                    })(
                        <CheckboxGroup options={this.getChoiceItemLabel()}>
                        </CheckboxGroup>
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
            </Form>
        )
    }
}

MixMultiChoiceInput.propTypes = {
    intl: intlShape.isRequired
};

export default Form.create()(injectIntl(MixMultiChoiceInput))
