import { PromptType } from './PromptType';
export declare class PrintStatementGenerator {
    private promptGenerator;
    private apiController;
    private outputParser;
    constructor(apiKey: string, fileType: string);
    insertResponse(promptType: PromptType, code: string, lines: number[], maxTokens?: number): AsyncGenerator<string, void, unknown>;
}
