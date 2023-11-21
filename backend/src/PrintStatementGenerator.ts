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
  async *insertPrintStatements(promptType: PromptType, code: string, lines: number[], maxTokens: number = 100): AsyncGenerator<string, void, unknown> {
    const prompt = this.promptGenerator.generate(promptType, code);
    const responseGenerator = this.apiController.generateResponse(prompt, maxTokens);
    
    for await (const updatedCode of this.outputParser.processTokens(code, responseGenerator, lines)) {
      yield updatedCode;
    }
  }
  
  async insertComments(promptType: PromptType, code: string, lines: number[], maxTokens: number = 100): Promise<string> {
    const prompt = this.promptGenerator.generate(promptType, code);
    const responseGenerator = this.apiController.generateResponse(prompt, maxTokens);
    
    let apiResponse = '';
    for await (const token of responseGenerator) {
      apiResponse += token;
    }
    
    const parsedResponse = this.outputParser.parse(code, apiResponse, lines);
  
    return `${parsedResponse}`;
  }
}
