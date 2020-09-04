const express = require("express");
const bodyParser = require("body-parser");
const app = express();


require("./config/database");
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static("./public"))
  .use('styles', express.static("./public/styles"))
  //.set("views", path.join(__dirname, "./public/views"))
  .set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api/users", require("./routes/user_router"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
