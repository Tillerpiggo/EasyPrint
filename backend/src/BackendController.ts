import { type } from 'os';
import CodeParser, { FileParser} from './CodeParser';
import { PrintStatementGenerator } from './PrintStatementGenerator';
import { PromptType } from './PromptType';
import * as vscode from 'vscode';
import {InputParser} from './InputParser'
//import { CodeModifier } from './CodeModifier';

export class BackendController {
    private codeParser: FileParser;
    private printStatementGenerator: PrintStatementGenerator;
    //private codeModifier: CodeModifier;
    private commentGenerator: PrintStatementGenerator;

    constructor(filePath: string, apiKey: string) {
        this.codeParser = new CodeParser(filePath);
        this.printStatementGenerator = new PrintStatementGenerator(apiKey, this.codeParser.fileType);
        //this.codeModifier = new CodeModifier();
        this.commentGenerator = new PrintStatementGenerator(apiKey, this.codeParser.fileType);
    }

    async *onHighlight(code: string): AsyncGenerator<string, void, unknown> {
        let inputParser = new InputParser()
        const promptType = inputParser.determinePromptType(code)
        console.log(promptType)
        // Insert at the end of the code
        const linesOfCode = code.split('\n');
        //const insertionLines = [linesOfCode.length];
        const insertionLines = [0, 2, 3]
        
        const printStatementGenerator = this.printStatementGenerator.insertResponse(promptType, code, insertionLines);
        
        for await (const updatedCode of printStatementGenerator) {
            yield updatedCode;
        }
    }

    async buildSyntaxTree(): Promise<void> {
        await this.codeParser.initializeParserAndTree()
    }
    
    onHover(pos: vscode.Position): vscode.Range[] {
        const [promptType, code, linesToHighlight, linesToAddPrintStatements] = this.codeParser.getScopeAtPosition(pos);
        let ranges: vscode.Range[] = [];
        for (let line of linesToHighlight) {
            const code = this.codeParser.getCodeAtLines(line, line);
            const startCol = code.search(/\S/); // find the first non-whitespace character
            const endCol = code.search(/\S\s*$/) + 1; // find the last non-whitespace character
    
            const start = new vscode.Position(line, startCol);
            const end = new vscode.Position(line, endCol);
            
            ranges.push(new vscode.Range(start, end));
        }
        return ranges;
    }

    // Inserts comments
    async *onHighlightComment(code: string): AsyncGenerator<string, void, unknown> {
        // We will add to the first line (above code we want to comment)
        const endingLine = code.split('\n');
        const insertionLines = [endingLine.length];
    
        const commentGenerator = this.commentGenerator.insertResponse(PromptType.Comment, code, insertionLines);
        
        for await (const codeWithComment of commentGenerator) {
            yield codeWithComment;
        }
    }
    
    // Deleting
    deleteComments(): number[] {
        return this.codeParser.findEasyPrintLines();
    }
}
