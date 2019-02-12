import React, { Component } from "react";
import { Stage } from "react-konva";
import SingleChoiceAnswerBox from "./components/SingleChoiceAnswerBox";
import AdmissionNumberBox from "./components/AdmissionNumberBox";
import NameBox from "./components/NameBox";

class AnswerSheet extends Component {
  render() {
    return (
      <Stage width={600} height={800}>
        <SingleChoiceAnswerBox {...{ x: 0, y: 0, index: 1 }} />
        <SingleChoiceAnswerBox {...{ x: 50, y: 0, index: 2 }} />
        <SingleChoiceAnswerBox {...{ x: 100, y: 0, index: 3 }} />
        <AdmissionNumberBox {...{ x: 200, y: 100, length: 5 }} />
        <NameBox {...{ x: 200, y: 300 }} />
      </Stage>
    );
  }
}
export default AnswerSheet
