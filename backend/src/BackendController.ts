import { type } from 'os';
import CodeParser, { FileParser } from './DummyCodeParser';
import { PrintStatementGenerator } from './PrintStatementGenerator';
import { PromptType } from './PromptType';
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
}