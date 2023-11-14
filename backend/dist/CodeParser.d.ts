<<<<<<< HEAD
import { PromptType } from './PromptType';
export declare class CodeParser {
    determinePromptType(input: string): PromptType;
}
=======
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
    fileType: string;
    constructor(filePath: string);
    initializeParserAndTree(): Promise<void>;
    setParserLanguage(): Promise<void>;
    getScopeAtPosition(vs_point: vscode.Position): number[];
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getLineAtPosition(point: Point): string;
    getFileType(): string;
}
export default CodeParser;
>>>>>>> 52c73e55d501b710d467f3ce54207353d52c4fd8
