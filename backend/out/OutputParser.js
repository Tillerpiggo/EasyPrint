"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputParser = void 0;
class OutputParser {
    parse(response) {
        const match = response.match(/ ([^`]+)/s);
        if (match) {
            return match[1].trim();
        }
        else {
            return '';
        }
    }
}
exports.OutputParser = OutputParser;
//# sourceMappingURL=OutputParser.js.map