export declare class OutputParser {
    private fileType;
    constructor(fileType: string);
    parse(code: string, response: string, lines: number[]): string;
}
