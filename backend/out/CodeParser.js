"use strict";
<<<<<<< HEAD
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeParser = void 0;
const PromptType_1 = require("./PromptType");
class CodeParser {
    determinePromptType(input) {
        const conditionalKeywords = ['if', 'else if', 'else', 'switch', 'case'];
        const loopKeywords = ['for', 'while', 'do'];
        if (loopKeywords.some(keyword => input.includes(keyword)) && conditionalKeywords.some(keyword => input.includes(keyword))) {
            return PromptType_1.PromptType.Combinational;
        }
        if (loopKeywords.some(keyword => input.includes(keyword))) {
            return PromptType_1.PromptType.Loop;
        }
        if (conditionalKeywords.some(keyword => input.includes(keyword))) {
            return PromptType_1.PromptType.Conditional;
        }
        return PromptType_1.PromptType.SingleLine;
    }
}
exports.CodeParser = CodeParser;
=======
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
const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');
const fs = __importStar(require("fs"));
const FileType_1 = require("./FileType");
class CodeParser {
    constructor(filePath) {
        this.filePath = filePath;
        const fileType = this.getFileType();
        let fileLanguage;
        const parser = new Parser();
        parser.setLanguage(fileLanguage);
        this.sourceCode = fs.readFileSync(filePath, 'utf-8');
        this.tree = parser.parse(this.sourceCode);
    }
    getScopeAtPosition(point) {
        const line = this.getLineAtPosition(point);
        if (!line || /^\s*$/.test(line)) {
            return [];
        }
        const node = this.tree.rootNode.namedDescendantForPosition(point);
        console.log("node:" + node);
        const start = node.startPosition.row;
        const lastNode = this.getLastDescendant(node);
        const end = lastNode.endPosition.row;
        return [start, end];
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
            const lastChild = node.lastNamedChild;
            return this.getLastDescendant(lastChild);
        }
    }
    getLineAtPosition(point) {
        const lines = this.sourceCode.split('\n');
        if (point.line >= 0 && point.line < lines.length) {
            return lines[point.line];
        }
        return '';
    }
    getFileType() {
        const fileExtension = this.filePath.split('.').pop() ?? "";
        return FileType_1.fileTypeDict[fileExtension] ?? "Unknown";
    }
}
exports.default = CodeParser;
>>>>>>> 52c73e55d501b710d467f3ce54207353d52c4fd8
//# sourceMappingURL=CodeParser.js.map