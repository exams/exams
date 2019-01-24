import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Modal, Radio, Row, Col} from 'antd';
import MixSingleChoiceInput from './MixSingleChoice.Input'
import MixMultiChoiceInput from './MixMultiChoice.Input'
import MixQuestAnswerInput from './MixQuestAnswer.Input'
import MixJudgeInput from './MixJudge.Input'
import MixBlankInput from './MixBlank.Input'
import {getLabelByIndex} from "../../../utils/utils";

const RadioGroup = Radio.Group;
class ModalAddSub extends React.Component {

    constructor(){
        super();
        this.state = {
            questType: 'singleChoice'
        }
    }

    onChange = (e) => {
        const questType = e.target.value;
        this.setState({
            questType: questType
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    handleSave = () => {
        const form = this.formRef.props.form;
        const { questType } = this.state
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields()
            values.questType = questType
            if ("singleChoice" === questType || "multiChoice" === questType){
                const choiceNum = values.choiceNum;
                const choiceItems = [];
                for (var i = 0; i < choiceNum; i++){
                    const label = getLabelByIndex(i)
                    const obj = {}
                    obj.label = label;
                    obj.value = values[label]
                    choiceItems.push(obj)
                    delete values[label]
                }
                values.choiceItems = choiceItems;
                form.setFieldsValue({choiceNum: choiceNum})
            }
            if ("blank" === questType){
                const answerNum = values.answerNum;
                const answers = [];
                for (var i = 1; i <= answerNum; i++){
                    const obj = {}
                    obj.index = i;
                    obj.value = values[i]
                    answers.push(obj);
                    delete values[i];
                }
                values.answer = answers;
                values.blankNumber = answers.length;
                form.setFieldsValue({answerNum: answerNum})
            }
            this.props.handleSave(values)
        });
    };

    getQuestTypeInput = () => {
        const { questType } = this.state
        if ("singleChoice" === questType)
            return (<MixSingleChoiceInput wrappedComponentRef={this.saveFormRef} />)
        if ("multiChoice" === questType)
            return (<MixMultiChoiceInput wrappedComponentRef={this.saveFormRef} />)
        if ("questAnswer" === questType)
            return (<MixQuestAnswerInput  wrappedComponentRef={this.saveFormRef} />)
        if ("judge" === questType)
            return (<MixJudgeInput  wrappedComponentRef={this.saveFormRef} />)
        if ("blank" === questType)
            return (<MixBlankInput  wrappedComponentRef={this.saveFormRef} />)
    }

    render() {
        return (
            <Modal
                width={800}
                title={this.props.title}
                visible={this.props.visible}
                confirmLoading={this.props.confirmLoading}
                onOk={this.handleSave}
                okText={<FormattedMessage id={"save"}/>}
                cancelText={<FormattedMessage id={"cancel"}/>}
                onCancel={this.props.onCancel}
            >
                <Row>
                    <Col span={15} offset={4}>
                        <RadioGroup defaultValue={"singleChoice"} onChange={this.onChange} buttonStyle="solid">
                            <Radio.Button value={"singleChoice"}><FormattedMessage id="singleChoice" /></Radio.Button>
                            <Radio.Button value={"multiChoice"}><FormattedMessage id="multiChoice" /></Radio.Button>
                            <Radio.Button value={"judge"}><FormattedMessage id="judge" /></Radio.Button>
                            <Radio.Button value={"blank"}><FormattedMessage id="blank" /></Radio.Button>
                            <Radio.Button value={"questAnswer"}><FormattedMessage id="questAnswer" /></Radio.Button>
                        </RadioGroup>
                    </Col>
                </Row>
                {
                    this.getQuestTypeInput()
                }
            </Modal>
        );
    }
}

export default ModalAddSub