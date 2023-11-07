export declare class APIController {
    private openai;
    constructor(apiKey: string);
    generateResponse(prompt: string, maxTokens?: number): Promise<string>;
}
