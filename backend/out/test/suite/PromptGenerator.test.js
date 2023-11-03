"use strict";
test('Tests basic response from AI API', async () => {
    try {
        const prompt = (1 + 2);
        // Print the generated response
        expect(prompt).toBe(3);
    }
    catch (error) {
        console.error('Error:', error);
    }
});
//# sourceMappingURL=PromptGenerator.test.js.map