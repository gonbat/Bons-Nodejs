class Player {
  constructor(name, type, cards) {
    this.hp = 100;
    this.shield = 0;
    this.name = name;
    this.type = type;
    this.status = "Normal";
    this.cards = cards;
  }
}

let playerCards = require("./cards");

const players = [];

async function createPlayer(body, type) {
  if (!body) [{ code: "noName", message: "Send a name" }];
  let newPlayer = new Player(body, type, await getHand());
  players.push(newPlayer);
  console.log(players);
  return players;
}

async function getHand() {
  let i = 0;
  const hand = [];
  while (i < 3) {
    hand.push(await playerCards.getCard());
    i++;
  }
  return hand;
}

async function getPlayer(body) {
  if (!body.type) return { code: "noType", message: "Player type is required" };
  let player = {};
  players.map((p) => {
    if (p.type === body.type.toLowerCase()) player = p;
  });
  return player;
}

async function getPlayersCards() {
  let playersCards = {};
  players.map((p) => {
    playersCards[p.type] = p.cards;
  });
  return playersCards;
}

async function drawCard() {
  return await playerCards.getCard();
}

async function playTurn(body) {
  const typePlayer = { type: "hero" },
    typeEnemy = { type: "monster" };
  if (!body.index) {
    typePlayer.type = "monster";
    typeEnemy.type = "hero";
  }
  const player = await getPlayer(typePlayer),
    enemy = await getPlayer(typeEnemy),
    playerTurn = {
      player: player.name,
    };

  if (player.status === "Normal") {
    const newCard = await drawCard();
    const choiceCard = await playCard(player.cards, body.index);
    player.cards.splice(body.index, 1);
    player.cards.splice(body.index, 0, newCard);
    await useEffect(choiceCard, player, enemy);
    playerTurn.playedCard = choiceCard;
  } else {
    playerTurn.status = "You lost your turn. You are horrified!!";
    player.status = "Normal";
  }

  return playerTurn;
}

async function playCard(hand, selectedCard) {
  if (!selectedCard) selectedCard = randomCard(hand.length);
  const cardToUse = hand[selectedCard];
  return cardToUse;
}

async function useEffect(card, player, enemy) {
  if (Object.keys(card.effect)[0] === "heal") {
    player.hp = player.hp + card.effect.heal;
  }
  if (Object.keys(card.effect)[0] === "shield") {
    player.shield = player.shield + card.effect.shield;
  }
  if (Object.keys(card.effect)[0] === "damage") {
    if (enemy.shield) {
      if (enemy.shield > card.effect.damage)
        enemy.shield = enemy.shield - card.effect.damage;
      if (enemy.shield < card.effect.damage) {
        enemy.hp = enemy.hp - Math.abs(enemy.shield - card.effect.damage);
        enemy.shield = 0;
      }
    } else {
      enemy.hp = enemy.hp - card.effect.damage;
    }
  }
  if (Object.keys(card.effect)[0] === "horror") {
    enemy.status = "Horror";
  }
}

function randomCard(length) {
  return Math.floor(Math.random() * length);
}

module.exports = {
  createPlayer,
  getPlayer,
  getPlayersCards,
  playTurn,
};
