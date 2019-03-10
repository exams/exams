import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Card, Col, List, Button, Tag, Popconfirm } from 'antd';
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
        template.paperStructs.forEach((item) => {
            itemScore = item.score * item.number * item.subQuestNum;
            score += itemScore;
        });
        template.paperStructs.forEach((item) => {
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

    getTitle = () => {
        const { template } = this.props;
        const { score, difficulty } = this.state;
        const titleLabels = [];
        titleLabels.push(<span key={"title"}>{template.title}</span>)
        titleLabels.push(<span key={"scoreTotal"} style={{marginLeft: 20, color:"red"}}><FormattedMessage id={"scoreTotal"} />{score}</span>)
        titleLabels.push(<span key={"difficulty"} style={{marginLeft: 20}}><FormattedMessage id={"difficulty"} />{difficulty}</span>)
        return titleLabels
    }

    render() {
        const { template } = this.props;
        const path = {
            pathname:'/app/papers/create',
            state: template
        }

        return (
            <Card
                title={this.getTitle()}
                extra={[
                        <Link to={path} key="create">
                            <Button type="primary" style={{marginRight: 20}}>
                                <FormattedMessage id={"createPaper"} />
                            </Button>
                        </Link>,
                        <Button.Group key="edit">
                            <Button icon="edit" onClick={this.edit} title={this.props.intl.messages.edit} />
                            <Button icon="copy" onClick={() => {this.props.copy(template)}} title={this.props.intl.messages.copy} />
                            <Popconfirm title={<FormattedMessage id="sureToDelete" />}
                                        onConfirm={() => {this.props.delete(template)}}
                                        okText={<FormattedMessage id="sure" />}
                                        cancelText={<FormattedMessage id="cancel" />}>
                                <Button icon="delete" title={this.props.intl.messages.delete} />
                            </Popconfirm>
                        </Button.Group>
                    ]}
                style={{ margin: 10 }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={template.paperStructs}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<FormattedMessage id={item.questType} />}
                            />
                            <Col span={4}>{item.alias}</Col>
                            <Col span={8}>
                                {
                                    item.tags && item.tags.map((item, index) => {
                                        return (<Tag key={index}>{item}</Tag>)
                                    })
                                }
                            </Col>
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
