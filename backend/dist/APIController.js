"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIController = void 0;
const openai_1 = __importDefault(require("openai"));
class APIController {
    constructor(apiKey) {
        this.openai = new openai_1.default({ apiKey });
    }
    async generateResponse(prompt, maxTokens = 100) {
        const response = await this.openai.completions.create({
            model: 'text-davinci-002',
            prompt: prompt,
            max_tokens: maxTokens,
            temperature: 0.0
        });
        return response.choices[0].text.trim();
    }
}
exports.APIController = APIController;
//# sourceMappingURL=APIController.js.map