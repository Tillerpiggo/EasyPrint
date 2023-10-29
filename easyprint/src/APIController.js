"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
const openai_1 = require("openai");
// Set your OpenAI API key
const apiKey = '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';
const openai = new openai_1.default({ apiKey });
// Define a function to interact with the GPT-3.5 Turbo model
async function generateResponse(prompt, maxTokens = 50) {
    const response = await openai.completions.create({
        model: 'text-davinci-002',
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: 0.2
    });
    return response.choices[0].text.trim();
}
exports.generateResponse = generateResponse;
// // Example prompt
// const prompt = "Translate the following English text to French: 'Hello, how are you?'";
// // Send a request to GPT-3.5 Turbo and receive a response
// generateResponse(prompt)
//     .then((response) => {
//         // Print the generated response
//         console.log(response);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
//# sourceMappingURL=APIController.js.map