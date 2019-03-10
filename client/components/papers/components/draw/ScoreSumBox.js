import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";
import { boxSize, triangleSize } from './drawConfig';

const ScoreSumBox = ({ x, y }) => {
  return (
    <Layer>
      <Text text={"总  分"} fontSize={40} x={x + 50} y={y + 30} />
      <Rect x={x} y={y} width={boxSize * 2} height={boxSize} stroke="black" />
      <Line
        points={[x, y, x + triangleSize, y, x, y + triangleSize]}
        closed
        stroke="black"
        fill="black"
      />
      <Rect x={x} y={y + boxSize} width={boxSize * 2} height={boxSize} stroke="black" />
        <Line
            points={[x + boxSize*2, y + boxSize*2 - triangleSize, x + boxSize*2, y + boxSize*2, x + boxSize*2 - triangleSize, y + boxSize*2]}
            closed
            stroke="black"
            fill="black"
        />
    </Layer>
  );
};

ScoreSumBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default ScoreSumBox;
