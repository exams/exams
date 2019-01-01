import React, {Component} from 'react';
import { Form, Row, Col, List, Icon, Button, Input, Select } from 'antd';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUser extends Component{

    handleSubjectSelect = (value) => {
        console.log(`selected ${value}`);
    }

    addUser = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addUser(values)
            }
        });
    }

    render() {
        const { subjects } = this.props
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        }

        const children = [];
        subjects && subjects.map((item) => {
            children.push(<Option key={item.subjectCode}>{item.name}</Option>);
        })

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label={<FormattedMessage id="username" />}>
                            {getFieldDecorator('username')(
                                <Input placeholder={this.props.intl.messages.usernamePlaceholder}/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem {...formItemLayout} label={<FormattedMessage id="password" />}>
                            {getFieldDecorator('password')(
                                <Input type={"password"} placeholder={this.props.intl.messages.passwordPlaceHolder} />
                            )}
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem {...formItemLayout} label={<FormattedMessage id="role" />}>
                            {getFieldDecorator('role')(
                                <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder={this.props.intl.messages.rolePlaceHolder}
                                onChange={this.handleSubjectSelect}
                                >
                                    <Option key={"teacher"}>{<FormattedMessage id="teacher" />}</Option>
                                    <Option key={"admin"}>{<FormattedMessage id="administrator" />}</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem {...formItemLayout} label={<FormattedMessage id="subject" />}>
                            {getFieldDecorator('subject')(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder={this.props.intl.messages.subjectPlaceholder}
                                    onChange={this.handleSubjectSelect}
                                >
                                    {children}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Button onClick={this.addUser} icon={"plus"}><FormattedMessage id="submit"/></Button>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(injectIntl(AddUser));
