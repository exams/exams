import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { List, Icon } from 'antd';
import {addSubject, listSubjects} from "./actions";
import { FormattedMessage } from 'react-intl';

class Subjects extends Component{
    componentDidMount() {
        this.props.listSubjects()
    }

    render() {
        const { subjects, match } = this.props

        return (
            <List
                itemLayout="horizontal"
                dataSource={subjects}
                renderItem={item => (
                    <List.Item actions={[<a><Icon type={"edit"} /> <FormattedMessage id="edit" /></a>, <a><Icon type={"delete"} /> <FormattedMessage id="delete" /></a>]}>
                        <List.Item.Meta
                            title={<Link to={match.url + '/' + item.id}>{item.name}</Link>}
                            onClick={this.goDetail}
                        />
                        <span>{item.isDefault ? <FormattedMessage id="systemDefault" />: <FormattedMessage id="userDefinition" />}</span>
                    </List.Item>
                )}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects.subjects
    }
}

const mapDispatchToProps = (dispatch) => ({
    listSubjects: () => dispatch(listSubjects()),
    addSubject: (subject) => dispatch(addSubject(subject))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subjects));
