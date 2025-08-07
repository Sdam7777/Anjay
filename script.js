const API_KEY = "AIzaSyD3cqashT331L8Vs8bNZpaQk1L8eSJ1G3s"; // ⚠️ Hanya untuk lokal

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value;

  if (!userText) return;

  // Tampilkan pesan user
  chatBox.innerHTML += `<div class="message user">You: ${userText}</div>`;

  // Panggil API Gemini
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    });

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada respon";

    chatBox.innerHTML += `<div class="message bot">AI: ${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<div class="message bot">Error: ${error.message}</div>`;
  }

  input.value = "";
}
