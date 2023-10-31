import * as assert from 'assert';
import { generateResponse } from '../../APIController';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	generateResponse("Please send me a message that says hello")
		.then((response) => {
			// Print the generated response
			console.log(response);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});
