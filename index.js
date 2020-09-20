const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors")


require("./config/database");
app.use(cors({
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
})).use(bodyParser.json());
//.set("views", path.join(__dirname, "./public/views"))

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello react?" })
});

app.use("/api/users", require("./routes/user_router"));
app.use("/api/f5", require("./routes/f5_router"));
app.use("/api/interface", require("./routes/interface_router"))
app.use("/api/node", require("./routes/node_router"));
app.use("/api/error", require("./routes/error_router"));
app.use("/api/alarm", require("./routes/alarm_router"));
app.use("/api/data", require("./routes/data_router"));
app.use('/api/config', require("./routes/settings_router"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
