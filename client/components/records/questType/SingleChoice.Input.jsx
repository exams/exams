import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Rate, Input, Radio , Button, Row, Col, Select } from 'antd';
import { getLabelByIndex } from '../../../utils/utils'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class SingleChoiceInput extends Component{

    constructor(){
        super();
        this.state = {
            choiceNum: 4
        }
    }

    addChoiceItem = () => {
        const choiceItemVal = this.state.choiceNum;
        if (choiceItemVal < 10){
            this.setState({choiceNum: choiceItemVal + 1})
        }
    }

    delChoiceItem = () => {
        const choiceItem = this.state.choiceNum;
        if (choiceItem > 2)
            this.setState({choiceNum: choiceItem - 1})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const choiceItem = this.state.choiceNum;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const choiceItems = [];
                for (var i = 0; i < choiceItem; i++){
                    const label = getLabelByIndex(i)
                    const obj = {}
                    obj.label = label;
                    obj.value = values[label]
                    choiceItems.push(obj)
                    delete values[label]
                }
                values.choiceItems = choiceItems;
                this.props.handleSummit(values)
            }
        });
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
                                initialValue: 3,
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
                        <RadioGroup buttonStyle="solid">
                            {
                                this.getChoiceItemArray().map((item) => {
                                    return (<Radio.Button key={item.label} value={item.label}>{item.label}</Radio.Button>)
                                })
                            }
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

SingleChoiceInput.propTypes = {
    intl: intlShape.isRequired
};

export default Form.create()(injectIntl(SingleChoiceInput))
