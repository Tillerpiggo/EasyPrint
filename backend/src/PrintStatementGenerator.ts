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
    this.outputParser = new OutputParser(fileType);
  }
  async insertPrintStatements(promptType: PromptType, code: string, lines: number[], maxTokens: number = 100): Promise<string> {
    const prompt = this.promptGenerator.generate(promptType, code);
    const apiResponse = await this.apiController.generateResponse(prompt, maxTokens);
    let parsedResponse;
    if (promptType === PromptType.SingleLine){
     parsedResponse = this.outputParser.parse(code, apiResponse, lines);
    }else{
     parsedResponse = this.outputParser.parse_comments(apiResponse, lines);
    }
    return `${parsedResponse}`;
  }
  async insertComments(promptType: PromptType, code: string, lines: number[], maxTokens: number = 100): Promise<string> {
    const prompt = this.promptGenerator.generate(promptType, code);
    const apiResponse = await this.apiController.generateResponse(prompt, maxTokens);
    const parsedResponse = this.outputParser.parse_comments(apiResponse, lines);

    return `${parsedResponse}`;
  }
}
