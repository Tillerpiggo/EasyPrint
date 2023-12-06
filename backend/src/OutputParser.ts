export class OutputParser {
    private fileType: string;
    private isInsideCodeBlock: boolean;
    private hasAddedCodeInCurrentBlock: boolean;
    private tokensToSkip: number;
    private currentLine: number;
    
    constructor(fileType: string) {  
      this.fileType = fileType;
      this.isInsideCodeBlock = false;
      this.tokensToSkip = 0;
      this.hasAddedCodeInCurrentBlock = false;
      this.currentLine = 0;
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

      return updatedCode;
    }

  // New function which consumes the async generator
  async *processTokens(code: string, tokenGenerator: AsyncGenerator<string, void, unknown>, lines: number[]): AsyncGenerator<string, void, unknown> {
    this.isInsideCodeBlock = false;
    this.tokensToSkip = 0;
    this.hasAddedCodeInCurrentBlock = false;
    for await (const token of tokenGenerator) {
        code = this.parseToken(code, token, lines);
        yield code;
    }
  }

  parseToken(code: string, token: string, lines: number[]): string {
    console.log(`token: ${token}`);
  
    if (this.tokensToSkip > 0) {
      this.tokensToSkip--;
      return code;
    }
  
    if (token.startsWith('```')) {
      this.isInsideCodeBlock = !this.isInsideCodeBlock;
      if (this.isInsideCodeBlock) {
        this.tokensToSkip = 2;
        this.hasAddedCodeInCurrentBlock = false;
      }
      return code;
    }
  
    if (this.isInsideCodeBlock) {
      if (token == '\n') { // When a newline is encountered, the line to be inserted will be updated
        this.currentLine++;
      }
  
      // If the currentLine is present in the lines array, we append the token
      if (lines[this.currentLine] !== undefined) {
        let indentedToken = ' ' + token; // Prepare the token for appending
        const updatedCode = code.split('\n');
  
        // Append the token at the end of the appropriate line
        updatedCode[lines[this.currentLine] + this.currentLine] += indentedToken;
        console.log(`updatedCode: ${updatedCode.join('\n')}`);
        return updatedCode.join('\n');
      }
    }
    return code;
  }

  parse_comments(code: string, apiResponse: string, lines: number[]):string {
    let codeLines = code.split('\n');
    let firstNonEmptyLine = codeLines.find(line => line.trim().length > 0);
    let indentation = firstNonEmptyLine?.match(/^\s*/) || '';

      // Split the response into lines
      let responseLines = apiResponse.split('\n');

      // Filter in lines within code blocks, excluding the code block delimiters
      let inCodeBlock = false;
      let extractedCode = responseLines.filter(line => {
        if (line.trim().startsWith('```')) {
          inCodeBlock = !inCodeBlock;
          return false; // Skip the code block delimiters
        }
        return inCodeBlock;
      });

    // Remove any indentation the AI added, then add our own indentation
    let firstNonEmptyResponseLine = extractedCode.find(line => line.trim().length > 0);
    let unwantedIndentation = firstNonEmptyResponseLine?.match(/^\s*/) || '';
    if(unwantedIndentation[0]) {
        extractedCode = extractedCode.map(line => {
            if(line.startsWith(unwantedIndentation[0])) {
                return line.substring(unwantedIndentation[0].length);
            }
            return line;
        });
    }
    
    // Add back our indentation
    let indentedCode = extractedCode.map(line => indentation + line);
    return indentedCode.join('\n');
  }

}
