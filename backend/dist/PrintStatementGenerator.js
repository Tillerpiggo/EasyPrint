"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintStatementGenerator = void 0;
const PromptGenerator_1 = require("./PromptGenerator");
const APIController_1 = require("./APIController");
const OutputParser_1 = require("./OutputParser");
class PrintStatementGenerator {
    constructor(apiKey) {
        this.promptGenerator = new PromptGenerator_1.PromptGenerator();
        this.apiController = new APIController_1.APIController(apiKey);
        this.outputParser = new OutputParser_1.OutputParser();
    }
    async generatePrintStatement(promptType, code, maxTokens = 100) {
        // Generate the prompt
        const prompt = this.promptGenerator.generate(promptType, code);
        // Get the response from APIController
        const apiResponse = await this.apiController.generateResponse(prompt, maxTokens);
        // Parse the response to get the first code block
        const parsedResponse = this.outputParser.extractCodeBox(apiResponse);
        // Return the code with the print statement
        return `${parsedResponse}`;
    }
}
exports.PrintStatementGenerator = PrintStatementGenerator;
//# sourceMappingURL=PrintStatementGenerator.js.map