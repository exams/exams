import React, {Component} from 'react';
import { Form, Row, Col, List, Icon, Button, Input, Select } from 'antd';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUser extends Component{

    addUser = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.email = 'xxxxxx@' + Math.random()*10
                values.firstName = 'mmmmm' + Math.random()*10
                values.lastName = 'mmmmm' + Math.random()*10
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
                            {getFieldDecorator('roles')(
                                <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder={this.props.intl.messages.rolePlaceHolder}
                                >
                                    <Option key={"teacher"}>{<FormattedMessage id="teacher" />}</Option>
                                    <Option key={"admin"}>{<FormattedMessage id="administrator" />}</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem {...formItemLayout} label={<FormattedMessage id="subject" />}>
                            {getFieldDecorator('subjects')(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder={this.props.intl.messages.subjectPlaceholder}
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
