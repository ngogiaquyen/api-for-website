// Lưu trữ ánh xạ giữa user_id và socket.id
const userSocketMap = {}; // { user_id: socket.id }

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected chat:", socket.id);

    // Bước 1: Client phải gửi user_id sau khi kết nối
    socket.on("register", (user_id) => {
      userSocketMap[user_id] = socket.id;
      console.log(`✅ User ${user_id} registered with socket ${socket.id}`);
    });

    // Bước 2: Gửi message tới người nhận
    socket.on("newMessage", (data) => {
      console.log("📝 New message:", data, "đã được gửi tới", data.receiver_id);

      const receiverSocketId = userSocketMap[data.receiver_id];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("chat", data);
      } else {
        console.log("⚠️ Receiver not connected:", data.receiver_id);
      }
    });

    // Xoá user khỏi map khi disconnect
    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
      // Xoá socket.id khỏi map nếu cần
      for (const user_id in userSocketMap) {
        if (userSocketMap[user_id] === socket.id) {
          delete userSocketMap[user_id];
          break;
        }
      }
    });
  });
};
