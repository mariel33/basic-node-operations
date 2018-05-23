const fs = require("fs");
const readLine = require("readline-specific");
const readLastLines = require("read-last-lines");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            break;
        default:
            commandLibrary.errorHandler(userInputArray);
            break;

    }
}

const commandLibrary = {
    "echo": function (userInput) {
        done(userInput);
    },
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        })
    },
    "head": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, "utf8", (err, data) => {
            if(err) throw err;
            const lines = data.toString().split("\n");
            done(lines.slice(0, 2).join("\n"));
        })
    },
    "tail": function(fullPath) {
        const fileName = fullPath[0];
        readLastLines.read(fileName, 4).then((lines) =>{
        done(lines);
        })
    },
    default: function(userInput) {
        done(`${userInput} is not a command`);
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;