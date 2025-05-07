module.exports = (io) => {
  // Tổ chức theo domain
  require("~/modules/post/socket/comment.socket")(io);
  require("~/modules/Message/socket/Message.socket")(io);
};
