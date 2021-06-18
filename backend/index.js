require("dotenv").config({ path: "./config/.env" });
const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// connection with database
require("./config/connectDB")(process.env.DATABASE_URI);

// initial express layer
require("./utilities/initExpress")(app, express);

// socket.io
require("./utilities/Socket_io")(io);

// app is listener on port 9000
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server is working on port ${PORT}`);
});
