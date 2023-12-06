export declare class OutputParser {
    private fileType;
    private isInsideCodeBlock;
    private hasAddedCodeInCurrentBlock;
    private tokensToSkip;
    private currentLine;
    private hasAddedTokenToNewLine;
    private codeLines;
    constructor(fileType: string);
    parse(code: string, response: string, lines: number[]): string;
    processTokens(code: string, tokenGenerator: AsyncGenerator<string, void, unknown>, lines: number[]): AsyncGenerator<string, void, unknown>;
    parseToken(code: string, token: string, lines: number[]): string;
    parse_comments(code: string, apiResponse: string, lines: number[]): string;
    processCommentTokens(code: string, tokenGenerator: AsyncGenerator<string, void, unknown>, lines: number[]): AsyncGenerator<string, void, unknown>;
    parseCommentToken(code: string, token: string, lines: number[]): string;
    insertEmptyLines(code: string, lines: number[]): string;
}
