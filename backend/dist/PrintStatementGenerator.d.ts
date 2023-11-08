import { PromptType } from './PromptType';
export declare class PrintStatementGenerator {
    private promptGenerator;
    private apiController;
    private outputParser;
    constructor(apiKey: string, fileType: string);
    generatePrintStatement(promptType: PromptType, code: string, maxTokens?: number): Promise<string>;
}
