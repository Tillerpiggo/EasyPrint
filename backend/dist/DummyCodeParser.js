"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DummyCodeParser {
    constructor(code) {
        this.code = code;
    }
    // Get the smallest node that includes a given point
    getScopeAtPosition(point) {
        // Always return the same code, regardless of the point
        return this.code;
    }
    // Get the code between two line numbers
    getCodeAtLines(start, end) {
        // Always return the same code, regardless of the start and end
        return this.code;
    }
    // Get the "bottom-right-most" descendant of a given node
    getLastDescendant(node) {
        // Always return the same code, regardless of the node
        return this.code;
    }
}
exports.default = DummyCodeParser;
//# sourceMappingURL=DummyCodeParser.js.map