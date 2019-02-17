import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';

const AdmissionNumberBox = ({ x, y, length }) => {
  var rect = [];
  for (var i = 0; i < length; i++) {
    rect.push({ x: x + i * 50, y: y + 50 });
  }
  return (
    <Layer>
      <Text text={"准考证号"} fontSize={20} x={x + 20} y={y + 20} />
      <Rect x={x} y={y} width={length * 50} height={50} stroke="black" />
      <Line
        points={[x, y, x + 10, y, x, y + 10]}
        closed
        stroke="black"
        fill="black"
      />
      {rect.map(item => {
        return (
          <Rect x={item.x} y={item.y} width={50} height={50} stroke="black" />
        );
      })}
    </Layer>
  );
};

AdmissionNumberBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

export default AdmissionNumberBox;
