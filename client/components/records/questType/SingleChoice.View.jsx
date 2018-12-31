import React, {Component} from 'react';
import { Button, Row, Col, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import {connect} from "react-redux";

class SingleChoiceView extends Component{

    showStatus = () => {
        const { status } = this.props
        console.log(status)
        if ( status === 'success' )
            return(<Icon type="check" style={{color: "#52c41a"}} />)
        else if (status === 'failed'){
            return ( <Icon type="warning" style={{color: "#eb2f96"}} />)
        } else {
            return (<Icon type="loading" />)
        }
    }

    getLabel = () => {
        return ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
    }

    convertLabel = (label) => {
        return this.getLabel()[label]
    }

    render() {
        const { singleChoice } = this.props
        return(
            <div>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"recordStatus"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {this.showStatus()}
                    </Col>
                    <Col span={4}>
                        <Icon type="check" style={{color: "#52c41a"}} />
                        <FormattedMessage id={"success"} />
                    </Col>
                    <Col span={4}>
                        <Icon type="loading" />
                        <FormattedMessage id={"loading"} />
                    </Col>
                    <Col span={4}>
                        <Icon type="warning" style={{color: "#eb2f96"}} />
                        <FormattedMessage id={"failed"} />
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"subject"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {singleChoice.subject}
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id={"difficulty"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {singleChoice.difficulty}
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"stem"} style={{float: "right"}} />
                    </Col>
                    <Col span={20}>
                        {singleChoice.title}
                    </Col>
                </Row>
                {
                    singleChoice.choiceItems.map((item) => {
                        return(
                            <Row key={item.label}>
                                <Col span={6}>
                                    {
                                        this.convertLabel(item.label)
                                    }
                                </Col>
                                <Col span={18}>
                                    {item.value}
                                </Col>
                            </Row>
                        )
                    })
                }
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"answer"} style={{float: "right"}} />
                    </Col>
                    <Col>
                        {
                            this.convertLabel(singleChoice.answer)
                        }
                    </Col>
                </Row>

                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"analysis"} />
                    </Col>
                    <Col>
                        {singleChoice.analysis}
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"isReal"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {singleChoice.isReal}
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id={"isRealDescription"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {singleChoice.description}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Button type={"primary"} onClick={this.props.handleAddNew} icon={"plus"}>
                            <FormattedMessage id={"continueAddNext"} />
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button type={"primary"} onClick={this.props.delete} icon={"delete"}>
                            <FormattedMessage id={"delete"} />
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button type={"primary"} onClick={this.props.edit} icon={"edit"}>
                            <FormattedMessage id={"edit"} />
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         singleChoice: getSingleChoice(state)
//     }
// }

export default connect()(SingleChoiceView)
