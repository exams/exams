import React, { Component } from "react";
import { Stage, Rect, Layer } from "react-konva";
import SingleChoiceAnswerBox from "./components/draw/SingleChoiceAnswerBox";
import AdmissionNumberBox from "./components/draw/AdmissionNumberBox";
import NameBox from "./components/draw/NameBox";
import SheetBox from "./components/draw/SheetBox";
import TitleBox from "./components/draw/TitleBox";
import StudentNoBox from "./components/draw/StudentNoBox";
import SubjectBox from "./components/draw/SubjectBox";
import ScoreSumBox from "./components/draw/ScoreSumBox";

class AnswerSheet extends Component {
  render() {
    return (
      <Stage width={4800} height={3600}>
          <SheetBox />
          <TitleBox />
          <NameBox {...{ x: 250, y: 350 }} />
          <StudentNoBox {...{ x: 650, y: 350, length: 10 }} />
          <SubjectBox {...{ x: 1750, y: 350 }} />
          <ScoreSumBox {...{ x: 2150, y: 350 }} />
      </Stage>
    );
  }
}
export default AnswerSheet
