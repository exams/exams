import React, {Component} from 'react';
import { List, Icon, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

class SingleChoiceListView extends Component{

    render() {
        const { singleChoices } = this.props

        const IconText = ({ type, text }) => (
            <span><Icon type={type} style={{ marginRight: 8 }} />{text}</span>
        );

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
                        actions={[<IconText type="edit" text={<FormattedMessage id={"edit"} />} />, <IconText type="delete" text={<FormattedMessage id={"delete"} />} />]}
                    >
                        <a href={item.href}>{item.title}</a>
                    </List.Item>
                )}
            />
        )
    }
}

export default SingleChoiceListView