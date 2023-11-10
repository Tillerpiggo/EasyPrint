import { type } from 'os';
import CodeParser, { FileParser} from './CodeParser';
import { PrintStatementGenerator } from './PrintStatementGenerator';
import { PromptType } from './PromptType';
import * as vscode from 'vscode';
//import { CodeModifier } from './CodeModifier';

export class BackendController {
    private filePath: string;
    private codeParser: FileParser;
    private printStatementGenerator: PrintStatementGenerator;
    //private codeModifier: CodeModifier;

    constructor(filePath: string, apiKey: string) {
        this.filePath = filePath;
        this.codeParser = new CodeParser(this.filePath);
        const fileType = this.codeParser.getFileType();
        this.printStatementGenerator = new PrintStatementGenerator(apiKey, fileType);
        //this.codeModifier = new CodeModifier();
    }

    async onHighlight(code: string): Promise<string> {
        const promptType = PromptType.SingleLine;
        const printStatement = await this.printStatementGenerator.generatePrintStatement(promptType, code);
        return printStatement;
    }

    onHover(filePath: string, pos: vscode.Position): vscode.Range[] {
        const linesToHighlight = this.codeParser.getScopeAtPosition(pos);
    
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
}