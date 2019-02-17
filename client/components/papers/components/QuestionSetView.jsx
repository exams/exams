import React from 'react'
import Choice from './Choice'
import Blank from './Blank'
import Judge from './Judge'
import QuestAnswer from './QuestAnswer'
import Mixing from './Mixing'

let questIndex = 1;

const setQuestIndex = (length) => {
    questIndex = questIndex + length
}

const resetQuestIndex = () => {
    questIndex = 1;
}

const QuestionSetView = ({ QuestionSet }) => (
  <div>
      {
          (QuestionSet.questType === "singleChoice" || QuestionSet.questType === "multiChoice") &&
          QuestionSet.questions && QuestionSet.questions.map((item, index) => {
              return (<Choice Choice={item} key={index} questIndex={questIndex + index}/>)
          })
      }
      {
          (QuestionSet.questType === "blank") &&
          QuestionSet.questions && QuestionSet.questions.map((item, index) => {
              return (<Blank Blank={item} key={index} questIndex={questIndex + index}/>)
          })
      }
      {
          (QuestionSet.questType === "judge") &&
          QuestionSet.questions && QuestionSet.questions.map((item, index) => {
              return (<Judge Judge={item} key={index} questIndex={questIndex + index} />)
          })
      }
      {
          (QuestionSet.questType === "questAnswer") &&
          QuestionSet.questions && QuestionSet.questions.map((item, index) => {
              return (<QuestAnswer QuestAnswer={item} key={index} questIndex={questIndex + index}/>)
          })
      }
      {
          (QuestionSet.questType === "mixing") &&
          QuestionSet.questions && QuestionSet.questions.map((item, index) => {
              return (<Mixing Mixing={item} key={index} questIndex={questIndex + index}/>)
          })
      }
      {
          QuestionSet.questions && setQuestIndex(QuestionSet.questions.length)
      }
  </div>
)

export default QuestionSetView
