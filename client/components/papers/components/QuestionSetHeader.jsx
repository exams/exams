import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';
import { getChineseNumberByIndex } from '../../../utils/utils'

const QuestionSetHeader = ({ QuestionSet, questionSetIndex }) => (
  <div>
      <span>{getChineseNumberByIndex(questionSetIndex)}</span><span>{QuestionSet.alias ? QuestionSet.alias : <FormattedMessage id={QuestionSet.questType} /> }</span>
      <span><FormattedMessage id={"sumPrefix"} />{QuestionSet.number}<FormattedMessage id={"questSuffix"} />
          <FormattedMessage id={"perQuestPrefix"} />{QuestionSet.score}<FormattedMessage id={"scoreSuffix"} />
      </span>
  </div>
)

QuestionSetHeader.propTypes = {
    QuestionSet: PropTypes.object.required,
    questionSetIndex: PropTypes.number.required
}

export default QuestionSetHeader
