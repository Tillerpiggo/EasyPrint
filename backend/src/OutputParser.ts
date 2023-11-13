export class OutputParser {
    
    parse(code: string, response: string, lines: number[]): string | null {
        // TODO: Parse into multiple statements
        
        // Find the indentation of the last non-empty line
        const lastLineIndentation = (code.match(/.*\S.*$/mg) || []).pop()?.match(/^\s*/) || '';
        
        // Remove leading whitespace from the response
        const trimmedResponse = response.trimStart();
        
        // Append the response to the code at the proper indentation
        const updatedCode = code + '\n' + lastLineIndentation + trimmedResponse;
        
        return updatedCode;
    }
}