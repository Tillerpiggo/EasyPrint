"use strict";
//import * as assert from 'assert';
//import { generateResponse } from '../../APIController';
const expect = require('@jest/globals');
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
//import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
const { generateResponse } = require('../../APIController');
//suite('Extension Test Suite', () => {
//vscode.window.showInformationMessage('Start all tests.');
test('Tests basic response from AI API', async () => {
    try {
        const response = await generateResponse("Please send me a message that says hello");
        // Print the generated response
        expect(response).toBe("Hello!");
    }
    catch (error) {
        console.error('Error:', error);
    }
});
test('Tests another basic response from AI API', async () => {
    try {
        const response = await generateResponse("Please send me a message that says goodbye with no punctuation and all lower case");
        // Print the generated response
        expect(response).toBe("goodbye");
    }
    catch (error) {
        console.error('Error:', error);
    }
});
//});
//# sourceMappingURL=extension.test.js.map