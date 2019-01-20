import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Modal, Radio, Row, Col} from 'antd';

const RadioGroup = Radio.Group;
class ModalTagManager extends React.Component {

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
                <p><FormattedMessage id={"tagManagementNotes"}/></p>
            </Modal>
        );
    }
}

export default ModalTagManager