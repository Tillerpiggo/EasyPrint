export class OutputParser {
    private fileType: string;
    private isInsideCodeBlock: boolean;
    private hasAddedCodeInCurrentBlock: boolean;
    private tokensToSkip: number;
    private currentLine: number;
    private hasAddedTokenToNewLine: boolean;
    private codeLines: string[];
    
    constructor(fileType: string) {  
      this.fileType = fileType;
      this.isInsideCodeBlock = false;
      this.tokensToSkip = 0;
      this.hasAddedCodeInCurrentBlock = false;
      this.currentLine = 0;
      this.hasAddedTokenToNewLine = false
      this.codeLines = []
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
  
    // If we're skipping tokens, decrement the counter and return the current code
    if (this.tokensToSkip > 0) {
        this.tokensToSkip--;
        return code;
    }

    // If the token signifies the start of a code block, set the flag to true
    if (token.startsWith('```')) {
        this.isInsideCodeBlock = !this.isInsideCodeBlock;

        // If we're entering a code block, prepare to skip the next two tokens
        // and reset the flag for added code in current block
        if (this.isInsideCodeBlock) {
            this.tokensToSkip = 2;
            this.hasAddedCodeInCurrentBlock = false;
        }

        // Ignore the code block start token
        return code;
    }

    // If we're inside a code block, insert the token into the code
    if (this.isInsideCodeBlock) {
        let indentedToken = token;

        const lastLineIndentation = (code.match(/.*\S.*$/mg) || []).pop()?.match(/^\s*/) || '';

        if (token == '\n') {
            // Find the indentation of the last non-empty line
            // Add indentation to the token
            indentedToken = '\n' + lastLineIndentation;
        }

        // If this is the first piece of code in the current block, prepend a newline to it
        if (!this.hasAddedCodeInCurrentBlock) {
        console.log("Adding inside current code block!!")
        indentedToken = '\n' + lastLineIndentation + indentedToken;
        console.log(`Indented token: ${indentedToken}`)
        this.hasAddedCodeInCurrentBlock = true;
        }

        // Append the indented token to the code
        const updatedCode = code + indentedToken;
        console.log(`updatedCode: ${code}`)
        return updatedCode;
    }

    // If we're not inside a code block, return the original code

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

  // Function to process tokens for comments
  async *processCommentTokens(code: string, tokenGenerator: AsyncGenerator<string, void, unknown>, lines: number[]): AsyncGenerator<string, void, unknown> {
    this.isInsideCodeBlock = false;
    this.tokensToSkip = 0;
    this.hasAddedCodeInCurrentBlock = false;
    this.currentLine = 0;
    code = this.insertEmptyCommentLines(code, lines);
    this.codeLines = code.split('\n');
    lines.sort((a, b) => a - b);
    for await (const token of tokenGenerator) {
      code = this.parseCommentToken(code, token, lines);
      yield code;
    }
  }
  
  // Function to parse tokens for comments
  parseCommentToken(code: string, token: string, lines: number[]): string {
    console.log(`comment token: ${token}`);

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
      let indentedToken = token;

      if (token == '\n') {
        this.currentLine++;
        indentedToken = '\n';
        return this.codeLines.join('\n')
      }

      if (!this.hasAddedCodeInCurrentBlock) {
        console.log("Adding inside current code block!!")
        indentedToken = indentedToken; // Append space before token for readability
        console.log(`Indented token: ${indentedToken}`)
        this.hasAddedCodeInCurrentBlock = true;
      }
      console.log(`lines: ${lines}`)

      let line = lines[this.currentLine] + this.currentLine
      console.log(`Before modification code at line ${this.currentLine}: ${this.codeLines[this.currentLine - 1]}`);
      this.codeLines[line] += indentedToken;  // Append token to the existing line
      code = this.codeLines.join('\n');
      console.log(`After modification code at line ${this.currentLine}: ${this.codeLines[this.currentLine - 1]}`);

      return code;
    }

    return code;
  }

  // Function to insert empty lines at specified line numbers
  insertEmptyCommentLines(code: string, lines: number[]): string {
    let codeLines = code.split('\n');

    // Sort lines in descending order so that inserting doesn't affect line numbers
    lines.sort((a, b) => b - a);

    for (const line of lines) {
      // Insert an empty line at the specified line number
      codeLines.splice(line, 0, "");
    }

    return codeLines.join('\n');
  }

}
