import _ from 'underscore';

import { createDeck, drawCard, getCardValue } from './usecases';

const module = (() => {
    
  'use strict'
  let deck = [];

  let playersPoints = [];

  //HTML references
  const btnNuevo = document.querySelector('#btnNuevo'),
      btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener');

  const HTMLpoints = document.querySelectorAll('small'),
      divPlayersCards = document.querySelectorAll('.divCartas');


  const initGame = (numPlayers = 2) => {
      deck = createDeck( );
      playersPoints = [];
      for (let i = 0; i < numPlayers; i++) {
          playersPoints.push(0)
      }
      cleanAllPoints();
      cleanAllCards();

      btnPedir.disabled = false;
      btnDetener.disabled = false;
  }

  //Turno : 0 = primer jugador y el ultimo sera la computadora
  const sumPoints = (turn, card) => {
      playersPoints[turn] += getCardValue(card);
      HTMLpoints[turn].innerText = playersPoints[turn];
      return playersPoints[turn];
  }

  const showCard = (turn, card) => {
      const cardImg = document.createElement('img');
      cardImg.src = `assets/cartas/${card}.png`
      cardImg.classList.add('carta')
      divPlayersCards[turn].append(cardImg)
  }

  const computerTurn = (minPoints) => {
      let computerPoints = 0;
      do {
          const card = drawCard( deck );
          computerPoints = sumPoints(playersPoints.length - 1, card);

          showCard(playersPoints.length - 1, card);

      } while ((computerPoints < minPoints) && computerPoints <= 21);

      alertWinner();
  }

  const alertWinner = () => {

      const [minPoints, computerPoints] = playersPoints;

      setTimeout(() => {
          if (minPoints === computerPoints) {
              alert('Nadie gana')
          } else if (minPoints > 21) {
              alert('Computadora gana')
          } else if (computerPoints > 21) {
              alert('Jugador gana')
          } else {
              alert('Computadora gana')
          }
      }, 100);
  }

  const cleanAllPoints = () => {
      HTMLpoints.forEach( elem => elem.innerText = 0);
  }

  const cleanAllCards = () => {
      divPlayersCards.forEach( elem => elem.innerHTML = '')

  }

  //Events
  btnPedir.addEventListener('click', () => {
      const card = drawCard( deck )
      const playerPoints = sumPoints(0, card)

      showCard(0, card);

      if (playerPoints > 21) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          computerTurn(playerPoints)
      } else if (playerPoints === 21) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          computerTurn(playerPoints)
      }

  });

  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      computerTurn(playersPoints[0])
  });

  btnNuevo.addEventListener('click', () => {
      initGame()
  })

  return {
      game: initGame
  }

})()