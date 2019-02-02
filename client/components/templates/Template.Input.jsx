import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Row, Col, List, Icon, Button, Tag, Select, Input, Card, Form } from 'antd';
import { addTemplate } from "./actions";
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import { listQuestTypes } from "../quests/actions";
import ModalTagSelector from '../subjects/ModalTagSelector'
import ModalAliasSetter from './ModalAliasSetter'

const Option = Select.Option;
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
class TemplateInput extends Component{

    constructor(){
        super();
        this.state = {
            tagModalVisible: false,
            aliasModalVisible: false,
            selectedSubjectId: '',
            openModalIndex: 0,
            paparStructs: []
        }
    }

    componentDidMount() {
        this.props.listQuestTypes();
    }

    getSubjects = () => {
        const { me } = this.props
        const subjects = me.subjects;
        const childrenSubjects = [];
        subjects && subjects.map((item) => {
            childrenSubjects.push(<Option key={item._id}>{item.name}</Option>);
        })
        return childrenSubjects
    }


    getQuestTypesChildren = () => {
        const { questTypes } = this.props
        const childrenQuestTypes = [];
        questTypes && questTypes.map((item) => {
            childrenQuestTypes.push(<Option key={item.questType}><FormattedMessage id={item.questType} /></Option>);
        })
        return childrenQuestTypes
    }

    onChange = (value) => {
        this.setState({
            selectedSubjectId: value
        })
    }

    handleSelect = (selectTags) => {
        this.setState({
            tagModalVisible: false,
        })
        const { openModalIndex, paparStructs } = this.state
        const questSet = paparStructs[openModalIndex];
        questSet.tags = selectTags;
    }

    OpenModal = (index) => {
        this.setState({
            openModalIndex: index,
            tagModalVisible: true
        })
    }

    OpenAliasModal = (index) => {
        this.setState({
            openModalIndex: index,
            aliasModalVisible: true
        })
    }

    setAlias = (value) => {
        const { paparStructs, openModalIndex } = this.state
        const questSet = paparStructs[openModalIndex];
        questSet.alias = value;
        console.log(questSet)
        this.setState({
            aliasModalVisible: false,
        })
    }

    onCancel = () => {
        this.setState({
            tagModalVisible: false,
            aliasModalVisible: false,
        })
    }

    addQuestType = () => {
        const questSet = {
            questType: 'singleChoice',
            subQuestNum: 1,
            difficulty: 3,
            offset: 1,
            number: 10,
            score: 2,
            alias: "",
            tags: []
        }
        const { paparStructs } = this.state
        paparStructs.push(questSet)
        this.setState({
            paparStructs: paparStructs
        })
    }

    getSelectTags = (index) => {
        const { paparStructs } = this.state
        const selectTags = paparStructs[index].tags;
        const tags = [];
        selectTags && selectTags.map((item, index) => {
            tags.push(<Tag key={index}>{item.name}</Tag>)
        })
        return tags
    }

