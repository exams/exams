import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Rate, Input, List, Radio, Button, Row, Col, Select, Icon, Layout } from 'antd';
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
            subQuests: []
        }
    }

    componentDidMount() {
        this.props.form.setFieldsValue({difficulty: 3, isReal: false})
    }

    componentWillReceiveProps = (nextProps) => {
        const { questType, subQuests } = this.state
        let needed = true
        if ("singleChoice" === questType){
            const { mixSingleChoice } = nextProps
            if (!mixSingleChoice)
                return
            mixSingleChoice.questType = questType
            if (subQuests.length == 0){
                subQuests.push({index: subQuests.length + 1, value: mixSingleChoice})
                return
            }

            for (var i = 0; i < subQuests.length; i++){
                if (mixSingleChoice._id === subQuests[i].value._id){
                    needed = false;
                    break;
                }
            }
            if (needed)
                subQuests.push({index: subQuests.length + 1, value: mixSingleChoice})
        }
        if ("multiChoice" === questType){
            const { mixMultiChoice } = nextProps
            if (!mixMultiChoice)
                return
            mixMultiChoice.questType = questType
            if (subQuests.length == 0){
                subQuests.push({index: subQuests.length + 1, value: mixMultiChoice})
                return
            }

            for (var i = 0; i < subQuests.length; i++){
                if (mixMultiChoice._id === subQuests[i].value._id){
                    needed = false;
                    break;
                }
            }
            if (needed)
                subQuests.push({index: subQuests.length + 1, value: mixMultiChoice})
        }
        if ("judge" === questType){
            const { mixJudge } = nextProps
            if (!mixJudge)
                return
            mixJudge.questType = questType
            if (subQuests.length == 0){
                subQuests.push({index: subQuests.length + 1, value: mixJudge})
                return
            }

            for (var i = 0; i < subQuests.length; i++){
                if (mixJudge._id === subQuests[i].value._id){
                    needed = false;
                    break;
                }
            }
            if (needed)
                subQuests.push({index: subQuests.length + 1, value: mixJudge})
        }
        if ("blank" === questType){
            const { mixBlank } = nextProps
            if (!mixBlank)
                return
            mixBlank.questType = questType
            if (subQuests.length == 0){
                subQuests.push({index: subQuests.length + 1, value: mixBlank})
                return
            }

            for (var i = 0; i < subQuests.length; i++){
                if (mixBlank._id === subQuests[i].value._id){
                    needed = false;
                    break;
                }
            }
            if (needed)
                subQuests.push({index: subQuests.length + 1, value: mixBlank})
        }
        if ("questAnswer" === questType){
            const { mixQuestAnswer } = nextProps
            if (!mixQuestAnswer)
                return
            mixQuestAnswer.questType = questType
            if (subQuests.length == 0){
                subQuests.push({index: subQuests.length + 1, value: mixQuestAnswer})
                return
            }

            for (var i = 0; i < subQuests.length; i++){
                if (mixQuestAnswer._id === subQuests[i].value._id){
                    needed = false;
                    break;
                }
            }
            if (needed)
                subQuests.push({index: subQuests.length + 1, value: mixQuestAnswer})
        }

        this.setState({
            subQuests: subQuests
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { subQuests } = this.state
                values.subQuests = subQuests;
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
        this.setState({ questType: values.questType });
        if ("singleChoice" === values.questType)
            this.props.addMixSingleChoice(values)
        if ("multiChoice" === values.questType)
            this.props.addMixMultiChoice(values)
        if ("judge" === values.questType)
            this.props.addMixJudge(values)
        if ("blank" === values.questType)
            this.props.addMixBlank(values)
        if ("questAnswer" === values.questType)
            this.props.addMixQuestAnswer(values)

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

        const { subQuests } = this.state

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
                        <Col span={15} offset={4}>
                            {
                                subQuests.length > 0 && <List
                                    itemLayout="horizontal"
                                    dataSource={subQuests}
                                    renderItem={item => (
                                        <List.Item actions={[<a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>, <a><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>]}>
                                            <List.Item.Meta
                                                title={item.value.stem}
                                            />
                                            <span><FormattedMessage id={item.value.questType} /></span>
                                        </List.Item>
                                    )}
                                />
                            }
                        </Col>
                    </Row>
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
    return {
        mixSingleChoice: state.records.mixSingleChoice,
        mixMultiChoice: state.records.mixMultiChoice,
        mixJudge: state.records.mixJudge,
        mixBlank: state.records.mixBlank,
        mixQuestAnswer: state.records.mixQuestAnswer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addMixSingleChoice: (mixSingleChoice) => dispatch(addMixSingleChoice(mixSingleChoice)),
    addMixMultiChoice: (mixMultiChoice) => dispatch(addMixMultiChoice(mixMultiChoice)),
    addMixQuestAnswer: (questAnswer) => dispatch(addMixQuestAnswer(questAnswer)),
    addMixJudge: (judge) => dispatch(addMixJudge(judge)),
    addMixBlank: (blank) => dispatch(addMixBlank(blank))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(MixingInput)))
