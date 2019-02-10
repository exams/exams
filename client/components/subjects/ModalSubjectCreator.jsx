import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Modal,Input, Form} from 'antd';

const FormItem = Form.Item;
class ModalAliasSetter extends React.Component {

    handleSave = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const subject = {
                    name: values.subjectName,
                    code: values.subjectCode
                }
                this.props.handleCreate(subject);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }

        return (
            <Modal
                width={420}
                title={<FormattedMessage id="createSubject" />}
                visible={this.props.visible}
                onOk={this.handleSave}
                okText={<FormattedMessage id={"save"}/>}
                cancelText={<FormattedMessage id={"cancel"}/>}
                onCancel={this.props.onCancel}
            >
                <Form>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="subjectName" />}>
                        {getFieldDecorator('subjectName', {
                            rules: [{ required: true, message: this.props.intl.messages.subjectNamePlaceholder }],
                        })(
                            <Input placeholder={this.props.intl.messages.subjectNamePlaceholder}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="subjectCode" />}>
                        {getFieldDecorator('subjectCode')(
                            <Input placeholder={this.props.intl.messages.subjectCodePlaceholder} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(injectIntl(ModalAliasSetter))