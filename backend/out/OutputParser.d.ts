export declare class OutputParser {
    private fileType;
    constructor(fileType: string);
    parse(code: string, response: string, lines: number[]): string;
    parse_comments(apiResponse: string, lines: number[]): string;
}
