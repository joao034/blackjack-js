/**
 * 
 * @param Array<string>} deck 
 * @returns {string} return a card
 */
export const drawCard = ( deck ) => {
    if ( !deck || deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    return deck.pop()
}