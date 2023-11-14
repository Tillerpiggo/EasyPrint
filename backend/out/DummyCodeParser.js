"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileType_1 = require("./FileType");
const Parser = require('web-tree-sitter');
class DummyCodeParser {
    constructor(code) {
        this.code = code;
        (async () => {
            await Parser.init();
            const parser = new Parser();
            const lang = await Parser.Language.load('Users/macha/easyprint/backend/tree-sitter-javascript.wasm');
            parser.setLanguage(lang);
            const tree = parser.parse('let z = 5;');
            console.log("syntax tree: ", tree.rootNode.toString());
        })();
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