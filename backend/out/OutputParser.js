"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputParser = void 0;
class OutputParser {
    extractCodeBox(response) {
        // Use a regular expression to extract the code box
        const codeBoxRegex = /```([^`]+)```/s;
        const match = codeBoxRegex.exec(response);
        if (match) {
            return match[1].trim();
        }
        else {
            return null;
        }
    }
}
exports.OutputParser = OutputParser;
//# sourceMappingURL=OutputParser.js.map