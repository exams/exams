import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Modal, Row, Col, Input, Radio, Select} from 'antd';
import MixSingleChoiceInput from './MixSingleChoice.Input'
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
            console.log(values)
            if ("singleChoice" === questType){
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
                values.questType = questType
            }
            this.props.handleSave(values)
            form.resetFields();
        });
    };

    getQuestTypeInput = () => {
        const { questType } = this.state
        if ("singleChoice" === questType)
            return (<MixSingleChoiceInput wrappedComponentRef={this.saveFormRef}/>)
        if ("multiChoice" === questType)
            return (<MixSingleChoiceInput />)
        if ("judge" === questType)
            return (<MixSingleChoiceInput />)
    }

    render() {
        // const {getFieldDecorator} = this.props.form;
        // const formItemLayout = {
        //     labelCol: {span: 6},
        //     wrapperCol: {span: 18},
        // };
        return (
            <Modal
                width={740}
                title={this.props.title}
                visible={this.props.visible}
                confirmLoading={this.props.confirmLoading}
                onOk={this.handleSave}
                okText={<FormattedMessage id={"save"}/>}
                cancelText={<FormattedMessage id={"cancel"}/>}
                onCancel={this.props.onCancel}
            >
                <RadioGroup defaultValue={"singleChoice"} onChange={this.onChange} buttonStyle="solid">
                    <Radio.Button value={"singleChoice"}><FormattedMessage id="singleChoice" /></Radio.Button>
                    <Radio.Button value={"multiChoice"}><FormattedMessage id="multiChoice" /></Radio.Button>
                    <Radio.Button value={"judge"}><FormattedMessage id="judge" /></Radio.Button>
                    <Radio.Button value={"blank"}><FormattedMessage id="blank" /></Radio.Button>
                    <Radio.Button value={"questAnswer"}><FormattedMessage id="questAnswer" /></Radio.Button>
                </RadioGroup>
                {
                    this.getQuestTypeInput()
                }
            </Modal>
        );
    }
}

export default ModalAddSub