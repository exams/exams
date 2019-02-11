import React from 'react'
import PropTypes from 'prop-types'
import { getLabelByIndex } from '../../../utils/utils'

const Choice = ({ Choice, questIndex }) => (
  <div>
      <p>{questIndex}. {Choice.stem || Choice.title }</p>
      {
          Choice.choiceItems.map((item, index) => {
              return(
                  item && <div>
                    <span>{getLabelByIndex(index)}</span>
                    <span>{item[getLabelByIndex(index)] || item[index + 1]}</span>
                  </div>
              )
          })
      }
  </div>
)

Choice.propTypes = {
    SingleChoice: PropTypes.object.required,
    questIndex: PropTypes.number.required
}

export default Choice
