export declare class BackendController {
    private filePath;
    private codeParser;
    private printStatementGenerator;
    constructor(filePath: string, apiKey: string);
    onHighlight(code: string): Promise<string>;
}
