import React, {Component} from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUser extends Component{

    addUser = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.email = 'xxxxxx@' + Math.random()*10;
                values.firstName = 'mmmmm' + Math.random()*10;
                values.lastName = 'mmmmm' + Math.random()*10;
                const subjects = this.getSubjects(values.subjects);
                values.subjects = subjects;
                values.username = values.username_create;
                values.password = values.password_create;
                delete values.username_create;
                delete values.password_create;
                this.props.addUser(values)
            }
        });
    }

    getSubjects = (subjectIds) => {
        const { subjects } = this.props;
        const newSubjects = [];
        subjects && subjects.map((item) => {
            if (subjectIds.indexOf(item._id) > 0){
                newSubjects.push(item)
            }
        })
        return newSubjects;
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
            children.push(<Option key={item._id}>{item.name}</Option>);
        })

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={6}>
                        <FormItem {...formItemLayout} label={<FormattedMessage id="username" />}>
                            {getFieldDecorator('username_create')(
                                <Input placeholder={this.props.intl.messages.usernamePlaceHolder}/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem {...formItemLayout} label={<FormattedMessage id="password" />}>
                            {getFieldDecorator('password_create')(
                                <Input type={"password"} placeholder={this.props.intl.messages.passwordPlaceHolder} />
                            )}
                        </FormItem>
                    </Col>

                    <Col span={5}>
                        <FormItem {...formItemLayout} label={<FormattedMessage id="role" />}>
                            {getFieldDecorator('roles')(
                                <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder={this.props.intl.messages.rolePlaceHolder}
                                >
                                    <Option key={"user"}>{<FormattedMessage id="teacher" />}</Option>
                                    <Option key={"admin"}>{<FormattedMessage id="admin" />}</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={5}>
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
                    <Col span={2}>
                        <Button onClick={this.addUser} icon={"plus"}><FormattedMessage id="submit"/></Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(injectIntl(AddUser));
