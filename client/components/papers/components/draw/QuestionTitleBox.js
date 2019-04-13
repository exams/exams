import React from "react";
import { Layer, Text } from "react-konva";

const QuestionTitleBox = ({ x, y, width, height, title }) => {
  return (
    <Layer>
      <Text text={title} fontSize={30} x={x} y={y} width={width} height={height} align={"center"} verticalAlign={"middle"} />
    </Layer>
  );
};

export default QuestionTitleBox;
