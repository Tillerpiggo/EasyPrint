import * as vscode from 'vscode';
export declare class BackendController {
    private codeParser;
    private printStatementGenerator;
    private commentGenerator;
    constructor(filePath: string, apiKey: string);
    onHighlight(code: string): AsyncGenerator<string, void, unknown>;
    buildSyntaxTree(): Promise<void>;
    onHover(pos: vscode.Position): vscode.Range[];
    onHighlightComment(code: string): AsyncGenerator<string, void, unknown>;
    deleteComments(): number[];
}
