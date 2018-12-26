import React, {Component} from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Slider, Input, Radio , Button, Row, Col } from 'antd';
import { addSingleChoice } from '../actions'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class SingleChoiceInput extends Component{

    state = {
        choiceNum: 4
    }

    componentDidMount() {
        this.props.form.setFieldsValue({difficulty: 3})
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
        for (var i = 1; i <= choiceItem; i++){
            console.log(this.refs[i])
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                // const choiceItems = [];
                // for (var i = 1; i <= this.state.choiceNum; i++){
                //     const label = i.toString()
                //     const obj = {}
                //     obj[label] = values[i]
                //     choiceItems.push(obj)
                // }
                // values.choiceItems = choiceItems;
                // this.props.dispatch(addSingleChoice(values))
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

    getChoiceItemView = () => {
        const choiceItem = this.state.choiceNum;
        var choiceItemRes = [];
        for (var i = 1; i <= choiceItem; i++){
            if (i <= 2){
                choiceItemRes.push(
                    <Row key={i}>
                        <Col span={1}>
                            <Radio value={i}></Radio>
                        </Col>
                        <Col span={21}>
                            <Input name={i} ref={i} placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                        </Col>
                    </Row>
                )
            } else {
                choiceItemRes.push(
                    <Row key={i}>
                        <Col span={1}>
                            <Radio value={i}></Radio>
                        </Col>
                        <Col span={21}>
                            <Input name={i} ref={i} placeholder={this.props.intl.messages.choiceItemPlaceholder} autosize={{ minRows: 2}} />
                        </Col>
                        <Col span={2}>
                            <Button onClick={this.delChoiceItem} icon={"minus"} style={{marginLeft: "5px"}} />
                        </Col>
                    </Row>
                )
            }
        }
        return choiceItemRes
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }

        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label={<FormattedMessage id="difficulty" />}>
                    <Row>
                        <Col span={10}>
                            {getFieldDecorator('difficulty')(
                                <Slider step={1} min={1} max={5}/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="stem" />}>
                    <Row>
                        <Col span={22}>
                            {getFieldDecorator('stem', {
                                rules: [{ required: true, message: this.props.intl.messages.stemPlaceholder }],
                            })(
                                <TextArea placeholder={this.props.intl.messages.stemPlaceholder} autosize={{ minRows: 3}} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="choiceItem" />}>
                    {getFieldDecorator('answer')(
                        <RadioGroup style={{width: '100%'}}>
                            {
                                this.getChoiceItemArray().map((item) => {
                                    return(
                                        <Row key={item.key}>
                                            <Col span={1}>
                                                <Radio value={item.key}></Radio>
                                            </Col>
                                            <Col span={21}>
                                                <Input name={item.key} ref={item.key} placeholder={this.props.intl.messages.choiceItemPlaceholder} />
                                            </Col>
                                            <Col span={2}>
                                                <Button onClick={this.delChoiceItem} icon={"minus"} style={{marginLeft: "5px"}} />
                                            </Col>
                                        </Row>
                                    )
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
                        <Col span={22}>
                            {getFieldDecorator('analysis', {
                                rules: [{ required: true, message: this.props.intl.messages.analysisPlaceholder }],
                            })(
                                <TextArea placeholder={this.props.intl.messages.analysisPlaceholder} autosize={{ minRows: 3}} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                    <Row>
                        <Col span={22}>
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

export default connect()(Form.create()(injectIntl(SingleChoiceInput)))
