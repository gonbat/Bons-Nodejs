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
    let currentGame = {
      turns: {
        current: this.turnCurrent,
        past: this.turnsPast,
        left: this.turnsLeft,
      },
      players: {
        monster: this.monster,
        player: this.player,
      },
    };
    return currentGame;
  }

  nextTurn() {
    this.turnCurrent++;
    this.turnsLeft--;
    this.turnsPast++;
  }
}
