export class OutputParser {
    
    private fileType;
    constructor(fileType: string) {
        this.fileType = fileType;
    }

    parse(code: string, response: string, lines: number[]): string {
        // Find the indentation of the last non-empty line
        const lastLineIndentation = (code.match(/.*\S.*$/mg) || []).pop()?.match(/^\s*/) || '';

        // Remove leading whitespace from the response
        const trimmedResponse = response.trimStart();

        // Split the response into lines
        let responseLines = trimmedResponse.split('\n');

        // Filter in lines within code blocks, excluding the code block delimiters
        let inCodeBlock = false;
        responseLines = responseLines.filter(line => {
            if (line.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                return false; // Continue to next line without adding delimiter
            }
            return inCodeBlock;
        });

        // Add indentation to each line of the code block
        const indentedResponse = responseLines.map(line => lastLineIndentation + line).join('\n');

        // Append the indented response to the code
        const updatedCode = code + '\n' + indentedResponse;

        // Append the "added by EasyPrint" comment to the end of the line in the correct language
        let comment: String = "";
        switch (this.fileType){
            case 'Python':
                comment = " #";
                break;
            case 'JavaScript' || 'TypeScript' || 'Java':
                comment = " //";
                break;
        }

        const easyPrintTag = "Added by EasyPrint";

        const finalTag = comment + " " + easyPrintTag;

        return updatedCode + finalTag;
    }
}
