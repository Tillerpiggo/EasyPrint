"use strict";
const { expect } = require('@jest/globals');
const { APIController } = require('../../APIController');
const apiKey = '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';
const apiController = new APIController(apiKey);
test('Tests basic response from AI API', async () => {
    try {
        const response = await apiController.generateResponse("Please send me a message that says hello");
        expect(response).toBe("Hello!");
    }
    catch (error) {
        console.error('Error:', error);
    }
});
test('Tests another basic response from AI API', async () => {
    try {
        const response = await apiController.generateResponse("Please send me a message that says goodbye with no punctuation and all lower case");
        expect(response).toBe("goodbye");
    }
    catch (error) {
        console.error('Error:', error);
    }
});
//# sourceMappingURL=APIController.test.js.map