const express = require("express");
const userRoutes = require("~/modules/user/routes/user.route");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use("/api/users", userRoutes);

// post api blog web
const postRoutes = require("./modules/post/routes/post.route");
app.options("/api/posts", cors());
app.use("/api/posts", postRoutes);

module.exports = app;
