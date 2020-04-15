var inquirer = require("inquirer");
var fs = require("fs");
var util = require("util");

const createReadAsync = util.promisify(fs.writeFile);
//inside the const questions?

const questions = [
    inquirer.prompt([
        {
            type: "input",
            message: "What is your github username?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },

        {
            type: "input",
            message: "What is the tile of your project?",
            name: "projectName"

        },
        {
            type: "input",
            message: "What is a good description of your project?",
            name: "description"

        },
        {
            type: "input",
            message: "What command would you need to clone?",
            name: "clone"

        },
        {
            type: "input",
            message: "How would you run a test?",
            name: "testing"

        },
        {
            type: "input",
            message: "What do we need to know to contribute?",
            name: "contribute"

        },

    ])
];

function writeToFile(fileName, data) {
}

async function init() {
    try {
        const input = await questions();

        const read = writeToFile(input);

        await createReadAsync("readMe.md", read);

        console.log("Succesfully wrote ReadMe.md")

    } catch (err) {
        console.log(err);
    }
}

init();
