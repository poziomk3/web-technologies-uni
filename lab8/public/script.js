const socket = io();

document.getElementById("join-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const room = document.getElementById("room").value;

  if (username && room) {
    socket.emit("joinRoom", { username, room });
    document.getElementById("chat-box").style.display = "block";
  }
});

document.getElementById("send-btn").addEventListener("click", () => {
  const messageInput = document.getElementById("message");
  const message = messageInput.value;
  if (message) {
    socket.emit("chatMessage", message);
    messageInput.value = "";
    socket.emit("stopTyping");
  }
});

document.getElementById("message").addEventListener("input", () => {
  socket.emit("typing");
  setTimeout(() => {
    socket.emit("stopTyping");
  }, 3000);
});

document.getElementById("image-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      socket.emit("sendImage", reader.result);
    };
    reader.readAsDataURL(file);
  }
});

socket.on("message", (data) => {
  const messagesDiv = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  if (data.user === document.getElementById("username").value) {
    messageElement.classList.add("own-message");
  } else {
    messageElement.classList.add("other-message");
  }

  messageElement.innerHTML = `<strong>${data.user}</strong>: ${
    data.text
  } <br> <small>${new Date(data.time).toLocaleTimeString()}</small>`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on("imageMessage", (data) => {
  const messagesDiv = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  if (data.user === document.getElementById("username").value) {
    messageElement.classList.add("own-message");
  } else {
    messageElement.classList.add("other-message");
  }

  messageElement.innerHTML = `<strong>${data.user}</strong>: <br> <img src="${
    data.image
  }" width="200"> <br> <small>${new Date(
    data.time
  ).toLocaleTimeString()}</small>`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on("typing", (username) => {
  document.getElementById("typing").innerText = `${username} is typing...`;
});

socket.on("stopTyping", () => {
  document.getElementById("typing").innerText = "";
});
