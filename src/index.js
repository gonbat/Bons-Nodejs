let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let routes = require("./routes/index.js");

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.info(`Server has started on Port ${PORT}`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);
app.use((req, res, next) => {
  res.status(404).send("We think you are lost!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
});

module.exports = app;
