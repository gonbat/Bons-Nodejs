let express = require("express");
let router = express.Router();
let game = require("../actions/game");
let player = require("../actions/players");

router.post("/game", async (req, res) => {
  game.createGame(req.body).then((data) => res.json(data));
});

router.get("/game", async (req, res) => {
  game.getGame().then((data) => res.json(data));
});

router.post("/game/turn", async (req, res) => {
  game.nextTurn(req.body).then((data) => res.json(data));
});

router.get("/player", async (req, res) => {
  player.getPlayer(req.body).then((data) => res.json(data));
});

router.get("/players/cards", async (req, res) => {
  player.getPlayersCards().then((data) => res.json(data));
});

module.exports = router;
