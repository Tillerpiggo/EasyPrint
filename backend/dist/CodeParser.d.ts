import * as vscode from "vscode";
interface Point {
    row: number;
    column: number;
}
export interface FileParser {
    fileType: string;
    initializeParserAndTree(): Promise<void>;
    setParserLanguage(): Promise<void>;
    getScopeAtPosition(point: vscode.Position): [string | null, string | null, number[], number[]];
    printTree(node: any, depth: number): void;
    getNodeAtLine(node: any, targetLine: number, blockTypes: {
        [key: string]: ([string, {
            [key: string]: null;
        }, number[]] | null);
    }, isBlock: boolean): any;
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getFileType(): string;
    findEasyPrintLines(): number[];
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
    getScopeAtPosition(vs_point: vscode.Position): [string | null, string | null, number[], number[]];
    printTree(node: any, depth: number): void;
    getNodeAtLine(node: any, targetLine: number, blockTypes: {
        [key: string]: ([string, {
            [key: string]: null;
        }, number[]] | null);
    }, isBlock: boolean): any;
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getLineAtPosition(point: Point): string;
    getFileType(): string;
    findEasyPrintLines(): number[];
}
export default CodeParser;
