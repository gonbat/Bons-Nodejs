class Game {
  constructor(turns, hero, monster) {
    this.turns = turns;
    this.turnsLeft = turns;
    this.turnsPast = 0;
    this.turnCurrent = 1;
    this.monster = monster;
    this.hero = hero;
  }

  turn() {
    this.turnCurrent++;
    this.turnsLeft--;
    this.turnsPast++;
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
}
const players = require("./players");
let newGame;
async function createGame(body) {
  const errors = [];
  if (!body.turns)
    errors.push({ code: "noTurns", message: " Turns is required" });
  if (body.turns > 12)
    errors.push({ code: "turnsMax", message: "Turns cannot be more than 12 " });
  if (!body.name)
    errors.push({ code: "noPlayer", message: "Player is required" });
  if (errors.length) return errors;

  const [hero, monster] = await Promise.all([
    players.createPlayer(body.name, "hero"),
    players.createPlayer("Monster", "monster"),
  ]);

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
