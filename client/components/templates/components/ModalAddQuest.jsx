import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Modal, Radio, Row, Col} from 'antd';

const RadioGroup = Radio.Group;
class ModalAddQuest extends React.Component {

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
            this.props.handleSave(values)
            form.resetFields()
        });
    };

    getQuestTypeInput = () => {
        const { questType } = this.state

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
                            <Radio.Button value={"mixing"}><FormattedMessage id="mixing" /></Radio.Button>
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

export default ModalAddQuest