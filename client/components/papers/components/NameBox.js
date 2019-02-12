import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";

const NameBox = ({ x, y }) => {
  return (
    <Layer>
      <Text text={"123456798"} fontSize={20} x={x + 20} y={y + 20} />
      <Rect x={x} y={y} width={300} height={50} stroke="black" />
      <Line
        points={[x, y, x + 10, y, x, y + 10]}
        closed
        stroke="black"
        fill="black"
      />
      <Rect x={x} y={y + 50} width={300} height={50} stroke="black" />
    </Layer>
  );
};

NameBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default NameBox;
