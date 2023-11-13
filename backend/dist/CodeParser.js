"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeParser = void 0;
const PromptType_1 = require("./PromptType");
class CodeParser {
    determinePromptType(input) {
        const conditionalKeywords = ['if', 'else if', 'else', 'switch', 'case'];
        const loopKeywords = ['for', 'while', 'do'];
        if (loopKeywords.some(keyword => input.includes(keyword)) && conditionalKeywords.some(keyword => input.includes(keyword))) {
            return PromptType_1.PromptType.Combinational;
        }
        if (loopKeywords.some(keyword => input.includes(keyword))) {
            return PromptType_1.PromptType.Loop;
        }
        if (conditionalKeywords.some(keyword => input.includes(keyword))) {
            return PromptType_1.PromptType.Conditional;
        }
        return PromptType_1.PromptType.SingleLine;
    }
}
exports.CodeParser = CodeParser;
//# sourceMappingURL=CodeParser.js.map