import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";

const SingleChoiceAnswerBox = ({ x, y, index }) => (
  <Layer>
    <Text text={index} fontSize={20} x={x + 20} y={y + 20} />
    <Rect x={x} y={y} width={50} height={50} stroke="black" />
    <Line
      points={[x, y, x + 10, y, x, y + 10]}
      closed
      stroke="black"
      fill="black"
    />
    <Rect x={x} y={y + 50} width={50} height={50} stroke="black" />
    <Line
      points={[x + 50, y + 100, x + 50 - 10, y + 100, x + 50, y + 100 - 10]}
      closed
      stroke="black"
      fill="black"
    />
  </Layer>
);

SingleChoiceAnswerBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default SingleChoiceAnswerBox;
