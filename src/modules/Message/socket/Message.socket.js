const { convertMessageDataToFormData } = require("../../../helper");
const { postData } = require("../../../helper/apiService.js");
const { fetchMessage } = require("../../../helper/fetchMessage");
const { handleMessage } = require("../controllers/Message.controller");

// Lưu trữ ánh xạ giữa user_id và socket.id
const userSocketMap = {}; // { user_id: socket.id }

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected chat:", socket.id);

    // Đánh dấu đã thông báo = false ban đầu
    socket.hasNotified = false;

    // Bước 1: Client phải gửi user_id sau khi kết nối
    socket.on("register", (user_id) => {
      userSocketMap[user_id] = socket.id;
      console.log(`✅ User ${user_id} registered with socket ${socket.id}`);
    });

    // Bước 2: Gửi message tới người nhận
    socket.on("newMessage", async (data) => {
      console.log("📝 New message:", data, "đã được gửi tới", data.receiver_id);

      const receiverSocketId = userSocketMap[data.receiver_id];
      const senderSocketId = userSocketMap[data.sender_id];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("chat", data);
      } else {
        console.log("⚠️ Receiver not connected:", data.receiver_id);
      }

      // xử lí gửi về email các thứ
      if (data.receiver_id === 1 && !socket.hasNotified) {
        handleMessage(data);
        socket.hasNotified = true; // Đánh dấu đã gửi email
      }
      if(data.receiver_id === 1){
        const result = await fetchMessage(data);
        
        const formData = convertMessageDataToFormData(result);
        // lưu tin vào db
        const response = await postData('/message/send', formData);
        
        // gửi tin nhắn từ bot lại người send
        if (senderSocketId) {
          io.to(senderSocketId).emit("chat", result);
          console.log("đã gửi lại")
        } else {
          console.log("⚠️ sender not connected:", data.sender_id);
        }
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
