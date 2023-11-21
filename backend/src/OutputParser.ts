export class OutputParser {
    private isInsideCodeBlock: boolean;
    private hasAddedCodeInCurrentBlock: boolean;
    private tokensToSkip: number;
    
    constructor() {
      this.isInsideCodeBlock = false;
      this.tokensToSkip = 0;
      this.hasAddedCodeInCurrentBlock = false;
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
    console.log(`token: ${token}`)

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

        if (token == '\n') {
            // Find the indentation of the last non-empty line
            const lastLineIndentation = (code.match(/.*\S.*$/mg) || []).pop()?.match(/^\s*/) || '';
            // Add indentation to the token
            indentedToken = '\n' + lastLineIndentation;
        }

        // If this is the first piece of code in the current block, prepend a newline to it
        if (!this.hasAddedCodeInCurrentBlock) {
            indentedToken = '\n' + indentedToken;
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
}
