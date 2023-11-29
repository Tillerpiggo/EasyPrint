import { PromptType } from './PromptType';

export class PromptGenerator {
  private customInstructions: string;

  constructor (fileType: string) {
    this.customInstructions = ` Only respond with code in ${fileType} and no extra characters. and add the comment " Added by EasyPrint" on the same line after each print statement`;//' Please rewrite the code exactly and provide only the rewritten code. Write in Java';
  }

  generate(promptType: PromptType, code: string): string {
    let prompt = '';
    switch(promptType){
      case PromptType.SingleLine:
        prompt = `Add a SINGLE print statement to the following code. In one print statement, print the names and values of only the variables involved, and the overall value of the expression. The code: ${code}`
        break;
      case PromptType.Conditional:
        prompt = `Add a print statement at the start of each branch in this conditional statement: "${code}". The print statement should show the values of the variables being checked in the condition. 
                  Also, add a print statement to show the ending values after the conditional is complete`;
        break;
      case PromptType.Loop:
        prompt = `Place a print statement at the beginning and end of this loop: "${code}". These print statements should show the loop variable's initial value and final value respectively.`;
        break;
      case PromptType.VariableTracking:
        prompt = `Add a print statement when the variable is initialized and each time its value changes within this code: "${code}". The print statement should display the current value of the variable.`;
        break;
      case PromptType.Comment: 
        prompt = `Add comments explaining this code: "${code}". The comments should only describe functionality, not implementation details. Ensure that the comments are suitable comment 
                  format rather than just text and add meaningful comments on the next line throughout the code if multiple lines or a single comment if only one line. If code is already thoroughly 
                  commented just return the same code and comments that were passed`;
        break;
      case PromptType.Combinational:
        prompt = `Place a print statement at the beginning and end of this loop and Add a print statement at the start of each branch in the conditional statements: "${code}". 
                  These print statements should show the loop variable's initial value and final value respectively and the print statements should show the values of the variables 
                  being checked in the conditional statements. Respond with the exact code plus your print statements.`;
        break;
      default:
        return 'Invalid prompt type.';
    }
    if (promptType !== PromptType.Comment){
      return prompt + this.customInstructions;
     }else{
       return prompt;
     }
  }
}