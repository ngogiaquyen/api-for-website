const express = require("express");
const app = express();
const cors = require("cors");

// const userRoutes = require("./modules/user/routes/user.route");
const postRoutes = require("./modules/post/routes/post.route");
const messageRoute = require("./modules/Message/routes/Message.route");
const sendNotificationEmail = require("./config/mail");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ngogiaquyen.id.vn",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// app.use("/users", userRoutes);
app.options("/api/posts", cors());
app.use("/api/posts", postRoutes);
app.use("/message", messageRoute);


module.exports = app;
