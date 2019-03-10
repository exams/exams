import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";
import { boxSize, triangleSize } from './drawConfig';

const StudentNoBox = ({ x, y, length }) => {
  var rect = [];
  for (var i = 0; i < length; i++) {
    rect.push({ x: x + i * boxSize, y: y + boxSize });
  }
  return (
    <Layer>
      <Text text={"学              号"} fontSize={40} x={x + 350} y={y + 30} />
      <Rect x={x} y={y} width={length * boxSize} height={boxSize} stroke="black" />
      <Line
        points={[x, y, x + triangleSize, y, x, y + triangleSize]}
        closed
        stroke="black"
        fill="black"
      />
      {rect.map(item => {
        return (
          <Rect x={item.x} y={item.y} width={boxSize} height={boxSize} stroke="black" />
        );
      })}
    </Layer>
  );
};

StudentNoBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

export default StudentNoBox;
