import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";
import {singleBoxWidth, singleBoxHeight, questIndexFontSize} from './drawConfig';

const SingleAnswerBox = ({ x, y, index }) => (
  <Layer>
    <Text text={index} fontSize={questIndexFontSize} x={x} y={y} width={singleBoxWidth} height={singleBoxHeight} align={"center"} verticalAlign={"middle"} />
    <Rect x={x} y={y} width={singleBoxWidth} height={singleBoxHeight * 2} stroke="black" />
      <Line
          x = {x}
          y = {y + singleBoxHeight}
          points={[0, 0, singleBoxWidth, 0]}
          stroke="black"
          fill="black"
          strokeWidth={1}
          dash={[5, 10]}
      />
  </Layer>
);

SingleAnswerBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default SingleAnswerBox;
