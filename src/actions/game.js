class Game {
  constructor(turns, hero, monster) {
    this.turns = turns;
    this.turnsLeft = turns;
    this.turnsPast = 0;
    this.turnCurrent = 1;
    this.hero = hero;
    this.monster = monster;
  }

  getGame() {
    let actualGame = {
      turns: {
        current: this.turnCurrent,
        past: this.turnsPast,
        left: this.turnsLeft,
      },
      players: {
        hero: this.hero,
        monster: this.monster,
      },
    };
    return actualGame;
  }

  turn() {
    this.turnCurrent++;
    this.turnsLeft--;
    this.turnsPast++;
  }
}
let newGame;
async function createGame(body) {
  const errors = [];
  if (!body.turns)
    errors.push({ code: "noTurns", message: " Turns is required" });
  if (body.turns > 12)
    errors.push({ code: "turnsMax", message: "Turns cannot be more than 12 " });
  if (!body.hero)
    errors.push({ code: "noPlayer", message: "Player is required" });
  if (errors.length) return errors;
  const players = require("./players"),
    hero = await players.createPlayer(body.hero, "hero"),
    monster = await players.createPlayer("Monster", "monster");
  newGame = new Game(body.turns, hero, monster);
  return newGame.getGame();
}

async function getGame() {
  if (!newGame) return { code: "Nogame", message: "Initialize a game" };
  return await newGame.getGame();
}

async function nextTurn(body) {
  if (newGame.turnsLeft === 0 || newGame.hero.hp < 0) {
    return { code: "youLose", message: "UPS.. YOU LOSE! :(" };
  }
  newGame.turn();
  const players = require("./players");

  const turn = await players.playTurn(body);

  if (newGame.monster.hp < 0) {
    return { code: "youWin", message: "CONGRATULATIONS! YOU WIN! :)" };
  }

  return turn;
}

module.exports = {
  createGame,
  getGame,
  nextTurn,
};
