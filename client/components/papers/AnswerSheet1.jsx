import React, { Component } from "react";
import { Stage } from "react-konva";
import NameBoxA4 from "./components/draw/NameBoxA4";
import SheetBox from "./components/draw/SheetBox";
import TitleBoxA4 from "./components/draw/TitleBoxA4";
import StudentNoBoxA4 from "./components/draw/StudentNoBoxA4";
import HeaderInfoBoxA4 from "./components/draw/HeaderInfoBoxA4";
import ScoreSumBox from "./components/draw/ScoreSumBox";

class AnswerSheet extends Component {
  render() {
    return (
      <Stage width={4200} height={2970}>
          <SheetBox {...{ x: 200, y: 200, width: 3800, height: 2570 }}/>
          <TitleBoxA4 />
          <NameBoxA4 {...{ x: 250, y: 350 }} />
          <StudentNoBoxA4 {...{ x: 600, y: 350, length: 10 }} />
          <HeaderInfoBoxA4 {...{ x: 1450, y: 350 }} />
          <ScoreSumBox {...{ x: 1800, y: 350 }} />
      </Stage>
    );
  }
}
export default AnswerSheet
