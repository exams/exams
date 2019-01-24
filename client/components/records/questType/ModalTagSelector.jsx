import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, Tag, Icon, Button} from 'antd';
import { listTags } from "../../subjects/actions";
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
            ? [...selectedTags, tag]
            : selectedTags.filter(t => t !== tag);
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
        this.props.listTags(subjectId);
    }

    render() {
        const { tags } = this.props;
        const { selectedTags } = this.state;
        return (
            <Modal
                width={760}
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                footer={<Button onClick={this.saveSelectTags}><FormattedMessage id={"close"} /></Button>}
            >
                {
                    tags && tags.map((tag) => {
                        return (
                            <CheckableTag key={tag._id} checked={selectedTags.indexOf(tag) > -1}
                                          onChange={checked => this.handleChange(tag, checked)}
                            >{tag.name}</CheckableTag>
                        );
                    })
                }
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
    listTags: (subjectId) => dispatch(listTags(subjectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalTagSelector)