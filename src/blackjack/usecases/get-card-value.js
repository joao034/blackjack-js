export const getCardValue = (card) => {
    const value = card.substring(0, card.length - 1)
    if (isNaN(value))
        return (value === 'A') ? 11 : 10;
    return value * 1;
}