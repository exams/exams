import React from "react";
import { Layer, Rect, Line } from "react-konva";
import { triangleSize } from './drawConfig';

const SheetBox = ({x, y, width, height, columns}) => {
  return (
      <Layer>
          {/* 矩形 */}
          <Rect x={x} y={y} width={width} height={height} stroke="black" strokeWidth={1} dash={[5, 10]} />
          {/* 左上角三角形 */}
          <Line
              x={x}
              y={y}
              points={[0, 0, triangleSize, 0, 0, triangleSize]}
              closed
              stroke="black"
              fill="black"
          />
          {/* 右上角三角形 */}
          <Line
              x={x}
              y={y}
              points={[width - triangleSize, 0, width, 0, width, triangleSize]}
              closed
              stroke="black"
              fill="black"
          />
          {/* 左下角三角形 */}
          {/*<Line*/}
              {/*x={x}*/}
              {/*y={y}*/}
              {/*points={[0, height - triangleSize, triangleSize, height, 0, height]}*/}
              {/*closed*/}
              {/*stroke="black"*/}
              {/*fill="black"*/}
          {/*/>*/}
          {/* 右下角三角形 */}
          {/*<Line*/}
              {/*x={x}*/}
              {/*y={y}*/}
              {/*points={[width, height - triangleSize, width, height, width - triangleSize, height]}*/}
              {/*closed*/}
              {/*stroke="black"*/}
              {/*fill="black"*/}
          {/*/>*/}
          {/* 列分割线 */}
          {
              columns == 2 &&
              <Line x={x + width/columns} y={y} points={[0, 0, 0, height]}
                    closed
                    stroke="black"
                    fill="black"
                    strokeWidth={1}
                    dash={[5, 10]}
              />
          }
          {
              columns == 3 &&
              <Line x={x + width/columns * 2} y={y} points={[0, 0, 0, height]}
                closed
                stroke="black"
                fill="black"
                strokeWidth={1}
                dash={[5, 10]}
          />
          }
      </Layer>
  );
};

export default SheetBox;
