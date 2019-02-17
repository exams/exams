import React from 'react'
import { FormattedMessage } from 'react-intl';
import Choice from './Choice'
import Blank from './Blank'
import Judge from './Judge'
import QuestAnswer from './QuestAnswer'

const Mixing = ({ Mixing, questIndex }) => (
  <div style={{margin: '0px 0px 20px 30px'}}>
      {
          Mixing &&
          <p>
              <span>{questIndex}</span>
              <FormattedMessage id={"pauseSymbol"} />
              <span>{Mixing.stem || Mixing.title }</span>
          </p>
      }
      {
          Mixing && Mixing.subQuests && Mixing.subQuests.map((item, index) => {
            if ('singleChoice' === item.value.questType || 'multiChoice' === item.value.questType){
              return (<Choice Choice={item.value} key={index} questIndex={item.index}/>)
            }
            if ('blank' === item.value.questType){
              return (<Blank Blank={item.value} key={index} questIndex={item.index}/>)
            }
            if ('judge' === item.value.questType){
              return (<Judge Judge={item.value} key={index} questIndex={item.index}/>)
            }
            if ('questAnswer' === item.value.questType){
              return (<QuestAnswer QuestAnswer={item.value} key={index} questIndex={item.index}/>)
            }
          })
      }
  </div>
)

export default Mixing
