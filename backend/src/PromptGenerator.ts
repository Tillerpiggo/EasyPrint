import { PromptType } from './PromptType';

export class PromptGenerator {
  private customInstructions = "Only respond with code in Java.";//' Please rewrite the code exactly and provide only the rewritten code. Write in Java';

  generate(promptType: PromptType, code: string): string {
    let prompt = '';
    switch(promptType){
      case PromptType.SingleLine:
        prompt = `Write a print statement after this line of code "${code}". The print statement should display the variables involved and their values. Respond with the exact code plus your print statment.`;
        break;
      case PromptType.Conditional:
        prompt = `Add a print statement at the start of each branch in this conditional statement: "${code}". The print statement should show the values of the variables being checked in the condition.`;
        break;
      case PromptType.Loop:
        prompt = `Place a print statement at the beginning and end of this loop: "${code}". These print statements should show the loop variable's initial value and final value respectively.`;
        break;
      case PromptType.VariableTracking:
        prompt = `Add a print statement when the variable is initialized and each time its value changes within this code: "${code}". The print statement should display the current value of the variable.`;
        break;
      default:
        return 'Invalid prompt type.';
    }
    return prompt + this.customInstructions;
  }
}