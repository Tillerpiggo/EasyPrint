"use strict";
const { OutputParser } = require('../../OutputParser');
describe('OutputParser', () => {
    const outputParser = new OutputParser();
    it('should extract a code box from a response', () => {
        const response = `
Here's some text before the code box:

\`\`\`
const example = 'Hello, World!';
console.log(example);
\`\`\`

And here's some text after the code box.
`;
        const extractedCode = outputParser.extractCodeBox(response);
        // Ensure the extracted code matches the expected content
        const expectedCode = `const example = 'Hello, World!';\nconsole.log(example);`;
        expect(extractedCode).toBe(expectedCode);
    });
    it('should handle a response with no code box', () => {
        const response = `
Here's a response with no code box.
No code here.
`;
        const extractedCode = outputParser.extractCodeBox(response);
        // Ensure null is returned when no code box is found
        expect(extractedCode).toBeNull();
    });
});
//# sourceMappingURL=OutputParser.test.js.map