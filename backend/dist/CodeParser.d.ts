import * as vscode from "vscode";
interface Point {
    row: number;
    column: number;
}
export interface FileParser {
    fileType: string;
    initializeParserAndTree(): Promise<void>;
    setParserLanguage(): Promise<void>;
    getScopeAtPosition(point: vscode.Position): number[];
    printTree(node: any, depth: number): void;
    getLineRanges(targetLine: number): number[];
    getNodeAtLine(node: any, targetLine: number): any;
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getFileType(): string;
}
declare class CodeParser implements FileParser {
    private filePath;
    private parser;
    private tree;
    private sourceCode;
    private lang;
    private blockName;
    fileType: string;
    constructor(filePath: string);
    initializeParserAndTree(): Promise<void>;
    setParserLanguage(): Promise<void>;
    getScopeAtPosition(vs_point: vscode.Position): number[];
    printTree(node: any, depth: number): void;
    getLineRanges(targetLine: number): number[];
    getNodeAtLine(node: any, targetLine: number): any;
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getLineAtPosition(point: Point): string;
    getFileType(): string;
}
export default CodeParser;