    delete = (index) => {
        const { paparStructs } = this.state
        paparStructs.splice(index, 1);
        this.setState({
            paparStructs: paparStructs
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { paparStructs } = this.state
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.paparStructs = paparStructs;
                this.props.addTemplate(values)
                console.log(values)
            }
        });
    }

    onQuestTypesChange = (value, index) => {
        const { paparStructs } = this.state
        const questSet = paparStructs[index];
        questSet.questType = value;
    }

    onNumberChange = (e, index) => {
        const { paparStructs } = this.state
        const questSet = paparStructs[index];
        questSet.number = e.target.value;
    }

    onScoreChange = (e, index) => {
        const { paparStructs } = this.state
        const questSet = paparStructs[index];
        questSet.score = e.target.value;
    }

    onDifficultyChange = (e, index) => {
        const { paparStructs } = this.state
        const questSet = paparStructs[index];
        questSet.difficulty = e.target.value;
    }

    onOffsetChange = (e, index) => {
        const { paparStructs } = this.state
        const questSet = paparStructs[index];
        questSet.offset = e.target.value
    }

    onSubQuestNumChange = (e, index) => {
        const { paparStructs } = this.state
        const questSet = paparStructs[index];
        questSet.subQuestNum = e.target.value
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        }
        const { paparStructs, tagModalVisible, aliasModalVisible } = this.state
        return (
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="title" />}>
                        <Row>
                            <Col>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                })(
                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} />
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="subject" />}>
                        <Row>
                            <Col span={10}>
                                {getFieldDecorator('subject', {
                                    rules: [{ required: true, message: this.props.intl.messages.subjectPlaceholder }],
                                })(
                                    <Select
                                        onChange={this.onChange}
                                        placeholder={this.props.intl.messages.subjectPlaceholder}
                                        style={{ width: '100%' }}
                                    >
                                        {this.getSubjects()}
                                    </Select>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    {
                        paparStructs.map((item, index) => {
                            const tags = this.getSelectTags(index)
                            tags.unshift(<span style={{marginRight: 16}} key={-1}>{item.alias}</span>)
                            tags.unshift(<span style={{marginRight: 16}} key={-2}><FormattedMessage id="questTypeSet" /></span>)
                            return (
                                <Card key={index}
                                      title={tags}
                                      extra={[
                                          <Button key={"setAlias"} onClick={() => {this.OpenAliasModal(index)}}><FormattedMessage id="setAlias" /></Button>,
                                          <Button key={"selectTags"} onClick={() => {this.OpenModal(index)}}><FormattedMessage id="selectTags" /></Button>,
                                          <Button key={"delete"} icon="delete" onClick={() => {this.delete(index);}} title={<FormattedMessage id="delete" />} />
                                      ]}
                                      style={{margin: 10}}
                                >
                                    <Row>
                                        <Col span={4}>
                                            <FormItem {...formItemLayout} label={<FormattedMessage id="questType" />}>
                                                {getFieldDecorator('questType' + index.toString(), {
                                                    initialValue: item.questType,
                                                    rules: [{ required: true, message: this.props.intl.messages.subjectPlaceholder }],
                                                })(
                                                    <Select onChange={(value) => {this.onQuestTypesChange(value, index);}}>
                                                        {this.getQuestTypesChildren()}
                                                    </Select>
                                                )
                                                }
                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem {...formItemLayout} label={<FormattedMessage id="number" />}>
                                                {getFieldDecorator('number' + index.toString(), {
                                                    initialValue: item.number,
                                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                                })(
                                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} onChange={(e) => {this.onNumberChange(e, index);}} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem {...formItemLayout} label={<FormattedMessage id="score" />}>
                                                {getFieldDecorator('score' + index.toString(), {
                                                    initialValue: item.score,
                                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                                })(
                                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} onChange={(e) => {this.onScoreChange(e, index);}} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem {...formItemLayout} label={<FormattedMessage id="difficulty" />}>
                                                {getFieldDecorator('difficulty' + index.toString(), {
                                                    initialValue: item.difficulty,
                                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                                })(
                                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} onChange={(e) => {this.onDifficultyChange(e, index);}} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem {...formItemLayout} label={<FormattedMessage id="offset" />}>
                                                {getFieldDecorator('offset' + index.toString(), {
                                                    initialValue: item.offset,
                                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                                })(
                                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} onChange={(e) => {this.onOffsetChange(e, index);}} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem {...formItemLayout} label={<FormattedMessage id="subQuestNum" />}>
                                                {getFieldDecorator('subQuestNum' + index.toString(), {
                                                    initialValue: item.subQuestNum,
                                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                                })(
                                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} onChange={(e) => {this.onSubQuestNumChange(e, index);}} />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        })
                    }
                    <Row>
                        <Col span={15} offset={6}>
                            <Button icon={"plus"} onClick={this.addQuestType} style={{width: '100%'}}>
                                <FormattedMessage id="addQuestType" />
                            </Button>
                        </Col>
                    </Row>
                    <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                        <Row>
                            <Col>
                                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                    <FormattedMessage id="submit"/>
                                </Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                {
                    tagModalVisible && <ModalTagSelector
                        visible={tagModalVisible}
                        subjectId={this.state.selectedSubjectId}
                        handleSelect={this.handleSelect}
                        onCancel={this.onCancel}
                    />
                }
                {
                    aliasModalVisible && <ModalAliasSetter
                        visible={aliasModalVisible}
                        setAlias={this.setAlias}
                        onCancel={this.onCancel}
                    />
                }
            </Card>
        );
    }
}

TemplateInput.propTypes = {
    intl: intlShape.isRequired
};

const mapStateToProps = (state) => {
    return {
        me: state.core.me,
        questTypes: state.quests.questTypes,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addTemplate: (template) => dispatch(addTemplate(template)),
    listQuestTypes: () => dispatch(listQuestTypes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(TemplateInput)));
