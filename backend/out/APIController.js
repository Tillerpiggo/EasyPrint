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
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: [
                { "role": "system", "content": "You are EasyPrint, the world's best printing plugin." },
                { "role": "user", "content": prompt },
            ]
        });
        if (response && response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
            return response.choices[0].message.content.trim();
        }
        else {
            return "FAIL";
        }
    }
}
exports.APIController = APIController;
//# sourceMappingURL=APIController.js.map