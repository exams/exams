import React from 'react'
import { FormattedMessage } from 'react-intl';

const Choice = ({ Choice, questIndex }) => (
  <div style={{margin: '0px 0px 20px 30px'}}>
      {
          Choice &&
          <p>
              <span>{questIndex}</span>
              <FormattedMessage id={"pauseSymbol"} />
              <span>{Choice.stem || Choice.title }</span>
          </p>
      }
      {
          Choice && Choice.choiceItems.map((item, index) => {
              return(
                  item &&
                  <div key={index}>
                    <span>{item.label}</span><FormattedMessage id={"colon"} />
                    <span>{item.value}</span>
                  </div>
              )
          })
      }
  </div>
)

export default Choice
