import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";
import { studentNoBoxWidth, studentNoBoxHeight } from './drawConfig';

const StudentNoBoxA4 = ({ x, y, length, text }) => {
  var rect = [];
  for (var i = 0; i < length - 1; i++) {
    rect.push({ x: x + i * studentNoBoxWidth, y: y + studentNoBoxHeight });
  }
  return (
    <Layer>
      <Text text={text} fontSize={40} x={x} y={y} width={length * studentNoBoxWidth} height={studentNoBoxHeight} align={"center"} verticalAlign={"middle"} />
      <Rect x={x} y={y} width={length * studentNoBoxWidth} height={2 * studentNoBoxHeight} stroke="black" />
        <Line
            key={x}
            points={[x, y  + studentNoBoxHeight, x + length * studentNoBoxWidth, y + studentNoBoxHeight]}
            stroke="black"
            fill="black"
            strokeWidth={1}
            dash={[5, 10]}
        />
        {rect.map(item => {
            return (
                <Line
                    key={item.x}
                    points={[item.x + studentNoBoxWidth, item.y, item.x + studentNoBoxWidth, item.y + studentNoBoxHeight]}
                    stroke="black"
                    fill="black"
                    strokeWidth={1}
                    dash={[5, 10]}
                />
            );
        })}
    </Layer>
  );
};

StudentNoBoxA4.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

export default StudentNoBoxA4;
