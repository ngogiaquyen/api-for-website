require("module-alias/register");
require("dotenv").config();

const cors = require("cors");
const app = require("~/app");
const http = require("http");
const { Server } = require("socket.io");

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500", "https://ngogiaquyen.id.vn"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://ngogiaquyen.id.vn",
    ], // Khớp với cấu hình CORS
    methods: ["GET", "POST"],
  },
});

require("~/config/socket")(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server listening on http://localhost:5000");
});
