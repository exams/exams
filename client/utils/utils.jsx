export const getLabelByIndex = (index) => {
    const label = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
    if (index < 15)
        return label[index];
}

export const getChineseNumberByIndex = (index) => {
    const chineseNumber = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二',
        '十三', '十四', '十五'];
    if (index < 15 && index >= 0)
        return chineseNumber[index];
}