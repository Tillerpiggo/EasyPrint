"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIController_1 = require("../../APIController");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
// import * as myExtension from '../../extension';
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    (0, APIController_1.generateResponse)("Please send me a message that says hello")
        .then((response) => {
        // Print the generated response
        console.log(response);
    })
        .catch((error) => {
        console.error('Error:', error);
    });
});
//# sourceMappingURL=extension.test.js.map