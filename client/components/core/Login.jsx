import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { doAuthenticate } from "./actions";
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const FormItem = Form.Item;

class Login extends Component {

    componentDidUpdate() {
        const { auth: data = {}, history } = this.props;
        if (data.success && data.token) {   // 判断是否登陆
            localStorage.setItem('super_exams_token', data.token);
            history.push('/');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.doAuthenticate(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>Super Exams</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: this.props.intl.messages.signInTips }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={this.props.intl.messages.signInTips} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: this.props.intl.messages.signInPassTips }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={this.props.intl.messages.signInPassTips} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox><FormattedMessage id="remember" /></Checkbox>
                            )}
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                <FormattedMessage id="signIn" />
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a href=""><FormattedMessage id="register" /></a>
                                <a className="login-form-forgot" href="" style={{float: 'right'}}><FormattedMessage id="forgot" /></a>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.core.status,
        auth: state.core.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    doAuthenticate: (values) => dispatch(doAuthenticate(values))
})

Login.propTypes = {
    intl: intlShape.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(Login)));