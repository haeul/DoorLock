const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors"); // cors 라이브러리 import
const bodyParser = require("body-parser"); // body-parser 라이브러리 import

const mongoConnect = require("./util/database").mongoConnect; // mongodb 데이터베이스

const port = process.env.PORT || 3000;

const userRoutes = require("./routes/user");
const doorlockRoutes = require("./routes/doorlock");
const raspberryRoutes = require("./routes/raspberry");

const webSocket = require("./src/webSocket");

app.use(cors({ origin: "http:localhost:3000", credentials: true })); // cors 사용
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(doorlockRoutes);
app.use(raspberryRoutes);

webSocket(server);

server.listen(port, () => {
  console.log(`${port}번 포트에서 연결중~`);
});

mongoConnect(client => {});
