const inquirer = require("inquirer");

function addDepartment() {
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?:",
        choices: [
            "Add Department",
            "END"
        ]
    }).then(function (data = { option }) {
        switch (data.option) {
            case "Add Department":
                // addDepartment();
                console.log("tes1t")
                break;

            default:
                break;
        }
    });
}

module.exports = addDepartment();