exports.fomatMessageEmail = (data)=>{
    return `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
    <h3 style="color: #2c3e50; margin-top: 0;">📨 Bạn có một tin nhắn mới</h3>
    <p><strong>👤 Người gửi (ID):</strong> ${data.sender_id}</p>
    <p><strong>💬 Nội dung:</strong> ${data.content}</p>
    <p><strong>🕒 Thời gian:</strong> ${data.timestamp}</p>
    </div>`

}

exports.convertMessageDataToFormData = (messageData) => {
  const formData = new FormData();

  // Lặp qua các thuộc tính của messageData và thêm vào formData
  for (const key in messageData) {
    if (messageData.hasOwnProperty(key)) {
      formData.append(key, messageData[key]);
    }
  }

  return formData;
}