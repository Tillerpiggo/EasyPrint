"use strict";
const { CodeParser } = require('../../CodeParser');
describe('determinePromptType', () => {
    test('should identify a single line of code', () => {
        const codeParser = new CodeParser();
        const singleLine = "console.log('Hello, World!');";
        expect(codeParser.determinePromptType(singleLine)).toBe('SingleLine');
    });
    test('should identify an if conditional', () => {
        const codeParser = new CodeParser();
        const ifConditional = "if (x > 10) { console.log(x); }";
        expect(codeParser.determinePromptType(ifConditional)).toBe('Conditional');
    });
    test('should identify an else if conditional', () => {
        const codeParser = new CodeParser();
        const elseIfConditional = "if (x > 10) { console.log(x); } else if (x < 5) { console.log(-x); }";
        expect(codeParser.determinePromptType(elseIfConditional)).toBe('Conditional');
    });
    test('should identify a switch conditional', () => {
        const codeParser = new CodeParser();
        const switchConditional = "switch(x) { case 10: console.log('ten'); break; default: console.log('default'); }";
        expect(codeParser.determinePromptType(switchConditional)).toBe('Conditional');
    });
    test('should identify a for loop', () => {
        const codeParser = new CodeParser();
        const forLoop = "for (let i = 0; i < 10; i++) { console.log(i); }";
        expect(codeParser.determinePromptType(forLoop)).toBe('Loop');
    });
    test('should identify a while loop', () => {
        const codeParser = new CodeParser();
        const whileLoop = "while (x < 10) { x++; }";
        expect(codeParser.determinePromptType(whileLoop)).toBe('Loop');
    });
    test('should identify a do...while loop', () => {
        const codeParser = new CodeParser();
        const doWhileLoop = "do { x++; } while (x < 10);";
        expect(codeParser.determinePromptType(doWhileLoop)).toBe('Loop');
    });
});
//# sourceMappingURL=CodeParser.test.js.map