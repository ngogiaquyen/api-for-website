// fetchMessage.js
const url_base = "https://chatbot-project-i58r.onrender.com/api/chat/";
// const url_base = "http://127.0.0.1:8000/api/chat/";
async function fetchMessage(message) {
  try {
    const response = await fetch(url_base, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Tin nhắn đã xử lý:", data);
    return data;
  } catch (error) {
    console.error("❌ Lỗi khi gửi tin nhắn tới API:", error);
    return null;
  }
}

module.exports = {
  fetchMessage,
};
