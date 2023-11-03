import { PromptType } from './PromptType';
import { PromptGenerator } from './PromptGenerator';
import { APIController } from './APIController';
import { OutputParser } from './OutputParser';

export class PrintStatementGenerator {
    private promptGenerator: PromptGenerator;
    private apiController: APIController;
    private outputParser: OutputParser;

    constructor(apiKey: string) {
        this.promptGenerator = new PromptGenerator();
        this.apiController = new APIController(apiKey);
        this.outputParser = new OutputParser();
    }

    async generatePrintStatement(promptType: PromptType, code: string, maxTokens: number = 50): Promise<string> {
        // Generate the prompt
        const prompt = this.promptGenerator.generate(promptType, code);

        // Get the response from APIController
        const apiResponse = await this.apiController.generateResponse(prompt, maxTokens);

        // Parse the response to get the first code block
        const parsedResponse = this.outputParser.parse(apiResponse);

        // Return the code with the print statement
        return `${parsedResponse}`;
    }
}
