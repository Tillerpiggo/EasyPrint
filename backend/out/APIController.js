"use strict";
// import OpenAI from 'openai';
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIController = void 0;
const openai_1 = require("openai");
class APIController {
    constructor(apiKey) {
        this.openai = new openai_1.default({ apiKey });
    }
    async generateResponse(prompt, maxTokens = 50) {
        const response = await this.openai.completions.create({
            model: 'text-davinci-002',
            prompt: prompt,
            max_tokens: maxTokens,
            temperature: 0.2
        });
        return response.choices[0].text.trim();
    }
}
exports.APIController = APIController;
//# sourceMappingURL=APIController.js.map