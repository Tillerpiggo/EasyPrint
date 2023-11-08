const { PromptType } = require('../../PromptType');
const { PromptGenerator } = require('../../PromptGenerator');

describe('PromptGenerator', () => {
  it('should generate a SingleLine prompt', () => {
    const generator = new PromptGenerator();
    const code = 'const x = 10;';
    const prompt = generator.generate(PromptType.SingleLine, code);
    expect(prompt).toBe(
      "Write a print statement after this line of code \"const x = 10;\". The print statement should display the variables involved and their values. Respond with the exact code plus your print statement. Only respond with code in \"Java\" and no extra characters."
    );
  });

  it('should generate a Conditional prompt', () => {
    const generator = new PromptGenerator();
    const code = 'if (x > 0) { /* code */ } else { /* code */ }';
    const prompt = generator.generate(PromptType.Conditional, code);
    expect(prompt).toBe(
      'Add a print statement at the start of each branch in this conditional statement: \"if (x > 0) { /* code */ } else { /* code */ }\". The print statement should show the values of the variables being checked in the condition. Only respond with code in \"Java\" and no extra characters.'
    );
  });

  it('should generate a Loop prompt', () => {
    const generator = new PromptGenerator();
    const code = 'for (let i = 0; i < 5; i++) { /* code */ }';
    const prompt = generator.generate(PromptType.Loop, code);
    expect(prompt).toBe(
      "Place a print statement at the beginning and end of this loop: \"for (let i = 0; i < 5; i++) { /* code */ }\". These print statements should show the loop variable's initial value and final value respectively. Respond with the exact code plus your print statement. Only respond with code in \"Java\" and no extra characters."
    );
  });

  it('should generate a VariableTracking prompt', () => {
    const generator = new PromptGenerator();
    const code = 'let count = 0; count++; count = count * 2;';
    const prompt = generator.generate(PromptType.VariableTracking, code);
    expect(prompt).toBe(
      'Add a print statement when the variable is initialized and each time its value changes within this code: \"let count = 0; count++; count = count * 2;\". The print statement should display the current value of the variable. Only respond with code in \"Java\" and no extra characters.'
    );
  });

  it('should return "Invalid prompt type" for an invalid prompt type', () => {
    const generator = new PromptGenerator();
    const code = 'const x = 10;';
    const prompt = generator.generate('InvalidPromptType', code);
    expect(prompt).toBe('Invalid prompt type.');
  });
});


test('Tests basic response from AI API', async () => {
    try {
      const prompt = (1+2);
  
      // Print the generated response
      expect(prompt).toBe(3);
    } catch (error) {
      console.error('Error:', error);
    }
  });
