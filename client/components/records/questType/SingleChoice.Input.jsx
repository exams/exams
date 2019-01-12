import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Rate, Input, Radio , Button, Row, Col, Select } from 'antd';
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

    componentDidMount() {
        this.props.form.setFieldsValue({difficulty: 3, isReal: false})
    }

    addChoiceItem = () => {
        const choiceItemVal = this.state.choiceNum;
        if (choiceItemVal < 10){
            this.setState({choiceNum: choiceItemVal + 1})
        }
    }

    delChoiceItem = () => {
        const choiceItem = this.state.choiceNum;
        this.setState({choiceNum: choiceItem - 1})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const choiceItem = this.state.choiceNum;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const choiceItems = [];
                for (var i = 1; i <= choiceItem; i++){
                    const label = i.toString()
                    const obj = {}
                    obj.label = label;
                    obj.value = values[i]
                    choiceItems.push(obj)
                }
                values.choiceItems = choiceItems;
                this.props.handleSummit(values)
            }
        });
    }

    getChoiceItemArray = () => {
        const choiceItem = this.state.choiceNum;
        var choiceItemRes = [];
        for (var i = 1; i <= choiceItem; i++){
            choiceItemRes.push({key: i})
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
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }

        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label={<FormattedMessage id="subject" />}>
                    <Row>
                        <Col span={10} offset={1}>
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
                <FormItem {...formItemLayout} label={<FormattedMessage id="difficulty" />}>
                    <Row>
                        <Col span={10} offset={1}>
                            {getFieldDecorator('difficulty')(
                                <Rate />
                            )}
                        </Col>
                        <Col span={10} offset={1}>
                            <FormattedMessage id="difficultyDescription" />
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="stem" />}>
                    <Row>
                        <Col span={21} offset={1}>
                            {getFieldDecorator('stem', {
                                rules: [{ required: true, message: this.props.intl.messages.stemPlaceholder }],
                            })(
                                <TextArea placeholder={this.props.intl.messages.stemPlaceholder} autosize={{ minRows: 3}} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="choiceItem" />}>
                    {getFieldDecorator('answer', {
                        rules: [{ required: true, message: this.props.intl.messages.answerPlaceholder },],
                    })(
                        <RadioGroup style={{width: '100%'}}>
                            {
                                this.getChoiceItemArray().map((item) => {
                                    const key = item.key;
                                    if (key <= 2){
                                        return(
                                            <Row key={key}>
                                                <Col span={1}>
                                                    <Radio value={key}></Radio>
                                                </Col>
                                                <Col span={21}>
                                                    {getFieldDecorator(key.toString(), {
                                                        rules: [{ required: true, message: this.props.intl.messages.choiceItemPlaceholder }],
                                                    })(
                                                        <Input placeholder={this.props.intl.messages.choiceItemPlaceholder} />
                                                    )}
                                                </Col>
                                            </Row>
                                        )
                                    } else {
                                        return(
                                            <Row key={key}>
                                                <Col span={1}>
                                                    <Radio value={key}></Radio>
                                                </Col>
                                                <Col span={21}>
                                                    {getFieldDecorator(key.toString())(
                                                        <Input placeholder={this.props.intl.messages.choiceItemPlaceholder} />
                                                    )}
                                                </Col>
                                                <Col span={1}>
                                                    <Button icon={"minus"} onClick={this.delChoiceItem}  style={{marginLeft: '5px'}} />
                                                </Col>
                                            </Row>
                                        )
                                    }
                                })
                            }
                            <Row>
                                <Col span={21} offset={1}>
                                    <Button icon={"plus"} onClick={this.addChoiceItem} style={{width: '100%'}}>
                                        <FormattedMessage id="addChoiceItem" />
                                    </Button>
                                </Col>
                            </Row>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="analysis" />}>
                    <Row>
                        <Col span={21} offset={1}>
                            {getFieldDecorator('analysis')(
                                <TextArea placeholder={this.props.intl.messages.analysisPlaceholder} autosize={{ minRows: 3}} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="isReal" />}>
                    <Row>
                        <Col span={10} offset={1}>
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
                        <Col span={10} offset={1}>
                            {getFieldDecorator('description')(
                                <Input placeholder={this.props.intl.messages.descriptionPlaceholder}/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                    <Row>
                        <Col span={21} offset={1}>
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
