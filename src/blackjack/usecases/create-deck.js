import _ from 'underscore';

let deck = [];
  /* C = two trebols
  D = diamonds
  H = hearts
  S = spades */
const cardTypes = ['C', 'H', 'D', 'S'],
cardSpecials = ['A', 'J', 'Q', 'K'];

const addNumbers = ( ) => {
    for (let i = 2; i <= 10; i++) {
        for (const type of cardTypes) {
            deck.push(i + type)
        }
    }
}

const addSpecials = () => {
    for (const type of cardTypes) {
        for (const special of cardSpecials) {
            deck.push(special + type)
        }
    }
}
/**
 * 
 * @returns {Array<string>} return a new deck with shuffle cards
 */
export const createDeck = () => {
    deck = []
    addNumbers();
    addSpecials();
    return _.shuffle(deck)
}
