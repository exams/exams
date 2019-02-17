import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, Tag, Button, Row, Col} from 'antd';
import { listTags } from "../actions";
import {connect} from "react-redux";

const CheckableTag = Tag.CheckableTag;
class ModalTagSelector extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedTags: []
        };
    }

    handleChange = (tag, checked) => {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked
            ? [...selectedTags, tag.name]
            : selectedTags.filter(t => t !== tag.name);
        console.log(nextSelectedTags)
        this.setState({ selectedTags: nextSelectedTags });
    }

    saveSelectTags = () => {
        const { selectedTags } = this.state
        this.props.handleSelect(selectedTags)
    }

    componentDidMount = () => {
        const { subjectId } = this.props;
        if (!subjectId)
            return;
        this.props.listTags(subjectId, true);
    }

    render() {
        const { tags } = this.props;
        const sharedTags = [];
        const subjectTags = [];
        tags && tags.map((tag) => {
            if (tag.subject)
                subjectTags.push(tag)
            else
                sharedTags.push(tag)
        })

        const { selectedTags } = this.state;
        return (
            <Modal
                width={760}
                title={<FormattedMessage id="selectTags"/>}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                footer={<Button onClick={this.saveSelectTags}><FormattedMessage id={"close"} /></Button>}
            >
                <Row>
                    <Col span={3}><FormattedMessage id={"sharedTag"} /></Col>
                    <Col span={21}>
                        {
                            sharedTags && sharedTags.map((tag) => {
                                return (
                                    <CheckableTag key={tag._id} checked={selectedTags.indexOf(tag.name) > -1}
                                                  onChange={checked => this.handleChange(tag, checked)}
                                    >{tag.name}</CheckableTag>
                                );
                            })
                        }
                    </Col>
                </Row>
                <Row>
                    <Col span={3}><FormattedMessage id={"subjectTag"} /></Col>
                    <Col span={20}>
                        {
                            subjectTags && subjectTags.map((tag) => {
                                return (
                                    <CheckableTag key={tag._id} checked={selectedTags.indexOf(tag.name) > -1}
                                                  onChange={checked => this.handleChange(tag, checked)}
                                    >{tag.name}</CheckableTag>
                                );
                            })
                        }
                    </Col>
                </Row>

            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tags: state.subjects.tags
    }
}

const mapDispatchToProps = (dispatch) => ({
    listTags: (subjectId, shared) => dispatch(listTags(subjectId, shared))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalTagSelector)