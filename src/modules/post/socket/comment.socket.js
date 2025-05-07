module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    // Lắng nghe comment mới
    socket.on("newComment", (data) => {
      console.log("📝 New comment:", data);

      // Gửi lại cho tất cả client khác (broadcast)
      io.emit("commentBroadcast", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};
