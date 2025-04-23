const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../../../middleware/auth");
const apiResponse = require("~/utils/response");


router.post("/", (req, res) => {
  const { title, content, author } = req.body;
  const data = req.body;
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Thêm header CORS

  return res.status(200).json(
    apiResponse({
      data: data,
      message: "User fetched successfully",
    })
  );
});

router.get("/:id/like", postController.likePost);
router.post("/:id/comment", auth, postController.commentPost);

module.exports = router;

module.exports = router;
