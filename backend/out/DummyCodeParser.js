"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileType_1 = require("./FileType");
class DummyCodeParser {
    constructor(code) {
        this.code = code;
    }
    getScopeAtPosition(point) {
        return point.row;
    }
    getCodeAtLines(start, end) {
        return this.code;
    }
    getLastDescendant(node) {
        return this.code;
    }
    getFileType() {
        var _a, _b;
        const fileExtension = (_a = this.code.split('.').pop()) !== null && _a !== void 0 ? _a : "";
        return (_b = FileType_1.fileTypeDict[fileExtension]) !== null && _b !== void 0 ? _b : "Unknown";
    }
}
exports.default = DummyCodeParser;
//# sourceMappingURL=DummyCodeParser.js.map