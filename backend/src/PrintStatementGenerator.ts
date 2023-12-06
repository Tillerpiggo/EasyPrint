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
  async *insertResponse(promptType: PromptType, code: string, lines: number[], maxTokens: number = 100): AsyncGenerator<string, void, unknown> {
    const prompt = this.promptGenerator.generate(promptType, code);
    const responseGenerator = this.apiController.generateResponse(prompt, maxTokens);
    
    if (promptType == PromptType.SingleLine) {
      for await (const updatedCode of this.outputParser.processTokens(code, responseGenerator, lines)) {
        yield updatedCode;
      }
    } else if (promptType == PromptType.Comment) {
      for await (const updatedCode of this.outputParser.processCommentTokens(code, responseGenerator, lines)) {
        yield updatedCode;
      }
    } else {
      let apiResponse = '';
      for await (const token of responseGenerator) {
        apiResponse += token;
      }
      yield this.outputParser.parse_comments(code, apiResponse, lines);
    }
  }

  
  // async *insertComments(promptType: PromptType, code: string, lines: number[], maxTokens: number = 100): AsyncGenerator<string, void, unknown> {
  //   const prompt = this.promptGenerator.generate(promptType, code);
  //   const responseGenerator = this.apiController.generateResponse(prompt, maxTokens);
    
  //   for await (const updatedCode of this.outputParser.processTokens(code, responseGenerator, lines)) {
  //       yield updatedCode;
  //   }
  // }
}
