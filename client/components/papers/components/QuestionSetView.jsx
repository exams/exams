import React from 'react'
import PropTypes from 'prop-types'
import SingleChoice from './SingleChoice'
import { FormattedMessage } from 'react-intl';

const QuestionSetView = ({ QuestionSet }) => (
  <div>
      {
          QuestionSet.questType === "singleChoice" && QuestionSet.questions.map(item => {
              return (<SingleChoice SingleChoice={item} />)
          })
      }
  </div>
)

QuestionSetView.propTypes = {
    Question: PropTypes.object.required
}

export default QuestionSetView
