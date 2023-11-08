import { PromptType } from './PromptType';
import { PromptGenerator } from './PromptGenerator';
import { APIController } from './APIController';
import { OutputParser } from './OutputParser';

export class PrintStatementGenerator {
  private promptGenerator: PromptGenerator;
  private apiController: APIController;
  private outputParser: OutputParser;

  constructor(apiKey: string, fileType: string) {
    this.promptGenerator = new PromptGenerator(fileType);
    this.apiController = new APIController(apiKey);
    this.outputParser = new OutputParser();
  }
  async generatePrintStatement(promptType: PromptType, code: string, maxTokens: number = 100): Promise<string> {
    // Generate the prompt
    const prompt = this.promptGenerator.generate(promptType, code);
    console.log("prompt: " + prompt)
    // Get the response from APIController
    const apiResponse = await this.apiController.generateResponse(prompt, maxTokens);
    console.log("apiResponse: " + apiResponse)
    // Parse the response to get the first code block
    const parsedResponse = this.outputParser.extractCodeBox(apiResponse);
    console.log("parsedResponse: " + parsedResponse)
    // Return the code with the print statement
    return `${parsedResponse}`;
  }
}
