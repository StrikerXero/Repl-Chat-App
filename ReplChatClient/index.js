const io = require("socket.io-client");
const readline = require("readline");

let socket = io("https://repl-chat-server.strikerxero1.repl.co");
let chat_handle = "";
let message_to_send = "";

const chat_interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on("connect", function () {
  get_chat_handle();
  socket.on("broadcast", display_message);
});

function get_chat_handle() {
  chat_interface.question(`Hello! What is your name? `, function (answer) {
    chat_handle = answer;
    socket.emit("message", chat_handle + " has entered the chat");
  chat();
  });
}

function chat() {
  chat_interface.question(chat_handle + ": ", function (message) {
    socket.emit("message", message_to_send);
  chat();
  });
}

function display_message(message) {
  if (message_to_send != message) {
    console.log("\n" + message);
    chat();
  }
}