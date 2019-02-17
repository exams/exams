import React from 'react'
import { FormattedMessage } from 'react-intl';

const Judge = ({ Judge, questIndex }) => (
  <div style={{margin: '0px 0px 20px 30px'}}>
      {
          Judge &&
          <p>
              <span>{questIndex}</span>
              <FormattedMessage id={"pauseSymbol"} />
              <span>{Judge.stem || Judge.title }</span>
          </p>
      }
  </div>
)

export default Judge
