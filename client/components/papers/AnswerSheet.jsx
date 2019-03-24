import React, { Component } from "react";
import { Stage } from "react-konva";
import NameBox from "./components/draw/NameBox";
import SheetBox from "./components/draw/SheetBox";
import TitleBox from "./components/draw/TitleBox";
import StudentNoBox from "./components/draw/StudentNoBox";
import SubjectBox from "./components/draw/SubjectBox";
import ScoreSumBox from "./components/draw/ScoreSumBox";

class AnswerSheet extends Component {
  render() {
    return (
      <Stage width={4200} height={2970}>
          <SheetBox {...{ x: 200, y: 200, width: 3800, height: 2570 }}/>
          <TitleBox />
          <NameBox {...{ x: 250, y: 350 }} />
          <StudentNoBox {...{ x: 600, y: 350, length: 10 }} />
          <SubjectBox {...{ x: 1450, y: 350 }} />
          <ScoreSumBox {...{ x: 1800, y: 350 }} />
      </Stage>
    );
  }
}
export default AnswerSheet
