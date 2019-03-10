import React from "react";
import { Layer, Rect, Line } from "react-konva";
import { triangleSize } from './drawConfig';

const SheetBox = () => {
  return (
      <Layer>
          <Rect x={200} y={200} width={4400} height={3200} stroke="black" strokeWidth={1} dash={[5, 10]} />
          <Line
              points={[200, 200, 200 + triangleSize, 200, 200, 200 + triangleSize]}
              closed
              stroke="black"
              fill="black"
          />
          <Line
              points={[4600 - triangleSize, 200, 4600, 200, 4600, 200 + triangleSize]}
              closed
              stroke="black"
              fill="black"
          />
          <Line
              points={[200, 3400 - triangleSize, 200 + triangleSize, 3400, 200, 3400]}
              closed
              stroke="black"
              fill="black"
          />
          <Line
              points={[4600 - triangleSize, 3400, 4600, 3400 - triangleSize, 4600, 3400]}
              closed
              stroke="black"
              fill="black"
          />
          <Line x={200} y={600} points={[0, 0, 2200, 0]}
                closed
                stroke="black"
                fill="black"
                strokeWidth={1}
                dash={[5, 10]}
          />
          <Line x={2400} y={200} points={[0, 0, 0, 3200]}
                closed
                stroke="black"
                fill="black"
                strokeWidth={1}
                dash={[5, 10]}
          />
      </Layer>
  );
};

export default SheetBox;
