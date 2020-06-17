class Card {
  constructor(name, effect) {
    (this.name = name), (this.effect = effect);
  }
}

async function getCard() {
  const dataBase = require("../dataBase/data");
  let cardSelect = dataBase.cards[randomCard(dataBase.cards.length)];
  return new Card(cardSelect.name, cardSelect.effect);
}

function randomCard(length) {
  return Math.floor(Math.random() * length);
}

module.exports = {
  getCard,
};
