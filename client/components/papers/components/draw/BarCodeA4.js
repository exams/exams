import React from "react";
import { Layer, Rect, Text } from "react-konva";
import { barWidth, barHeight } from './drawConfig';

const BarcodeA4 = ({ x, y }) => {
  return (
    <Layer>
        <Rect x={x} y={y} width={barWidth} height={barHeight} stroke="black" strokeWidth={1} dash={[5, 10]} />
        <Text text={"条形码粘贴区域\n尺寸不超过50mm*30mm"} fontSize={20} x={x} y={y} width={barWidth} height={barHeight} align={"center"} verticalAlign={"middle"} />
    </Layer>
  );
};

export default BarcodeA4;
