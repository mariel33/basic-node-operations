const fs = require("fs");
const readLine = require("readline-specific");;

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
            commandLibrary.head(userInputArray);
            break;
        case "tail":
            commandLibrary.tail(userInputArray[userInputArray -1]);
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
        fs.readFile(fileName, 2, (err, data) => {
            if(err) throw err;
            const lines = data.split("\n");
            done(lines);
        })
    },
    "tail": function(fullPath) {
        const fileName = fullPath[fullPath-1];
        fs.readFile(fileName, (err,data) => {
            if(err) throw err;
            done(data);
        })
    },
    default: function(userInput) {
        done(`${userInput} is not a command`);
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;