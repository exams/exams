import React, {Component} from 'react';
import { Row, Col, List, Icon, Button, Input } from 'antd';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

class AddUser extends Component{

    render() {

        return (
            <div>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id="username"/>
                    </Col>
                    <Col span={8}>
                        <Input placeholder={this.props.intl.messages.usernamePlaceHolder} />
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id="password"/>
                    </Col>
                    <Col span={8}>
                        <Input type={"password"} placeholder={this.props.intl.messages.passwordPlaceHolder} />
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id="email"/>
                    </Col>
                    <Col span={8}>
                        <Input placeholder={this.props.intl.messages.emailPlaceHolder} />
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id="phone"/>
                    </Col>
                    <Col span={8}>
                        <Input placeholder={this.props.intl.messages.phonePlaceHolder} />
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id="role"/>
                    </Col>
                    <Col span={8}>
                        <Input placeholder={this.props.intl.messages.rolePlaceHolder} />
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id="subject"/>
                    </Col>
                    <Col span={8}>
                        <Input placeholder={this.props.intl.messages.subjectPlaceholder} />
                    </Col>
                </Row>
                <Row>
                    <Button onClick={this.props.addUser} icon={"plus"}><FormattedMessage id="submit"/></Button>
                </Row>
            </div>
        );
    }
}

export default injectIntl(AddUser);
