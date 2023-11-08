"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileType_1 = require("./FileType");
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
    getFileType() {
        const fileExtension = this.code.split('.').pop() ?? "";
        return FileType_1.fileTypeDict[fileExtension] ?? "Unknown";
    }
}
exports.default = DummyCodeParser;
//# sourceMappingURL=DummyCodeParser.js.map