import React from 'react'
import PropTypes from 'prop-types'
import { getLabelByIndex } from '../../../utils/utils'

const SingleChoice = ({ SingleChoice }) => (
  <div>
      <p>{SingleChoice.stem || SingleChoice.title }</p>
      {
          SingleChoice.choiceItems.map((item, index) => {
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

SingleChoice.propTypes = {
    SingleChoice: PropTypes.object.required
}

export default SingleChoice
