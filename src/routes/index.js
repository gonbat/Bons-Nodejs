let express = require("express");
let router = express.Router();

router.get("/", async (req, res) => {
  res.json("home");
});

module.exports = router;
