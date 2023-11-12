import * as vscode from 'vscode';
export declare class BackendController {
    private codeParser;
    private printStatementGenerator;
    constructor(filePath: string, apiKey: string);
    onHighlight(code: string): Promise<string>;
    onHover(pos: vscode.Position): Promise<vscode.Range[]>;
}
