import React, {Component} from 'react';
import { Card, Icon, Slider, InputNumber, Row, Col } from 'antd';

class TemplateCard extends Component{

    state = {
        isEdit: false,
        difficulty: 0
    }

    onDifficultyChange = (value) => {
        this.setState({
            difficulty: value
        })
    }

    editClick = () => {
        this.setState({
            isEdit: true
        })
    }

    render() {
        const { template } = this.props;
        return (
            <Card
                title={template.name}
                actions={[<Icon type="edit" onClick={this.editClick} />,<Icon type="copy" />,<Icon type="delete" />, <Icon type="profile" />]}
                style={{ width: 400 }} >
                <Row>
                    <Col span={4}>
                        总分:
                    </Col>
                    <Col>
                        30
                    </Col>
                </Row>

                <Row>
                    <Col span={4}>
                        难度:
                    </Col>
                    <Col span={16}>
                        <Slider
                            disabled={this.state.isEdit ? false : true}
                            min={1}
                            max={10}
                            onChange={this.onDifficultyChange}
                            value={typeof template.difficulty === 'number' ? template.difficulty : 0} />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={10}
                            value={template.difficulty}
                            onChange={this.onDifficultyChange}
                            style={{ width: 30 }}
                        />
                    </Col>
                </Row>

                {
                    template.paperStructs.map((questType, key) => {
                        return (
                            <Row key={key}>
                                <Col span={8}>
                                    {questType.name}
                                </Col>
                                <Col span={8}>
                                    {questType.number}
                                </Col>
                                <Col span={8}>
                                    {questType.difficult}
                                </Col>
                            </Row>
                        )
                    })}

            </Card>
        )
    }
}

export { TemplateCard }
