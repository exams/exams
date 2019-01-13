import React, {Component} from 'react';
import { Button, Row, Col, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';

class JudgeView extends Component{

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

    getSubjects = (subject) => {
        const { subjects } = this.props;
        console.log(subjects)
        console.log(subject)
        let newSubject = null;
        subjects && subjects.map((item) => {
            if (subject === item._id){
                newSubject = item
            }
        })
        return newSubject;
    }

    render() {
        const { judge } = this.props

        return(
            <div>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"recordStatus"} style={{float: "right"}} />
                        {this.showStatus()}
                    </Col>
                    <Col span={2}>
                        <span><Icon type="check" style={{color: "#52c41a", marginRight: 8}} /><FormattedMessage id={"success"} /></span>
                    </Col>
                    <Col span={2}>
                        <span><Icon type="loading" style={{marginRight: 8}} /><FormattedMessage id={"loading"} /></span>
                    </Col>
                    <Col span={2}>
                        <span><Icon type="warning" style={{color: "#eb2f96", marginRight: 8}} /><FormattedMessage id={"failed"} /></span>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"subject"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {this.getSubjects(judge.subject).name}
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id={"difficulty"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {judge.difficulty}
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"stem"} style={{float: "right"}} />
                    </Col>
                    <Col span={20}>
                        {judge.stem}
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"answer"} style={{float: "right"}} />
                    </Col>
                    <Col>
                        {judge.answer ? <FormattedMessage id={"right"} /> : <FormattedMessage id={"wrong"} />}
                    </Col>
                </Row>

                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"analysis"} />
                    </Col>
                    <Col>
                        {judge.analysis}
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <FormattedMessage id={"isReal"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {judge.isReal}
                    </Col>
                    <Col span={4}>
                        <FormattedMessage id={"isRealDescription"} style={{float: "right"}} />
                    </Col>
                    <Col span={8}>
                        {judge.description}
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

export default JudgeView
