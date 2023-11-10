import * as vscode from 'vscode';
export declare class BackendController {
    private filePath;
    private codeParser;
    private printStatementGenerator;
    constructor(filePath: string, apiKey: string);
    onHighlight(code: string): Promise<string>;
    onHover(filePath: string, pos: vscode.Position): vscode.Range[];
}
