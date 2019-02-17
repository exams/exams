import React from 'react'
import { FormattedMessage } from 'react-intl';

const Blank = ({ Blank, questIndex }) => (
  <div style={{margin: '0px 0px 20px 30px'}}>
      {
          Blank &&
          <p>
              <span>{questIndex}</span>
              <FormattedMessage id={"pauseSymbol"} />
              <span>{Blank.stem || Blank.title }</span>
          </p>
      }
  </div>
)

export default Blank
