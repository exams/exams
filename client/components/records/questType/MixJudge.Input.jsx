import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Input, Radio, Row, Col } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
class MixJudgeInput extends Component{

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        return(
            <Form>
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
                <FormItem {...formItemLayout} label={<FormattedMessage id="answer" />}>
                    {getFieldDecorator('answer', {
                        rules: [{ required: true, message: this.props.intl.messages.answerPlaceholder }],
                    })(
                        <RadioGroup initialValue={"false"} buttonStyle="solid">
                            <Radio.Button value={true}><FormattedMessage id="right" /></Radio.Button>
                            <Radio.Button value={false}><FormattedMessage id="wrong" /></Radio.Button>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<FormattedMessage id="analysis" />}>
                    <Row>
                        <Col span={20}>
                            {getFieldDecorator('analysis')(
                                <TextArea placeholder={this.props.intl.messages.analysisPlaceholder} autosize={{ minRows: 3}} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        )
    }
}

MixJudgeInput.propTypes = {
    intl: intlShape.isRequired
};

export default Form.create()(injectIntl(MixJudgeInput))
