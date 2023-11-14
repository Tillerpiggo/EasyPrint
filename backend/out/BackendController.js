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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendController = void 0;
const CodeParser_1 = __importDefault(require("./CodeParser"));
const PrintStatementGenerator_1 = require("./PrintStatementGenerator");
const PromptType_1 = require("./PromptType");
const vscode = __importStar(require("vscode"));
class BackendController {
    constructor(filePath, apiKey) {
        this.codeParser = new CodeParser_1.default(filePath);
        this.printStatementGenerator = new PrintStatementGenerator_1.PrintStatementGenerator(apiKey, this.codeParser.fileType);
    }
    async onHighlight(code) {
        const promptType = PromptType_1.PromptType.SingleLine;
        const linesOfCode = code.split('\n');
        const insertionLines = [linesOfCode.length];
        const codeWithPrintStatement = await this.printStatementGenerator.insertPrintStatements(promptType, code, insertionLines);
        return codeWithPrintStatement;
    }
    async onHover(pos) {
        await this.codeParser.initializeParserAndTree();
        const linesToHighlight = this.codeParser.getScopeAtPosition(pos);
        let ranges = [];
        for (let line of linesToHighlight) {
            const code = this.codeParser.getCodeAtLines(line, line);
            const startCol = code.search(/\S/);
            const endCol = code.search(/\S\s*$/) + 1;
            const start = new vscode.Position(line, startCol);
            const end = new vscode.Position(line, endCol);
            ranges.push(new vscode.Range(start, end));
        }
        return ranges;
    }
}
exports.BackendController = BackendController;
//# sourceMappingURL=BackendController.js.map