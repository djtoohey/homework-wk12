const inquirer = require("inquirer");
const mysql = require("mysql");


function test() {
    console.table([
        {
            name: 'foo',
            age: 10
        }, {
            name: 'bar',
            age: 20
        }
    ]);


}

module.exports = {
    test
}