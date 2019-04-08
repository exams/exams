import React from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Text, Line } from "react-konva";
import { headerInfoBoxHeight, headerInfoFontSize } from './drawConfig';

const horizonLeftWidth = 180;
const HeaderInfoBoxA4 = ({ x, y, width,  text, layout }) => {
    const textLength = text.length;
    let textTemp = '';
    let textSpace = " ";
    if (textLength == 3){
        textSpace = "  "
    }else if (textLength == 2){
        textSpace = "      "
    }

    for (let i = 0; i < textLength - 1; i++){
        textTemp += text[i];
        textTemp += textSpace;
    }
    textTemp += text[textLength - 1];

    if ('horizon' === layout){
        return (
            <Layer>
                <Text text={textTemp} fontSize={headerInfoFontSize} x={x} y={y} width={horizonLeftWidth} height={headerInfoBoxHeight} align={"center"} verticalAlign={"middle"} />
                <Rect x={x} y={y} width={width} height={headerInfoBoxHeight} stroke="black" />
                <Line
                    x = {x + horizonLeftWidth}
                    y = {y}
                    points={[0, 0, 0, headerInfoBoxHeight]}
                    stroke="black"
                    fill="black"
                    strokeWidth={1}
                    dash={[5, 10]}
                />
            </Layer>
        );
    } else if ('vertical' === layout){
        return (
            <Layer>
                <Text text={textTemp} fontSize={30} x={x} y={y} width={width} height={headerInfoBoxHeight} align={"center"} verticalAlign={"middle"} />
                <Rect x={x} y={y} width={width} height={2 * headerInfoBoxHeight} stroke="black" />
                <Line
                    x = {x}
                    y = {y + headerInfoBoxHeight}
                    points={[0, 0, width, 0]}
                    stroke="black"
                    fill="black"
                    strokeWidth={1}
                    dash={[5, 10]}
                />
            </Layer>
        );
    }
};

HeaderInfoBoxA4.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default HeaderInfoBoxA4;
