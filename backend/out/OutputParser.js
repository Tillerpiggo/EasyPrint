"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputParser = void 0;
class OutputParser {
    constructor(fileType) {
        this.fileType = fileType;
    }
    parse(code, response, lines) {
        var _a;
        const lastLineIndentation = ((_a = (code.match(/.*\S.*$/mg) || []).pop()) === null || _a === void 0 ? void 0 : _a.match(/^\s*/)) || '';
        const trimmedResponse = response.trimStart();
        let responseLines = trimmedResponse.split('\n');
        let inCodeBlock = false;
        responseLines = responseLines.filter(line => {
            if (line.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                return false;
            }
            return inCodeBlock;
        });
        const indentedResponse = responseLines.map(line => lastLineIndentation + line).join('\n');
        const updatedCode = code + '\n' + indentedResponse;
        return updatedCode;
    }
    parse_comments(apiResponse, lines) {
        let responseLines = apiResponse.split('\n');
        let inCodeBlock = false;
        let extractedCode = responseLines.filter(line => {
            if (line.trim().startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                return false;
            }
            return inCodeBlock;
        });
        return extractedCode.join('\n');
    }
}
exports.OutputParser = OutputParser;
//# sourceMappingURL=OutputParser.js.map