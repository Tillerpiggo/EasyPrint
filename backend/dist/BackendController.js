"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendController = void 0;
const DummyCodeParser_1 = require("./DummyCodeParser");
const PrintStatementGenerator_1 = require("./PrintStatementGenerator");
// import { PromptType } from './PromptType';
//import { CodeModifier } from './CodeModifier';
class BackendController {
    //private codeModifier: CodeModifier;
    constructor(filePath, apiKey) {
        this.filePath = filePath;
        this.codeParser = new DummyCodeParser_1.default(filePath);
        this.printStatementGenerator = new PrintStatementGenerator_1.PrintStatementGenerator(apiKey);
        //this.codeModifier = new CodeModifier();
    }
    async onHighlight(code) {
        const promptType = PromptType.SingleLine;
        const printStatement = "hello wolrd!!!!!!!!!!!"; //await this.printStatementGenerator.generatePrintStatement(promptType, code);
        return printStatement;
    }
}
exports.BackendController = BackendController;
//# sourceMappingURL=BackendController.js.map