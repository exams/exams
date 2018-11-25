import React, {Component} from 'react';
import { Card, Row, Col, List, Button } from 'antd';

class TemplateCard extends Component{

    state = {
        score: 0,
        difficulty: 0
    }

    componentDidMount() {
        const { template } = this.props;
        this.calculateScoreAndDifficulty(template);
    }

    calculateScoreAndDifficulty = (template) => {
        var score = 0;
        var difficulty = 0;
        var itemScore = 0;
        template.paperStructs.forEach((item) => {
            itemScore = item.score * item.number * item.type.questionNumber;
            score += itemScore;
        });
        template.paperStructs.forEach((item) => {
            itemScore = item.score * item.number * item.type.questionNumber;
            difficulty += itemScore / score * item.difficulty;
        });
        this.setState({
            score: score,
            difficulty: difficulty.toFixed(1)
        })
    }

    create = () => {
    }

    edit = () => {

    }

    copy = () => {

    }

    delete = () => {

    }

    render() {
        const { template } = this.props;
        const { score, difficulty } = this.state;
        return (
            <Card
                headStyle={{fontSize:20, fontWeight: 20}}
                title={template.name}
                extra={[
                    <Button type="primary" onClick={this.create} key="create" style={{marginRight: 20}}>生成试卷</Button>,
                    <Button.Group key="edit">
                        <Button icon="edit" onClick={this.edit} title={"修改"} />
                        <Button icon="copy" onClick={this.copy} title={"复制"} />
                        <Button icon="delete" onClick={this.delete} title={"删除"} />
                    </Button.Group>
                ]}
                style={{ margin: 10 }} >
                <Row>
                    <Col span={4}>
                        总分:
                    </Col>
                    <Col span={4}>
                        {score}
                    </Col>
                    <Col span={4}>
                        难度:
                    </Col>
                    <Col span={4}>
                        {difficulty}
                    </Col>
                </Row>

                <List
                    itemLayout="horizontal"
                    dataSource={template.paperStructs}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.type.name}
                            />
                            <div>难度{item.difficulty} 共{item.number}题 每题有{item.type.questionNumber}小题</div>
                            <div>每题{item.score}分, 共{item.score * item.number * item.type.questionNumber}分</div>
                        </List.Item>
                    )}
                />
            </Card>
        )
    }
}

export { TemplateCard }
