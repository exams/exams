import React, {Component} from 'react';
import { List, Icon, Popconfirm } from 'antd';
import { FormattedMessage } from 'react-intl';

class SingleChoiceListView extends Component{

    delete = (singleChoice) =>{
        this.props.deleteSingleChoice(singleChoice);
    }

    render() {
        const { singleChoices } = this.props

        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {

                    },
                    pageSize: 10,
                }}
                dataSource={singleChoices}
                renderItem={item => (
                    <List.Item
                        key={item._id}
                        actions={[<span><Icon type="edit" style={{ marginRight: 8 }} /><FormattedMessage id={"edit"} /></span>,
                            <Popconfirm title={<FormattedMessage id="sureToDelete" />}
                                        onConfirm={() => {this.delete(item)}}
                                        okText={<FormattedMessage id="sure" />}
                                        cancelText={<FormattedMessage id="cancel" />}>
                                <span><Icon type="delete" style={{ marginRight: 8 }} />
                                    <FormattedMessage id={"delete"} />
                                </span>
                            </Popconfirm>
                            ]}
                    >
                        <a href={item.href}>{item.title}</a>
                    </List.Item>
                )}
            />
        )
    }
}

export default SingleChoiceListView