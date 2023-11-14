// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
//import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
const { APIController } = require('../../APIController');
const apiKey = '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';
const apiController = new APIController(apiKey);

	test('Tests basic response from AI API', async () => {
		try {
		  const response = 1+3;
	  
		  // Print the generated response
		  expect(response).toBe(4);
		} catch (error) {
		  console.error('Error:', error);
		}
	  });
	//   test('Tests basic response from AI API', async () => {
	// 	try {
	// 	  const response = await apiController.generateResponse("Please send me a message that says hello");
	  
	// 	  // Print the generated response
	// 	  expect(response).toBe("Hello!");
	// 	} catch (error) {
	// 	  console.error('Error:', error);
	// 	}
	//   });
	//   test('Tests another basic response from AI API', async () => {
	// 	try {
	// 	  const response = await apiController.generateResponse("Please send me a message that says goodbye with no punctuation and all lower case");
	  
	// 	  // Print the generated response
	// 	  expect(response).toBe("goodbye");
	// 	} catch (error) {
	// 	  console.error('Error:', error);
	// 	}
	//   });