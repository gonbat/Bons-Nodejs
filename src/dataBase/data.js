let cards = [
  {
    name: "attack",
    effect: { damage: 21, message: "21 damage to opponent" },
  },
  {
    name: "attack",
    effect: { damage: 24, message: "24 damage to opponent" },
  },
  {
    name: "attack",
    effect: { damage: 20, message: "20 damage to opponent" },
  },
  {
    name: "attack",
    effect: { damage: 10, message: "15 damage to opponent" },
  },
  {
    name: "attack",
    effect: { damage: 13, message: "18 damage to opponent" },
  },
  {
    name: "defense",
    effect: { heal: 15, message: "15 heal for you" },
  },
  {
    name: "defense",
    effect: { heal: 11, message: "11 heal for you" },
  },
  {
    name: "defense",
    effect: { heal: 10, message: "10 heal for you" },
  },
  {
    name: "defense",
    effect: { heal: 16, message: "16 heal for you" },
  },
  {
    name: "shield",
    effect: { shield: 12, message: "6 shield for you" },
  },
  {
    name: "shield",
    effect: { shield: 20, message: "8 shield for you" },
  },
  {
    name: "shield",
    effect: { shield: 18, message: "10 shield for you" },
  },
  {
    name: "horror",
    effect: { horror: 0, message: "YOU LOSE YOUR TOURN!" },
  },
];

module.exports = {
  cards,
};
