import React, {Component} from 'react';
import { Table } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {FormattedMessage} from 'react-intl';

let dragingIndex = -1;

class BodyRow extends Component {
    render() {
        const {
            isOver,
            connectDragSource,
            connectDropTarget,
            moveRow,
            ...restProps
        } = this.props;
        const style = { ...restProps.style, cursor: 'move' };

        let className = restProps.className;
        if (isOver) {
            if (restProps.index > dragingIndex) {
                className += ' drop-over-downward';
            }
            if (restProps.index < dragingIndex) {
                className += ' drop-over-upward';
            }
        }

        return connectDragSource(
            connectDropTarget(
                <tr
                    {...restProps}
                    className={className}
                    style={style}
                />
            )
        );
    }
}

const rowSource = {
    beginDrag(props) {
        dragingIndex = props.index;
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

const DragableBodyRow = DropTarget(
    'row',
    rowTarget,
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }),
)(
    DragSource(
        'row',
        rowSource,
        (connect) => ({
            connectDragSource: connect.dragSource(),
        }),
    )(BodyRow),
);

const columns = [{
    title: <FormattedMessage id={"questType"} />,
    dataIndex: 'questType',
},{
    title: <FormattedMessage id="alias" />,
    dataIndex: 'alias'
},{
    title: <FormattedMessage id="number" />,
    dataIndex: 'number',
},{
    title: <FormattedMessage id="score" />,
    dataIndex: 'score',
},{
    title: <FormattedMessage id="difficulty" />,
    dataIndex: 'difficulty'
},{
    title: <FormattedMessage id="subQuestNum" />,
    dataIndex: 'subQuestNum'
},{
    title: <FormattedMessage id="tag" />,
    dataIndex: 'tags'
},{
    title: <FormattedMessage id="edit" />,
    dataIndex: 'difficulty'
}];

class QuestionTypeList extends Component {
    state = {
        data: [{
            questType: 'singleChoice',
            subQuestNum: 1,
            difficulty: 3,
            number: 10,
            score: 2,
            alias: "",
            tags: []
        },{
            questType: 'multiChoice',
            subQuestNum: 1,
            difficulty: 3,
            number: 10,
            score: 2,
            alias: "",
            tags: []
        }],
    }

    components = {
        body: {
            row: DragableBodyRow,
        },
    }

    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];

        this.setState(
            update(this.state, {
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    }

    render() {
        return (
            <Table
                columns={columns}
                dataSource={this.state.data}
                components={this.components}
                size={"small"}
                pagination={false}
                onRow={(record, index) => ({
                    index,
                    moveRow: this.moveRow,
                })}
            />
        );
    }
}

export default DragDropContext(HTML5Backend)(QuestionTypeList);