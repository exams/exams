import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Row, Col, Button, Tag, Select, Input, Card, Form } from 'antd';
import { addTemplate } from "./actions";
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import { listQuestTypes } from "../quests/actions";
import ModalTagSelector from '../subjects/components/ModalTagSelector'
import ModalAliasSetter from './components/ModalAliasSetter'

const Option = Select.Option;
const FormItem = Form.Item;
class TemplateInput extends Component{

    constructor(){
        super();
        this.state = {
            difficulty: 3,
            scoreTotal: 30,
            tagModalVisible: false,
            aliasModalVisible: false,
            selectedSubjectId: '',
            openModalIndex: 0,
            paperStructs: [{
                questType: 'singleChoice',
                subQuestNum: 1,
                difficulty: 3,
                offset: 1,
                number: 10,
                score: 2,
                alias: "",
                tags: []
            }]
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
        const { openModalIndex, paperStructs } = this.state
        const questSet = paperStructs[openModalIndex];
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
        const { paperStructs, openModalIndex } = this.state
        const questSet = paperStructs[openModalIndex];
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
        };
        const { paperStructs } = this.state
        paperStructs.push(questSet)
        this.setState({
            paperStructs: paperStructs
        })
        this.calculateScoreAndDifficulty();
    }

    getSelectTags = (index) => {
        const { paperStructs } = this.state
        const selectTags = paperStructs[index].tags;
        const tags = [];
        selectTags && selectTags.map((item, index) => {
            tags.push(<Tag key={index}>{item}</Tag>)
        })
        return tags
    }

    delete = (index) => {
        const { paperStructs } = this.state
        paperStructs.splice(index, 1);
        this.setState({
            paperStructs: paperStructs
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { paperStructs } = this.state
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.paperStructs = paperStructs;
                this.props.addTemplate(values)
            }
        });
    }

    onQuestTypesChange = (value, index) => {
        const { paperStructs } = this.state
        const questSet = paperStructs[index];
        questSet.questType = value;
    }

    onNumberChange = (e, index) => {
        const { paperStructs } = this.state
        const questSet = paperStructs[index];
        questSet.number = e.target.value;
        this.calculateScoreAndDifficulty();
    }

    onScoreChange = (e, index) => {
        const { paperStructs } = this.state
        const questSet = paperStructs[index];
        questSet.score = e.target.value;
        this.calculateScoreAndDifficulty();
    }

    onDifficultyChange = (e, index) => {
        const { paperStructs } = this.state
        const questSet = paperStructs[index];
        questSet.difficulty = e.target.value;
        this.calculateScoreAndDifficulty();
    }

    onSubQuestNumChange = (e, index) => {
        const { paperStructs } = this.state
        const questSet = paperStructs[index];
        questSet.subQuestNum = e.target.value;
        this.calculateScoreAndDifficulty();
    }

    calculateScoreAndDifficulty = () => {
        var score = 0;
        var difficulty = 0;
        var itemScore = 0;
        const { paperStructs } = this.state
        paperStructs.forEach((item) => {
            itemScore = item.score * item.number * item.subQuestNum;
            score += itemScore;
        });
        paperStructs.forEach((item) => {
            itemScore = item.score * item.number * item.subQuestNum;
            difficulty += itemScore / score * item.difficulty;
        });
        this.setState({
            scoreTotal: score,
            difficulty: difficulty.toFixed(1)
        })
    }

    render() {
        const {difficulty, scoreTotal} = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
        }
        const { paperStructs, tagModalVisible, aliasModalVisible } = this.state
        return (
            <Card title={<FormattedMessage id="creatTemplate" />}
                  extra={[
                      <Button key={"addQuestType"} onClick={this.addQuestType}><FormattedMessage id="addQuestType" /></Button>,
                      <Button key={"submit"} type="primary" onClick={this.handleSubmit}><FormattedMessage id="submit" /></Button>
                  ]}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={4}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="subject" />}>
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
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="title" />}>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: this.props.intl.messages.titlePlaceholder }],
                                })(
                                    <Input placeholder={this.props.intl.messages.titlePlaceholder} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={3} offset={1}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="difficulty" />}>
                                {difficulty}
                            </FormItem>
                        </Col>
                        <Col span={3} offset={1}>
                            <FormItem {...formItemLayout} label={<FormattedMessage id="scoreTotal" />}>
                                {scoreTotal}
                            </FormItem>
                        </Col>
                    </Row>
                    {
                        paperStructs.map((item, index) => {
                            const tags = this.getSelectTags(index)
                            tags.unshift(<span style={{marginRight: 16}} key={-1}>{item.alias}</span>)
                            tags.unshift(<span style={{marginRight: 16}} key={-2}><FormattedMessage id="questTypeSet" /></span>)
                            return (
                                <Card key={index}
                                      size="small"
                                      title={tags}
                                      extra={[
                                          <Button size={"small"} key={"setAlias"} onClick={() => {this.OpenAliasModal(index)}}><FormattedMessage id="setAlias" /></Button>,
                                          <Button size={"small"} key={"selectTags"} onClick={() => {this.OpenModal(index)}}><FormattedMessage id="selectTags" /></Button>,
                                          <Button size={"small"} key={"delete"} icon="delete" onClick={() => {this.delete(index);}} title={<FormattedMessage id="delete" />} />
                                      ]}
                                      style={{margin: 10}}
                                >
                                    <Row>
                                        <Col span={4} offset={1}>
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
