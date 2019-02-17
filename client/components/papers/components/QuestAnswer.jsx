import React from 'react'
import { FormattedMessage } from 'react-intl';

const QuestAnswer = ({ QuestAnswer, questIndex }) => (
  <div style={{margin: '0px 0px 20px 30px'}}>
      {
          QuestAnswer &&
          <p>
              <span>{questIndex}</span>
              <FormattedMessage id={"pauseSymbol"} />
              <span>{QuestAnswer.stem || QuestAnswer.title }</span>
          </p>
      }
  </div>
)

export default QuestAnswer
