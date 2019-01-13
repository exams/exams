export const getLabelByIndex = (index) => {
    const label = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
    if (index < 15)
        return label[index];
}