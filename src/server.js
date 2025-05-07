require("module-alias/register");
require("dotenv").config();

const http = require("http");
const app = require("~/app");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://ngogiaquyen.id.vn",
    ],
    methods: ["GET", "POST"],
  },
});

require("~/config/socket")(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
