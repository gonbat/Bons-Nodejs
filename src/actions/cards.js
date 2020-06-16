class Card {
  constructor(name, effect) {
    (this.name = name), (this.effect = effect);
  }
}

async function getCard() {
  const cardsDb = require("../dataBase/data");
  let cardSelect = cardsDb.cards[randomCard(cardsDb.cards.length)];
  return new Card(cardSelect.name, cardSelect.effect);
}

function randomCard(length) {
  return Math.floor(Math.random() * length);
}

module.exports = {
  getCard,
};
