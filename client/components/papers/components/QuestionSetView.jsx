import React from 'react'
import PropTypes from 'prop-types'
import Choice from './Choice'

let questIndex = 0;
const getQuestIndex = () => {
    return ++questIndex;
}

const QuestionSetView = ({ QuestionSet }) => (
  <div>
      {
          (QuestionSet.questType === "singleChoice")
          && QuestionSet.questions.map((item) => {
              return (<Choice Choice={item} questIndex={getQuestIndex()}/>)
          })
      }
  </div>
)

QuestionSetView.propTypes = {
    Question: PropTypes.object.required
}

export default QuestionSetView
