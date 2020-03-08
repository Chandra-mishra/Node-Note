const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
var app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "5mb", extended: true }));

global.sequelize = require("./db/dbconnection");
app.use("/uploads", express.static("uploads"));

const userRoute = require("./routes/UserRoutes");
const courseRoute = require("./routes/CourseRoutes");
const tagRoute = require("./routes/TagRoutes");
const coursetagRoute = require("./routes/CourseTagRoutes");
const userCourseRoute = require("./routes/userCourseRoutes");
utils = require("./routes/CommonRoutes");
const port = process.env.PORT;
let server = http.createServer(app);

app.use("/user", userRoute);
app.use("/course",courseRoute);
app.use("/tags",tagRoute);
app.use("/coursetag",coursetagRoute);
app.use("/usercourse",userCourseRoute);
app.use("/utils", utils);
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err.message);
});

server.listen(port, () => {
  console.log(`Server is starting at ${port}`);
});
