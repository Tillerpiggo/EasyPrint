"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as assert from 'assert';
//import { generateResponse } from '../../APIController';
const globals_1 = require("@jest/globals");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
//import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
const { generateResponse } = require('../../APIController');
//suite('Extension Test Suite', () => {
//vscode.window.showInformationMessage('Start all tests.');
(0, globals_1.test)('adds two numbers', async () => {
    try {
        const response = await generateResponse("Please send me a message that says hello");
        // Print the generated response
        (0, globals_1.expect)(response).toBe("Hello!");
    }
    catch (error) {
        console.error('Error:', error);
    }
    //expect(1+2).toBe(3);
});
//});
//# sourceMappingURL=extension.test.js.map