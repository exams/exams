import React from 'react'
import { FormattedMessage } from 'react-intl';

const QuestionSetHeader = ({ QuestionSet, questionSetIndex }) => (
  <p style={{margin: '10px', fontSize: '16px'}}>
      <span><FormattedMessage id={"pNumber" + (questionSetIndex + 1).toString()} /></span>
      <span><FormattedMessage id={"pauseSymbol"} /></span>
      <span>{QuestionSet.alias ? QuestionSet.alias : <FormattedMessage id={QuestionSet.questType} /> }</span>
      <span><FormattedMessage id={"colon"} /></span>
      <span><FormattedMessage id={"sumPrefix"} />{QuestionSet.number}<FormattedMessage id={"questSuffix"} />
          <span><FormattedMessage id={"comma"} /></span>
          <FormattedMessage id={"perQuestPrefix"} />{QuestionSet.score}<FormattedMessage id={"scoreSuffix"} />
      </span>
  </p>
)

export default QuestionSetHeader
