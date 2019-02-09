import React, {Component} from 'react';
import { List, Icon, Row, Col } from 'antd';
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
                            <span onClick={() => {this.delete(item)}}><Icon type="delete" style={{ marginRight: 8 }} />
                                <FormattedMessage id={"delete"} />
                            </span>
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