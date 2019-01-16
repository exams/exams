import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Rate, Input, Checkbox, Radio, Button, Row, Col, Select, Layout } from 'antd';
import ModalAddSub from './ModalAddSub'
import {
    addMixSingleChoice,
    addMixMultiChoice,
    addMixQuestAnswer,
    addMixJudge,
    addMixBlank
} from '../actions'
import {connect} from "react-redux";

const RadioGroup = Radio.Group
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class MixingInput extends Component{

    constructor(){
        super();
        this.state = {
            visible: false,
            questType: '',
            subQuest: []
        }
    }

    componentDidMount() {
        this.props.form.setFieldsValue({difficulty: 3, isReal: false})
    }

    componentDidUpdate() {
        const { questType, subQuest } = this.state

        if ("singleChoice" === questType){
            const { mixSingleChoice } = this.props
            if (!mixSingleChoice)
                return
            mixSingleChoice.questType = questType
            for (var quest in subQuest){
                if (quest.questType === questType && quest._id !== mixSingleChoice._id)
                    subQuest.push({index: subQuest.length, value: mixSingleChoice})
            }

            this.setState({
                subQuest: subQuest
            })
            console.log(mixSingleChoice)
        }
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

    OpenModal = () => {
        this.setState({
            visible: true
        })
    }
    onCancel = () => {
        this.setState({
            visible: false
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    handleSave = (values) => {
        console.log(values)
        this.setState({ questType: values.questType });
        if ("singleChoice" === values.questType){
            this.props.addMixSingleChoice(values)
        }
        this.setState({ visible: false });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible } = this.state

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

        const { subQuest } = this.state
        console.log(subQuest)

        return(
            <Layout>
            <Row>
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
                    <Row>
                        <Col span={18} offset={4}>
                            <Row>
                                <Col span={4}>
                                    <Button icon={"plus"} onClick={this.OpenModal}>
                                        <FormattedMessage id="addSubQuest" />
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
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
            </Row>
                <ModalAddSub
                    title={<FormattedMessage id="addSubQuest" />}
                    wrappedComponentRef={this.saveFormRef}
                    visible={visible}
                    ref={this.saveFormRef}
                    handleSave={this.handleSave}
                    onCancel={this.onCancel}
                />
            </Layout>
        )
    }
}

MixingInput.propTypes = {
    intl: intlShape.isRequired
};

const mapStateToProps = (state) => {
    console.log(state.records.mixSingleChoice)
    return {
        mixSingleChoice: state.records.mixSingleChoice,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addMixSingleChoice: (mixSingleChoice) => dispatch(addMixSingleChoice(mixSingleChoice)),
    addMixMultiChoice: (mixMultiChoice) => dispatch(addMixMultiChoice(mixMultiChoice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(MixingInput)))
