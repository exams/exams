import React, { Component } from "react";
import { Stage } from "react-konva";
import SheetBox from "./components/draw/SheetBox";
import TitleBoxA4 from "./components/draw/TitleBoxA4";
import StudentNoBoxA4 from "./components/draw/StudentNoBoxA4";
import HeaderInfoBoxA4 from "./components/draw/HeaderInfoBoxA4";
import BarcodeA4 from "./components/draw/BarCodeA4"
import {
    widthA4,
    heightA4,
    marginA4,
    marginA3,
    widthA3,
    heightA3,
    zoomSize,
    titleBoxHeight,
    barWidth,
    barHeight,
    studentNoBoxHeight,
    questTitleHeight,
    singleBoxWidth,
    singleBoxHeight,
    multiBoxWidth,
    minSpace
} from './components/draw/drawConfig';

class AnswerSheet extends Component {

    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0,
        };
    }

    componentDidMount() {
        const answerSheet = this.props.location.state;
        const paper = answerSheet.paper;
        const questions = paper.questions;
        console.log(answerSheet);
        console.log(paper);
        console.log(questions);

        let stageWidth = 0;
        let stageHeight = 0;
        let tempPaperWidth = 0;
        let tempPaperHeight = 0;
        let margin = 0;
        if (answerSheet.paperSize === 'A4'){
            tempPaperWidth = widthA4 * zoomSize;
            tempPaperHeight =  heightA4 * zoomSize;
            margin = marginA4;
        } else if (answerSheet.paperSize === 'A3'){
            tempPaperWidth = widthA3 * zoomSize;
            tempPaperHeight =  heightA3 * zoomSize;
            margin = marginA3;
        }

        if (answerSheet.sheetLayout === 'vertical'){
            stageWidth = tempPaperWidth;
            stageHeight =  tempPaperHeight;
        } else if (answerSheet.sheetLayout === 'horizon'){
            stageWidth = tempPaperHeight;
            stageHeight =  tempPaperWidth;
        }

        console.log(stageWidth)
        console.log(stageHeight)
        const sheetWidth = stageWidth - 2 * margin;
        const sheetHeight = stageHeight - 2 * margin;
        const columnWidth = sheetWidth / answerSheet.columns;


        // 设置标题的绘制位置
        answerSheet.titleX = margin;
        answerSheet.titleY = margin;
        this.updateState(margin, margin)

        // 设置学号准考证号, 条形码的绘制位置.
        answerSheet.identifierCodeX = this.state.x;
        answerSheet.identifierCodeY = this.state.y + titleBoxHeight;
        this.updateState(0, titleBoxHeight);

        let identifierHeight = this.getIdentifierHeight(answerSheet.identifierCode);
        const headerDivideHeight = 0;

        this.dealWithQuestions(questions, columnWidth, this.state.x, this.state.y + identifierHeight + titleBoxHeight + 2 * questTitleHeight)
    }

    // 更新绘制的state, 在原有的坐标上增加距离
    updateState = (x, y) => {
        const {oldX, oldY} = this.state;
        const newX = oldX + x;
        const newY = oldY + y;
        this.setState({
            x: newX,
            y: newY,
        })
    };

    dealWithLayout = () => {

    };

    dealWithHeaders = () => {

    };

    dealWithQuestions = (questions, columnWidth, beginX, beginY) => {
        let tempX = beginX;
        let tempY = beginY;
        let hang = 0;
        let perNum = 0;
        let drawSpace = 0;
        let questList = [];
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].questType === 'singleChoice'){
                // 检查是否有空间打印该题型高度, 如果if满足,则证明底部边缘空间已不满足绘制要求.
                // 需要切换column或者sheet.
                // 此处需要计算margin.
                if (tempY + singleBoxHeight * 2 + minSpace + margin > sheetHeight) {

                }

                perNum = Math.floor(columnWidth / (singleBoxWidth + minSpace));
                drawSpace = columnWidth / perNum;

                questList = questions[i].questions;
                tempX = tempX + drawSpace; // 第一个框不能顶边打印, 要有一个空隙
                let drawIndex = 0; // 记录每一行第几个框被打印
                for (let j = 0; j < questList.length; j++){
                    questList[j].x = tempX;
                    questList[j].y = tempY;
                    tempX = tempX + singleBoxWidth + drawSpace;
                    drawIndex ++;
                    // 如果drawIndex == perNum, 需要换行.
                    if (drawIndex == perNum) {
                        tempX = beginX + drawSpace; // tempX移动到行首,并增加边沿空隙
                        tempY = tempY + singleBoxHeight * 2 + minSpace; // tempY移动到下一行的位置, 并增加空隙.

                        // 换行后检查是否本column已经满了. 或者本column是否有空间再打印下一行.
                        if (tempY + margin > sheetHeight || tempY + singleBoxHeight * 2 + minSpace + margin > sheetHeight){
                            // 切换column或者sheet
                            // 小于column, 则移动到新的column
                            if (tempX + columnWidth - margin < sheetWidth){
                                tempX = beginX + minSpace + columnWidth;
                                tempY = margin + minSpace;
                            } else {
                                // 移动到新的sheet, 重新计算x坐标和y坐标.
                                tempX = margin + minSpace;
                                tempY = margin + minSpace;
                                // 更新stage高度.
                                
                            }
                        }
                    }
                }

                // 一种题型绘制完成后, 需要换行.
                tempX = beginX + drawSpace; // tempX移动到行首,并增加边沿空隙
                tempY = tempY + singleBoxHeight * 2 + minSpace; // tempY移动到下一行的位置, 并增加空隙.

                // 换行后检查是否本column已经满了. 不检查本column是否有空间再打印下一行.
                // 因为是下一种题型, 此处不知道该题型高度. 放到每种题型开始处检查是否有空间打印该题型高度


                hang = Math.ceil(questions[i].questions.length / perNum);
                console.log(hang)
            } else if (questions[i].questType === 'multiChoice'){

            } else if (questions[i].questType === 'judge'){

            } else if (questions[i].questType === 'blank'){

            }
            questions[i].x = tempX;
            questions[i].y = tempY + hang * singleBoxHeight;
            tempY = tempY + hang * singleBoxHeight;
        }
    };

    moveColumnAndPage = () => {

        // 如果大于sheetHeight, 小于column, 则移动到新的column

        // 如果大于sheetHeight, 并且大于column, 则移动到新的sheet, 重新计算x坐标和y坐标.
    };

    getIdentifierHeight = (identifierType) => {
        if ("barCode" === identifierType){
            return barHeight
        } else {
            return studentNoBoxHeight * 2;
        }
    };

    getIdentifierCode = () => {
        const answerSheet = this.props.location.state;
        if ("admissionNumber" === answerSheet.identifierCode){
            return (<StudentNoBoxA4 {...{ x: 120, y: 250, length: answerSheet.identifierCodeLength, text: "准    考    证    号" }} />)
        } else if ("studentNumber" === answerSheet.identifierCode){
            return (<StudentNoBoxA4 {...{ x: 120, y: 250, length: answerSheet.identifierCodeLength, text: "学                号" }} />)
        } else if ("barCode" === answerSheet.identifierCode){
            return (<BarcodeA4 {...{ x: 120, y: 250 }} />)
        }
    };

    renderAnswerSheet = () => {
        return (
            <Stage width={4200} height={2970}>
                <SheetBox {...{ x: 200, y: 200, width: 3800, height: 2570, columns: 2 }} />
                <TitleBoxA4 />
                <StudentNoBoxA4 {...{ x: 600, y: 350, length: 10 }} />
                <HeaderInfoBoxA4 {...{ x: 1450, y: 350 }} />
            </Stage>
        );
    };

  render() {
      const answerSheet = this.props.location.state;

      if (answerSheet.paperSize === 'A3'){
          return (
              <Stage width={4200} height={2970}>
                  <SheetBox {...{ x: 200, y: 200, width: 3800, height: 2570, columns: answerSheet.columns }} />
                  <TitleBoxA4 />
                  <StudentNoBoxA4 {...{ x: 600, y: 350, length: 10 }} />
                  <HeaderInfoBoxA4 {...{ x: 1450, y: 350 }} />
              </Stage>
          );
      }
      else if (answerSheet.paperSize === 'A4'){
          let stateWidth = widthA4 * zoomSize;
          let stateHeight =  heightA4 * zoomSize;
          if (answerSheet.sheetLayout === 'vertical'){
              stateWidth = widthA4 * zoomSize;
              stateHeight =  heightA4 * zoomSize;
          } else if (answerSheet.sheetLayout === 'horizon'){
              stateWidth = heightA4 * zoomSize;
              stateHeight = widthA4 * zoomSize;
          }
          const sheetWidth = stateWidth - 2 * marginA4;
          const sheetHeight = stateHeight - 2 * marginA4;
          const columnWidth = sheetWidth/answerSheet.columns;
          return (
              <Stage width={stateWidth} height={stateHeight}>
                  <SheetBox {...{ x: marginA4, y: marginA4, width: sheetWidth, height: sheetHeight, columns: answerSheet.columns }} />
                  <TitleBoxA4 {...{x: 100, y: 100,  width: columnWidth, height: titleBoxHeight, title: answerSheet.title}} />
                  {
                      this.getIdentifierCode()
                  }
                  <HeaderInfoBoxA4 {...{ x: 150, y: 500, width: 240, text: '姓名', layout: 'vertical' }} />
                  <HeaderInfoBoxA4 {...{ x: 410, y: 500, width: 240, text: '姓名', layout: 'vertical' }} />
              </Stage>
          );
      }
  }
}
export default AnswerSheet
