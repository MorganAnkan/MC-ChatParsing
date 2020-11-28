const mc = require("minecraft-protocol");
const translations = require("./translations.json");
const chat_parser = require("./chat_parser.js");
const bot = mc.createClient({
  host: "localhost",
  port: 25565,
  username: "yeetBot",
  version: "1.15.2"
});

bot.on("login", () => {
  console.log("logged in");
});

bot.on("chat", (msgData, packetInfo) => {
  console.log(chat_parser.toAnsi(chat_parser.processMsg(JSON.parse(msgData.message))));
});
