var inquirer = require("inquirer");
var fs = require("fs");
var util = require("util");

const createReadAsync = util.promisify(fs.writeFile)

function questions() {
    return inquirer.prompt([
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
            message: "What command would you need to install?",
            name: "install"

        },
        {
            type: "input",
            message: "Who has contributed to this project?",
            name: "contribute"

        },
        {
            type: "input",
            message: "How would you run a test?",
            name: "testing"

        },
        {
            type: "checkbox",
            message: "What license is this project under?",
            name: "license",
            choices: ["MIT", "GNU", "BSD", "Apache"]

        },
    ])
}


function writeToFile(input) {
    return `
# ${input.projectName}
![npm](https://img.shields.io/static/v1?label=npm&message=${input.license}&color=orange)

## Table of Contents:
* [Description](###-*Description:*)
* [Getting Started](###-**Getting-Started**)
* [Installing](###-*Installing:*)
* [Running Tests](###-*Running-Tests:*)
* [Contributing](##-**Contributing**)
* [License](##-**License**)
* [Questions](##-**Questions**)


### *Description:*
${input.description}

## **Getting Started**
Want to get get started with your own here is what you will need. 

### *Installing:*
To clone you will need: 
${input.install}

### *Running Tests:*
You will need to ${input.testing}

## **Contributing**
The contributing parties are ${input.contribute}

## **License**

This project is licensed under ${input.license}

## **Questions**
If you have any questions please feel free to reach out:
GitHub: https://github.com/${input.username}

Email: ${input.email}
`
}



async function init() {
    try {
        const answers = await questions();

        const read = writeToFile(answers);

        await createReadAsync("README.md", read);

        console.log("Successfully wrote README.md")

    } catch (err) {
        console.log(err);
    }
}

init();