import * as vscode from "vscode";
export interface Point {
    row: number;
    col: number;
}
export interface FileParser {
    getScopeAtPosition(point: vscode.Position): number[];
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getFileType(): string;
}
declare class DummyCodeParser implements FileParser {
    private code;
    constructor(code: string);
    getScopeAtPosition(point: any): number[];
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getFileType(): string;
}
export default DummyCodeParser;
