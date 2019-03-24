import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";
import { boxSize, triangleSize } from './drawConfig';

const ScoreSumBox = ({ x, y }) => {
  return (
    <Layer>
      <Text text={"总  分"} fontSize={40} x={x + 50} y={y + 30} />
      <Rect x={x} y={y} width={boxSize * 3} height={boxSize} stroke="black" />
      <Line
          x={x}
          y={y}
          points={[0, 0, triangleSize, 0, 0, triangleSize]}
          closed
          stroke="black"
          fill="black"
      />
      <Rect x={x} y={y + boxSize} width={boxSize * 3} height={boxSize} stroke="black" />
        <Line
            x={x}
            y={y}
            points={[boxSize*3, boxSize*2 - triangleSize, boxSize*3, boxSize*2, boxSize*3 - triangleSize, boxSize*2]}
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
