import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, Button, Row, Col, Input} from 'antd';

class ModalAliasSetter extends React.Component {

    constructor(){
        super();
        this.state = {
            alias: ""
        };
    }

    setAlias = () => {
        const { alias } = this.state;
        this.props.setAlias(alias)
    }

    handleInputChange = (e) => {
        this.setState({ alias: e.target.value });
    }

    saveInputRef = input => this.input = input

    render() {
        const { alias } = this.state;
        return (
            <Modal
                width={420}
                title={<FormattedMessage id={"setAlias"} />}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                footer={<Button onClick={this.setAlias}><FormattedMessage id={"close"} /></Button>}
            >
                <Row span={18}>
                    <FormattedMessage id={"AliasDescription"} />
                </Row>
                <Row>
                    <Col span={18}>
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            value={alias}
                            onChange={this.handleInputChange}
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default ModalAliasSetter