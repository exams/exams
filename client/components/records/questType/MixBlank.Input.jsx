import React, {Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
class MixBlankInput extends Component{

    constructor(){
        super();
        this.state = {
            answerNum: 1
        }
    }

    componentDidMount() {
        this.props.form.setFieldsValue({answerNum: this.state.answerNum})
    }

    addAnswerNum = () => {
        const answerNumVal = this.state.answerNum;
        this.setState({answerNum: answerNumVal + 1})
        this.props.form.setFieldsValue({answerNum: answerNumVal + 1})
    }

    delAnswerNum = () => {
        const answerNumVal = this.state.answerNum;
        if (answerNumVal > 1){
            this.setState({answerNum: answerNumVal- 1})
            this.props.form.setFieldsValue({answerNum: answerNumVal - 1})
        }
    }

    getAnswerItemArray = () => {
        const answerNum = this.state.answerNum;
        var answerNumRes = [];
        for (var i = 1; i <= answerNum; i++){
            answerNumRes.push({index: i})
        }
        return answerNumRes;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        return(
            <Form>
                {getFieldDecorator('answerNum')(
                    <Input type='hidden'/>
                )}
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
                {
                    this.getAnswerItemArray().map((item) => {
                        const index = item.index;
                        return(
                            <FormItem {...formItemLayout} label={index.toString()} key={index}>
                                <Row>
                                    <Col span={20}>
                                        {getFieldDecorator(index.toString(), {
                                            rules: [{ required: true, message: this.props.intl.messages.answerPlaceholder }],
                                        })(
                                            <Input placeholder={this.props.intl.messages.answerPlaceholder} />
                                        )}
                                    </Col>
                                    <Col span={1}>
                                        {index > 1 && <Button icon={"minus"} onClick={this.delAnswerNum}  style={{marginLeft: '5px'}} />}
                                    </Col>
                                </Row>
                            </FormItem>
                        )
                    })
                }
                <Row>
                    <Col span={15} offset={4}>
                        <Button icon={"plus"} onClick={this.addAnswerNum} style={{width: '100%'}}>
                            <FormattedMessage id="addChoiceItem" />
                        </Button>
                    </Col>
                </Row>
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

MixBlankInput.propTypes = {
    intl: intlShape.isRequired
};

export default Form.create()(injectIntl(MixBlankInput))
