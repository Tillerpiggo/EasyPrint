"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendController = void 0;
const DummyCodeParser_1 = __importDefault(require("./DummyCodeParser"));
const PrintStatementGenerator_1 = require("./PrintStatementGenerator");
const PromptType_1 = require("./PromptType");
class BackendController {
    constructor(filePath, apiKey) {
        this.filePath = filePath;
        this.codeParser = new DummyCodeParser_1.default(filePath);
        this.printStatementGenerator = new PrintStatementGenerator_1.PrintStatementGenerator(apiKey);
    }
    async onHighlight(code) {
        const promptType = PromptType_1.PromptType.SingleLine;
        const printStatement = await this.printStatementGenerator.generatePrintStatement(promptType, code);
        return printStatement;
    }
}
exports.BackendController = BackendController;
//# sourceMappingURL=BackendController.js.map