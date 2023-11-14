<<<<<<< HEAD
import { PromptType } from './PromptType';
export declare class CodeParser {
    determinePromptType(input: string): PromptType;
}
=======
import * as vscode from "vscode";
export interface FileParser {
    getScopeAtPosition(point: vscode.Position): number[];
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getFileType(): string;
}
declare class CodeParser implements FileParser {
    private tree;
    private sourceCode;
    private filePath;
    constructor(filePath: string);
    getScopeAtPosition(point: vscode.Position): number[];
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getLineAtPosition(point: vscode.Position): string;
    getFileType(): string;
}
export default CodeParser;
>>>>>>> 52c73e55d501b710d467f3ce54207353d52c4fd8
