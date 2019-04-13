import React, { Component } from "react";
import { Stage } from "react-konva";
import SheetBox from "./components/draw/SheetBox";
import TitleBoxA4 from "./components/draw/TitleBoxA4";
import StudentNoBoxA4 from "./components/draw/StudentNoBoxA4";
import HeaderInfoBoxA4 from "./components/draw/HeaderInfoBoxA4";
import BarcodeA4 from "./components/draw/BarCodeA4";
import SingleAnswerBox from "./components/draw/SingleAnswerBox";
import MultiAnswerBox from "./components/draw/MultiAnswerBox";
import QuestionTitleBox from "./components/draw/QuestionTitleBox";
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import { getChineseNumberByIndex } from '../../utils/utils'
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
            margin: 0,
            stageWidth: 0,
            stageHeight: 0,
            sheetWidth: 0,
            sheetHeight: 0,
            columnWidth: 0
        };
    }

    componentDidMount() {
        const answerSheet = this.props.location.state;
        const paper = answerSheet.paper;
        const questions = paper.questions;


        const sheetParams = this.initSheetParams(answerSheet);
        this.dealWithHeaders(answerSheet);

        this.dealWithQuestions(questions, 100, 500, sheetParams);

        console.log(answerSheet);
    }

    initSheetParams = (answerSheet) => {
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

        const sheetWidth = stageWidth - 2 * margin;
        const sheetHeight = stageHeight - 2 * margin;
        const columnWidth = sheetWidth / answerSheet.columns;
        const sheetParams = {
            margin: margin,
            stageWidth: stageWidth,
            stageHeight: stageHeight,
            sheetWidth: sheetWidth,
            sheetHeight: sheetHeight,
            columnWidth: columnWidth
        };
        this.setState(sheetParams);
        return sheetParams;
    };

    dealWithHeaders = (answerSheet) => {

        // 设置学号准考证号, 条形码的绘制位置.
        answerSheet.identifierCodeX = this.state.x;
        answerSheet.identifierCodeY = this.state.y + titleBoxHeight;

        let identifierHeight = this.getIdentifierHeight(answerSheet.identifierCode);
        const headerDivideHeight = 0;

    };

    dealWithQuestions = (questions, beginX, beginY, sheetParams) => {
        let tempX = beginX;
        let tempY = beginY;
        let perNum = 0;
        let column = 1;
        let page = 1;
        let drawSpace = 0;
        let questList = [];

        const { margin, stageHeight, sheetWidth, sheetHeight, columnWidth } = sheetParams;
        for (let i = 0; i < questions.length; i++) {
            // 设置标题的位置
            questions[i].x = tempX + drawSpace;
            questions[i].y = tempY;
            tempY = tempY + questTitleHeight;
            if (questions[i].questType === 'singleChoice'){
                // 检查是否有足够高度空间打印该题型, 如果底部边缘空间已不满足绘制要求. 则需要切换column或者sheet.
                // 此处需要计算margin.
                if (tempY + singleBoxHeight * 2 + minSpace + margin > sheetHeight) {

                }

                // 每一行可以摆放的方框数
                perNum = Math.floor(columnWidth / (singleBoxWidth + minSpace));

                // 方框之间的间隔. column宽度减去所有方框后剩余量,除以空隙数(N个方框需要N+1个空隙).
                drawSpace = (columnWidth - perNum * singleBoxWidth) / (perNum + 1);
                questList = questions[i].questions;
                tempX = tempX + drawSpace; // 第一个框不能顶边打印, 要有一个空隙
                let drawIndex = 0; // 记录每一行第几个框被打印, 用于换行
                for (let j = 0; j < questList.length; j++){
                    questList[j].x = tempX;
                    questList[j].y = tempY;

                    // 每一次循环,将X的位置向右移动
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
                                column ++;
                                tempX = beginX + drawSpace + columnWidth * column;
                                tempY = margin + minSpace;
                            } else {
                                // 移动到新的一页, 重新计算x坐标和y坐标.
                                page ++;
                                column = 1; // 新的一页, 从第一个column开始绘制
                                tempX = margin + drawSpace;
                                tempY = margin + minSpace + stageHeight * page;

                                // 更新stage高度.
                                this.setState({
                                    stageHeight: stageHeight * page
                                });
                            }
                        }
                    }
                }

                // 一种题型绘制完成后, 需要换行.
                tempX = beginX + column * columnWidth; // tempX移动到行首, 此处要考虑column位置
                tempY = tempY + singleBoxHeight * 2 + minSpace; // tempY移动到下一行的位置, 并增加空隙.

                // 换行后检查是否本column已经满了. 不检查本column是否有空间再打印下一行.
                // 因为是下一种题型, 此处不知道该题型高度. 放到每种题型开始处检查是否有空间打印该题型高度

            } else if (questions[i].questType === 'multiChoice'){

            } else if (questions[i].questType === 'judge'){

            } else if (questions[i].questType === 'blank'){

            } else if (questions[i].questType === 'questAnswer'){

            }
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

    getQuestionDraw = () => {
        const answerSheet = this.props.location.state;
        const questItems = [];
        let questionIndex = 0;
        answerSheet.paper.questions.map((item, index) => {
            const title = this.getQuestSetTitle(item, index);
            questItems.push(<QuestionTitleBox {...{x: item.x, y: item.y,  width: 500, height: questTitleHeight, title: title}} />);
            if (item.questType === 'singleChoice') {
                item.questions.map((question, i) => {
                    questionIndex++;
                    questItems.push(<SingleAnswerBox {...{ x: question.x, y: question.y, index: questionIndex }} />);
                })
            }

            if (item.questType === 'multiChoice') {
                item.questions.map((question, i) => {
                    questionIndex++;
                    questItems.push(<MultiAnswerBox {...{ x: question.x, y: question.y, index: questionIndex++ }} />);
                })
            }

            if (item.questType === 'judge') {
                item.questions.map((question, i) => {
                    questionIndex++;
                    questItems.push(<SingleAnswerBox {...{ x: question.x, y: question.y, index: questionIndex++ }} />);
                })
            }

            if (item.questType === 'blank') {
                item.questions.map((question, i) => {
                    questionIndex++;
                    questItems.push();
                })
            }

            if (item.questType === 'questAnswer') {
                item.questions.map((question, i) => {
                    questionIndex++;
                    questItems.push();
                })
            }
        });
        return questItems;
    };

    // 获取题型标题
    getQuestSetTitle = (questionSet, index) => {
        const questTitle = questionSet.alias ? questionSet.alias : this.getQuestTitleByType(questionSet.questType);
        const title = getChineseNumberByIndex(index) + this.props.intl.messages.pauseSymbol +
            questTitle +
            this.props.intl.messages.colon + " " + this.props.intl.messages.sumPrefix +
            questionSet.number.toString() + this.props.intl.messages.questSuffix + this.props.intl.messages.comma +
            this.props.intl.messages.perQuestPrefix + questionSet.score.toString() + this.props.intl.messages.scoreSuffix;
        return title;
    };

    getQuestTitleByType = (questType) => {
        switch (questType){
            case 'singleChoice':
                return this.props.intl.messages.singleChoice;
            case 'multiChoice':
                return this.props.intl.messages.multiChoice;
            case 'judge':
                return this.props.intl.messages.judge;
            case 'blank':
                return this.props.intl.messages.blank;
            case 'mixing':
                return this.props.intl.messages.mixing;
        }
    };

  render() {
      const answerSheet = this.props.location.state;
      console.log(answerSheet);
      const { margin, stageWidth, stageHeight, sheetWidth, sheetHeight, columnWidth} = this.state;
      return (
          <Stage width={stageWidth} height={stageHeight}>
              <SheetBox {...{ x: margin, y: margin, width: sheetWidth, height: sheetHeight, columns: answerSheet.columns }} />
              <TitleBoxA4 {...{x: margin, y: margin,  width: columnWidth, height: titleBoxHeight, title: answerSheet.title}} />
              {
                  this.getIdentifierCode()
              }
              {/*<HeaderInfoBoxA4 {...{ x: 150, y: 500, width: 240, text: '姓  名', layout: 'vertical' }} />*/}
              {
                  this.getQuestionDraw()
              }
          </Stage>
      );
  }
}
export default injectIntl(AnswerSheet)
