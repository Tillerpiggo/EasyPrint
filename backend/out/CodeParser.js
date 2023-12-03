"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const FileType_1 = require("./FileType");
const Parser = require("web-tree-sitter");
class CodeParser {
    constructor(filePath) {
        this.filePath = filePath;
        this.fileType = this.getFileType();
        this.sourceCode = '';
        if (this.fileType === "Python" || this.fileType === "Java") {
            this.blockName = "block";
        }
        else {
            this.blockName = "statement_block";
        }
    }
    async initializeParserAndTree() {
        this.sourceCode = fs.readFileSync(this.filePath, 'utf-8');
        await Parser.init();
        this.parser = new Parser();
        await this.setParserLanguage();
        this.tree = this.parser.parse(this.sourceCode);
    }
    async setParserLanguage() {
        let wasmFilePath = '';
        const wasmDir = path.join(__dirname, '..', 'Parsers');
        if (this.fileType == "Python") {
            wasmFilePath = path.join(wasmDir, 'tree-sitter-python.wasm');
        }
        else if (this.fileType == "JavaScript") {
            wasmFilePath = path.join(wasmDir, 'tree-sitter-javascript.wasm');
        }
        else if (this.fileType == "Java") {
            wasmFilePath = path.join(wasmDir, 'tree-sitter-java.wasm');
        }
        else if (this.fileType == "TypeScript") {
            wasmFilePath = path.join(wasmDir, 'tree-sitter-typescript.wasm');
        }
        this.lang = await Parser.Language.load(wasmFilePath);
        this.parser.setLanguage(this.lang);
    }
    getScopeAtPosition(vs_point) {
        this.printTree(this.tree.rootNode, 0);
        const point = {
            row: vs_point.line,
            column: vs_point.character
        };
        const line = this.getLineAtPosition(point);
        if (!line || /^\s*$/.test(line)) {
            return [];
        }
        return this.getLineRanges(point.row);
    }
    printTree(node, depth) {
        console.log(`${'  '.repeat(depth)}${node.type} : ${node.startPosition.row + 1}`);
        for (const childNode of node.children) {
            this.printTree(childNode, depth + 1);
        }
    }
    getLineRanges(targetLine) {
        let node;
        if (this.fileType === "Python") {
            node = this.getNodeAtLine(this.tree.rootNode, targetLine + 1);
        }
        else {
            node = this.getNodeAtLine(this.tree.rootNode, targetLine);
        }
        if (!node) {
            return [targetLine, targetLine];
        }
        const lastNode = this.getLastDescendant(node);
        const end = lastNode.endPosition.row;
        return [targetLine, end];
    }
    getNodeAtLine(node, targetLine) {
        if (!node || node.startPosition.row > targetLine) {
            return null;
        }
        if (node.startPosition.row === targetLine && (node.type === this.blockName || node.type === "class_declaration")) {
            return node;
        }
        for (let i = 0, childCount = node.childCount; i < childCount; i++) {
            const ret_node = this.getNodeAtLine(node.child(i), targetLine);
            if (ret_node) {
                return ret_node;
            }
        }
    }
    getCodeAtLines(start, end) {
        const lines = this.sourceCode.split('\n');
        const scopedLines = lines.slice(start, end + 1);
        return scopedLines.join('\n');
    }
    getLastDescendant(node) {
        if (node.childCount === 0) {
            return node;
        }
        else {
            const lastChild = node.lastChild;
            return this.getLastDescendant(lastChild);
        }
    }
    getLineAtPosition(point) {
        const lines = this.sourceCode.split('\n');
        if (point.row >= 0 && point.row < lines.length) {
            return lines[point.row];
        }
        return '';
    }
    getFileType() {
        var _a, _b;
        const fileExtension = (_a = this.filePath.split('.').pop()) !== null && _a !== void 0 ? _a : "";
        return (_b = FileType_1.fileTypeDict[fileExtension]) !== null && _b !== void 0 ? _b : "Unknown";
    }
    findEasyPrintLines() {
        this.sourceCode = fs.readFileSync(this.filePath, 'utf-8');
        const lineNumbers = [];
        let searchString = "Added by EasyPrint";
        this.sourceCode.split('\n').forEach((line, index) => {
            if (line.includes(searchString)) {
                lineNumbers.push(index);
            }
        });
        console.log(lineNumbers);
        return lineNumbers;
    }
}
exports.default = CodeParser;
//# sourceMappingURL=CodeParser.js.map