import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";

const TitleBox = ({ title }) => {
  return (
    <Layer>
      <Text text={"XX大学考试通用答题卡"} fontSize={50} x={1000} y={250} />
    </Layer>
  );
};

export default TitleBox;
