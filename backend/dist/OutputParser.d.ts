export declare class OutputParser {
    private isInsideCodeBlock;
    private hasAddedCodeInCurrentBlock;
    private tokensToSkip;
    constructor();
    parse(code: string, response: string, lines: number[]): string;
    processTokens(code: string, tokenGenerator: AsyncGenerator<string, void, unknown>, lines: number[]): AsyncGenerator<string, void, unknown>;
    parseToken(code: string, token: string, lines: number[]): string;
}
