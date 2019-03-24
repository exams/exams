import React from "react";
import { Layer, Rect, Line } from "react-konva";
import { triangleSize } from './drawConfig';

const SheetBox = ({x, y, width, height}) => {
  return (
      <Layer>
          <Rect x={x} y={y} width={width} height={height} stroke="black" strokeWidth={1} dash={[5, 10]} />
          <Line
              x={x}
              y={y}
              points={[0, 0, triangleSize, 0, 0, triangleSize]}
              closed
              stroke="black"
              fill="black"
          />
          <Line
              x={x}
              y={y}
              points={[width - triangleSize, 0, width, 0, width, triangleSize]}
              closed
              stroke="black"
              fill="black"
          />
          <Line
              x={x}
              y={y}
              points={[0, height - triangleSize, triangleSize, height, 0, height]}
              closed
              stroke="black"
              fill="black"
          />
          <Line
              x={x}
              y={y}
              points={[width, height - triangleSize, width, height, width - triangleSize, height]}
              closed
              stroke="black"
              fill="black"
          />
          <Line x={x + width/2} y={y} points={[0, 0, 0, height]}
                closed
                stroke="black"
                fill="black"
                strokeWidth={1}
                dash={[5, 10]}
          />
          <Line x={x} y={y+360} points={[0, 0, width/2, 0]}
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
