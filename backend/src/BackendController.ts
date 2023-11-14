import { type } from 'os';
import CodeParser, { FileParser} from './CodeParser';
import { PrintStatementGenerator } from './PrintStatementGenerator';
import { PromptType } from './PromptType';
import * as vscode from 'vscode';
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

    async onHighlight(code: string): Promise<string> {
        const promptType = PromptType.SingleLine;

        // Insert at the end of the code
        const linesOfCode = code.split('\n')
        const insertionLines = [linesOfCode.length]
        
        const codeWithPrintStatement = await this.printStatementGenerator.insertPrintStatements(promptType, code, insertionLines);
        return codeWithPrintStatement;
    }
    
    async onHover(pos: vscode.Position): Promise<vscode.Range[]> {
        await this.codeParser.initializeParserAndTree()
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

    // Commenting
    async onHighlightComment(code: string): Promise<string> {
        const promptType = PromptType.Comment;

        // We will add to the first line (above code we want to comment)
        const endingLine = code.split('\n');
        const insertionLines = [endingLine.length];

        const codeWithComment = await this.commentGenerator.insertComments(promptType, code, insertionLines);
        return codeWithComment;
    }
}
