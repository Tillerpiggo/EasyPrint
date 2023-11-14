"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputParser = void 0;
class OutputParser {
    parse(code, response, lines) {
        var _a;
        const lastLineIndentation = ((_a = (code.match(/.*\S.*$/mg) || []).pop()) === null || _a === void 0 ? void 0 : _a.match(/^\s*/)) || '';
        const trimmedResponse = response.trimStart();
        const updatedCode = code + '\n' + lastLineIndentation + trimmedResponse;
        return updatedCode;
    }
}
exports.OutputParser = OutputParser;
//# sourceMappingURL=OutputParser.js.map