import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { Row, Col } from 'antd';
import { deleteSingleChoice, listSingleChoice, listMultiChoice, listJudge, listBlank, listQuestAnswer, listmixing} from "./actions";
import SingleChoiceListView from "./containers/SingleChoiceList.View";
import QuestsFilterContainer from './containers/QuestsFilterContainer';

class Quests extends Component{

    constructor(){
        super();
        this.state = {
            subject: null,
            questType: 'singleChoice'
        }
    }

    componentDidMount() {
        this.props.listSingleChoice('Math');
    }

    deleteSingleChoice = (singleChoice) => {
        this.props.deleteSingleChoice(singleChoice);
    }

    getQuestType = () => {
        const { questType } = this.state

        if ('singleChoice' === questType){
            const { singleChoices } = this.props
            return (singleChoices && <SingleChoiceListView singleChoices = {singleChoices} />)
        }
    }

    render() {
        const { questType } = this.state
        const { singleChoices } = this.props
        return (
            <div>
                <QuestsFilterContainer />
                {
                    'singleChoice' === questType && singleChoices && <SingleChoiceListView deleteSingleChoice={this.deleteSingleChoice} singleChoices = {singleChoices} />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        singleChoices: state.quests.singleChoices,
        multiChoices: state.quests.multiChoices,
    }
}

const mapDispatchToProps = (dispatch) => ({
    listSingleChoice: (subject) => dispatch(listSingleChoice(subject)),
    deleteSingleChoice: (singleChoice) => dispatch(deleteSingleChoice(singleChoice)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quests));
