import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Rate, Input, List, Radio, Button, Row, Col, Select, Tag, Icon, Layout } from 'antd';
import ModalAddSub from './ModalAddSub'
import {
    addMixSingleChoice,
    addMixMultiChoice,
    addMixQuestAnswer,
    addMixJudge,
    addMixBlank
} from '../actions'
import {connect} from "react-redux";
import ModalTagSelector from '../../subjects/ModalTagSelector'

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const CheckableTag = Tag.CheckableTag;
class MixingInput extends Component{

    constructor(){
        super();
        this.state = {
            visible: false,
            tagModalVisible: false,
            questType: '',
            subQuests: [],
            selectTags: [],
            selectedSubjectId: ''
        }
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
                const { subQuests, selectTags } = this.state
                values.subQuests = subQuests;
                values.tags = selectTags;
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

    onChange = (value) => {
        this.setState({
            selectedSubjectId: value
        })
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

    OpenTagModal = () => {
        this.setState({
            tagModalVisible: true
        })
    }
    onTagModalCancel = () => {
        this.setState({
            tagModalVisible: false
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

    handleSelect = (selectTags) => {
        this.setState({
            tagModalVisible: false,
            selectTags: selectTags
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, subQuests, tagModalVisible, selectTags } = this.state

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
            <Layout>
            <Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={12}>
                            <FormItem {...halfformItemLayout} label={<FormattedMessage id="subject" />}>
                                {getFieldDecorator('subject', {
                                    rules: [{ required: true, message: this.props.intl.messages.subjectPlaceholder }],
                                })(
                                    <Select onChange={this.onChange}
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
                                <Col span={8}>
                                    <Button icon={"plus"} onClick={this.OpenModal}>
                                        <FormattedMessage id="addSubQuest" />
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18} offset={4}>
                            {
                                selectTags && selectTags.map((tag) => {
                                    return (<CheckableTag key={tag._id} checked={true}>{tag.name}</CheckableTag>);
                                })
                            }
                            <Button icon={"plus"} onClick={this.OpenTagModal}>
                                <FormattedMessage id="selectTags" />
                            </Button>
                        </Col>
                    </Row>
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

                {
                    tagModalVisible && <ModalTagSelector
                        title={[<FormattedMessage id="selectTags"/>]}
                        visible={tagModalVisible}
                        subjectId={this.state.selectedSubjectId}
                        handleSelect={this.handleSelect}
                        onCancel={this.onTagModalCancel}
                    />
                }
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
