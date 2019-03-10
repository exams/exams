import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";
import { boxSize, triangleSize } from './drawConfig';

const width = 300
const SubjectBox = ({ x, y }) => {
  return (
    <Layer>
      <Text text={"科 目 编 码"} fontSize={40} x={x + 60} y={y + 30} />
      <Rect x={x} y={y} width={300} height={boxSize} stroke="black" />
      <Line
        points={[x, y, x + triangleSize, y, x, y + triangleSize]}
        closed
        stroke="black"
        fill="black"
      />
      <Rect x={x} y={y + boxSize} width={300} height={boxSize} stroke="black" />
        <Line
            points={[x + width, y + boxSize*2 - triangleSize, x + width, y + boxSize*2, x + width - triangleSize, y + boxSize*2]}
            closed
            stroke="black"
            fill="black"
        />
    </Layer>
  );
};

SubjectBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default SubjectBox;
