import React, {Component} from 'react';
import { Card, Row, Col, List, Button, Tag } from 'antd';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';

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
        template.paparStructs.forEach((item) => {
            itemScore = item.score * item.number * item.subQuestNum;
            score += itemScore;
        });
        template.paparStructs.forEach((item) => {
            itemScore = item.score * item.number * item.subQuestNum;
            difficulty += itemScore / score * item.difficulty;
        });
        this.setState({
            score: score,
            difficulty: difficulty.toFixed(1)
        })
    }

    create = () => {
        const { template } = this.props;
        var id = template._id;
        this.context.router.history.push('/app/papers/' + id);
    }

    edit = () => {

    }

    copy = () => {

    }

    delete = (template) => {
        this.props.delete(template)
    }

    getTags = (tags) => {
        console.log(tags)
        const tagLabels = [];
        tags && tags.map((item, index) => {
            tags.push(<Tag key={index}>{item.name}</Tag>)
        })
        return tagLabels
    }

    render() {
        const { template } = this.props;
        const { score, difficulty } = this.state;
        return (
            <Card
                headStyle={{fontSize:20, fontWeight: 20}}
                title={template.title}
                extra={[
                        <Button type="primary" onClick={this.create} key="create" style={{marginRight: 20}}><FormattedMessage id={"createPaper"} /></Button>,
                        <Button.Group key="edit">
                            <Button icon="edit" onClick={this.edit} title={this.props.intl.messages.edit} />
                            <Button icon="copy" onClick={this.copy} title={this.props.intl.messages.copy} />
                            <Button icon="delete" onClick={() => {this.delete(template)}} title={this.props.intl.messages.delete} />
                        </Button.Group>
                    ]}
                style={{ margin: 10 }}
            >
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
                    dataSource={template.paparStructs}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<FormattedMessage id={item.questType} />}
                            />
                            <Col span={4}>{item.alias}</Col>
                            <Col span={8}>{this.getTags(item.tags)}</Col>
                            <Col span={8}>
                                <div>难度{item.difficulty} 共{item.number}题 每题有{item.subQuestNum}小题</div>
                                <div>每题{item.score}分, 共{item.score * item.number * item.subQuestNum}分</div>
                            </Col>
                        </List.Item>
                    )}
                />
            </Card>
        )
    }
}

TemplateCard.contextTypes = {
    router: PropTypes.object.isRequired
}

export default injectIntl(TemplateCard)
