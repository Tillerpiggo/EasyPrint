import { PromptType } from './PromptType';

export class PromptGenerator {
  private customInstructions: string;

  constructor (fileType: string) {
    this.customInstructions = ` Only respond with code in ${fileType} and no extra characters.`;//' Please rewrite the code exactly and provide only the rewritten code. Write in Java';
  }

  generate(promptType: PromptType, code: string): string {
    let prompt = '';
    switch(promptType){
      case PromptType.SingleLine:
        prompt = `Add a SINGLE print statement to the following code. In one print statement, print the names and values of all variables involved, and the overall value of the expression. Respond with ONLY CODE and nothing else. The code: ${code}`
        //prompt = `Write a print statement after this line of code "${code}". The print statement should display the variables involved and their values. Respond with the exact code plus your print statement.`;
        break;
      case PromptType.Conditional:
        prompt = `Add a print statement at the start of each branch in this conditional statement: "${code}". The print statement should show the values of the variables being checked in the condition.`;
        break;
      case PromptType.Loop:
        prompt = `Place a print statement at the beginning and end of this loop: "${code}". These print statements should show the loop variable's initial value and final value respectively. Respond with the exact code plus your print statement.`;
        break;
      case PromptType.VariableTracking:
        prompt = `Add a print statement when the variable is initialized and each time its value changes within this code: "${code}". The print statement should display the current value of the variable.`;
        break;
      case PromptType.Comment: 
        prompt = `Add a short comment explaining this code: "${code}". The comment should only describe functionality, not implementation details. Ensure that the comment is in suitable comment format rather than just text.`;
        break;
      case PromptType.Combinational:
        prompt = `Place a print statement at the beginning and end of this loop and Add a print statement at the start of each branch in the conditional statements: "${code}". These print statements should show the loop variable's initial value and final value respectively and the print statements should show the values of the variables being checked in the conditional statements. Respond with the exact code plus your print statements.`;
        break;
      default:
        return 'Invalid prompt type.';
    }
    return prompt + this.customInstructions;
  }
}