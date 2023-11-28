import * as vscode from 'vscode';
export declare class BackendController {
    private codeParser;
    private printStatementGenerator;
    private commentGenerator;
    constructor(filePath: string, apiKey: string);
    onHighlight(code: string): Promise<string>;
    onHover(pos: vscode.Position): Promise<vscode.Range[]>;
    onHighlightComment(code: string): Promise<string>;
    deleteComments(): number[];
}
