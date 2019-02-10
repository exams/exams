import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, Tag, Input, Icon, Button} from 'antd';
import {addTag, listTags, deleteTag} from "../actions";
import {connect} from "react-redux";

class ModalTagManager extends React.Component {

    constructor(){
        super();
        this.state = {
            inputVisible: false,
            inputValue: '',
        };
    }

    componentDidMount = () => {
        const { subject, shared } = this.props;
        if (shared){
            this.props.listTags(null, true);
            return
        }

        if (!subject)
            return;
        this.props.listTags(subject._id);
    }

    handleClose = (removedTag) => {
        this.props.deleteTag(removedTag)
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        const { subject, tags, shared } = this.props;
        if (inputValue) {
            let tag = {name: inputValue}
            if (!shared)
                tag.subject = subject._id;
            this.props.addTag(tag)
            tags.push(tag)
        }
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input

    render() {
        const { tags } = this.props;
        const { inputVisible, inputValue } = this.state;

        return (
            <Modal
                width={760}
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                footer={<Button onClick={this.props.onCancel}><FormattedMessage id={"close"} /></Button>}
            >
                <p><FormattedMessage id={"tagUsage"} /></p>
                <p>1. <FormattedMessage id={"tagManagementNotes1"} /></p>
                <p>2. <FormattedMessage id={"tagManagementNotes2"} /></p>

                {
                    tags && tags.map((tag) => {
                        return (
                            <Tag key={tag._id} closable={true} afterClose={() => this.handleClose(tag)}>
                                {tag.name}
                            </Tag>
                        );
                    })
                }
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                        <Icon type="plus" /><FormattedMessage id={"newTag"}/>
                    </Tag>
                )}
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
    listTags: (subjectId, shared) => dispatch(listTags(subjectId, shared)),
    addTag: (tag) => dispatch(addTag(tag)),
    deleteTag: (tag) => dispatch(deleteTag(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalTagManager)