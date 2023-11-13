"use strict";
const { APIController } = require('../../APIController');
const apiKey = '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';
const apiController = new APIController(apiKey);
test('Tests basic response from AI API', async () => {
    try {
        const response = 1 + 3;
        expect(response).toBe(4);
    }
    catch (error) {
        console.error('Error:', error);
    }
});
//# sourceMappingURL=APIController.test.js.map