import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Modal, Form, Radio} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class ModalAnswerSheetCreator extends React.Component {

    handleSave = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const answerSheet = {
                    paperSize: values.paperSize
                }
                this.props.handleCreate(answerSheet);
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
                title={<FormattedMessage id="createAnswerSheet" />}
                visible={this.props.visible}
                onOk={this.handleSave}
                okText={<FormattedMessage id={"sure"} />}
                cancelText={<FormattedMessage id={"cancel"} />}
                onCancel={this.props.onCancel}
            >
                <p><span className="ant-form-text"><FormattedMessage id="printTips" /></span></p>
                <Form>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="paperSize" />}>
                        {getFieldDecorator('paperSize', {
                            rules: [{ required: true }],
                        })(
                            <RadioGroup onChange={this.onChange} value={"A4"}>
                                <Radio value={"A4"}>A4</Radio>
                                <Radio value={"A3"}>A3</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(injectIntl(ModalAnswerSheetCreator))