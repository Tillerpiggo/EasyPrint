"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DummyCodeParser {
    constructor(code) {
        this.code = code;
    }
    getScopeAtPosition(point) {
        return this.code;
    }
    getCodeAtLines(start, end) {
        return this.code;
    }
    getLastDescendant(node) {
        return this.code;
    }
}
exports.default = DummyCodeParser;
//# sourceMappingURL=DummyCodeParser.js.map