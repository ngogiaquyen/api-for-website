const Message = require("../models/Message.model");
const ConversationModel = require("~/modules/Conversation/models/Conversation.model.js");
const UserModel = require("~/modules/user/models/user.model.js");

// Gửi tin nhắn mới
exports.sendMessage = (req, res) => {
  const messageData = req.body;

  UserModel.checkOrCreateUser({ id: messageData.sender_id }, (err, userId) => {
    if (err) {
      console.error("Lỗi:", err);
    } else {
      console.log("User đã tồn tại hoặc vừa được tạo, ID:", userId);

      ConversationModel.checkOrCreateConversation(
        messageData.conversation_id,
        messageData.sender_id,
        3,
        null,
        (err, id) => {
          if (err) {
            console.error("Lỗi khi kiểm tra hoặc tạo cuộc hội thoại:", err);
            // Trả lỗi về client nếu bạn đang trong route handler
            // res.status(500).json({ error: 'Internal server error' });
          } else {

            Message.sendMessage(messageData, (err, result) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .json({ message: "Error sending message", error: err });
              }
              res
                .status(201)
                .json({ message: "Message sent successfully", data: result });
            });
          }
        }
      );
    }
  });
};

// Lấy danh sách tin nhắn trong một cuộc trò chuyện
exports.getMessages = (req, res) => {
  const conversationId = req.params.conversationId;
  Message.getMessages(conversationId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving messages", error: err });
    }
    res.status(200).json(result);
  });
};

// set seen cho tin nhắn
exports.setSeenMessage = (req, res) => {
  const senderId = req.params.senderId;
  Message.setSeenMessage(senderId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving messages", error: err });
    }
    res.status(200).json(result);
  });
};

// lấy danh sách user chưa seen tin nhắn
exports.getUserNotSeen = (req, res) => {
  Message.getLastConversation((err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving messages", error: err });
    }
    res.status(200).json(result);
  });
}

// Lấy danh sách tin nhắn trong một cuộc trò chuyện
exports.getMessagesByCustomer = (req, res) => {
  const customerId = req.params.customerId;
  Message.getConversations(customerId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving messages", error: err });
    }
    // khi tìm thấy hội thoại
    if (result) {
      const conversationId = result.id;

      Message.getMessages(conversationId, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error retrieving messages", error: err });
        }
        res.status(200).json(result);
      });
    } else {
      return res
        .status(500)
        .json({ message: "Error getting message", error: err });
    }
  });
};
