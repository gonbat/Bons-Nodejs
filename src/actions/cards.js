class Card {
  constructor(name, effect) {
    (this.name = name), (this.effect = effect);
  }
}

async function getCard() {
  let cards = require("../dataBase/data");
  let randomCard = cards[randomCard(cards.length)];
  return new Card(randomCard.name, randomCard.effect);
}

async function randomCard(length) {
  return Math.floor(Math.random * length);
}

module.exports = {
  getCard,
};
