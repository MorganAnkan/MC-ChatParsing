const translations = require("./translations.json");

function processMsg(data) {
    if (typeof data.text == "undefined" && typeof data.translate !== "undefined" && !(typeof data == "string")) {
        let msg = "";
        let translate = translations[data.translate] || data.translate;
        let withdata = [];

        if (typeof data.with !== "undefined") {
            data.with.forEach(data => {
                withdata.push(processMsg(data));
            });
        }

        if (typeof data.text == "undefined") data.text = "";
        if (typeof data.color == "undefined") data.color = "";
        if (typeof data.bold == "undefined") data.bold = false;
        if (typeof data.obfuscated == "undefined") data.obfuscated = false;
        if (typeof data.underlined == "undefined") data.underlined = false;
        if (typeof data.italic == "undefined") data.italic = false;
        if (typeof data.strikethrough == "undefined") data.strikethrough = false;

        let color = getColor(data.color);
        let bold = data.bold == true ? "§l" : "";
        let obfuscated = data.obfuscated == true ? "§k" : "";
        let underlined = data.underlined == true ? "§n" : "";
        let italic = data.italic == true ? "§o" : "";
        let strikethrough = data.strikethrough == true ? "§m" : "";


        for (let i = 0; i < (translate.match(/%s/g) || []).length + 1; i++) {
            let replace = typeof withdata[i] !== "undefined" ? withdata[i] : "";
            translate = translate.replace("%s", replace + color + bold + obfuscated + underlined + italic + strikethrough);
        }

        msg = color + bold + obfuscated + underlined + italic + strikethrough + translate;

        if (typeof data.extra !== "undefined") {
            data.extra.forEach(data => {
                msg += processMsg(data);
            });
        }
        return msg;


    } else if (typeof data == "string") {
        return data;
    } else {
        if (typeof data.text == "undefined") data.text = "";
        if (typeof data.color == "undefined") data.color = "";
        if (typeof data.bold == "undefined") data.bold = false;
        if (typeof data.obfuscated == "undefined") data.obfuscated = false;
        if (typeof data.underlined == "undefined") data.underlined = false;
        if (typeof data.italic == "undefined") data.italic = false;
        if (typeof data.strikethrough == "undefined") data.strikethrough = false;

        let color = getColor(data.color);
        let bold = data.bold == true ? "§l" : "";
        let obfuscated = data.obfuscated == true ? "§k" : "";
        let underlined = data.underlined == true ? "§n" : "";
        let italic = data.italic == true ? "§o" : "";
        let strikethrough = data.strikethrough == true ? "§m" : "";

        let msg = color + bold + obfuscated + underlined + italic + strikethrough + data.text;

        if (typeof data.extra !== "undefined")
            data.extra.forEach(data => {
                msg = msg + processMsg(data);
            });

        return msg;
    }
}

const colors = {
    "reset": "§r",
    "white": "§f",
    "black": "§0",
    "red": "§c",
    "dark_red": "§4",
    "green": "§a",
    "dark_green": "§2",
    "light_purple": "§d",
    "dark_purple": "§5",
    "blue": "§9",
    "dark_blue": "§1",
    "aqua": "§b",
    "dark_aqua": "§3",
    "gold": "§6",
    "yellow": "§e",
    "gray": "§7",
    "dark_gray": "§8"
}

const ansicolors = {
    "§0": "\x1b[30m",
    "§1": "\x1b[34m",
    "§2": "\x1b[32m",
    "§3": "\x1b[36m",
    "§4": "\x1b[31m",
    "§5": "\x1b[35m",
    "§6": "\x1b[33m",
    "§7": "\x1b[37m",
    "§8": "\x1b[90m",
    "§9": "\x1b[94m",
    "§a": "\x1b[92m",
    "§b": "\x1b[96m",
    "§c": "\x1b[91m",
    "§d": "\x1b[95m",
    "§e": "\x1b[93m",
    "§f": "\x1b[97m",
    "§l": "\x1b[1m",
    "§o": "\x1b[3m",
    "§n": "\x1b[4m",
    "§m": "\x1b[9m",
    "§k": "\x1b[6m",
    "§r": "\x1b[0m"
}

function getColor(cl) {
    return colors[cl] == undefined ? "" : colors[cl];
}

function toAnsi(message) {
    Object.keys(ansicolors).forEach(c => {
        message = message.replace(new RegExp(c, "g"), ansicolors[c]);
    });
    return message;
}

function cleanup(message) {
    return message.replace(/(§([a-f|[0-9]|[rlonmk]))/g, "").replace(/§/g, "");
}

module.exports = {processMsg, getColor, toAnsi, cleanup};
