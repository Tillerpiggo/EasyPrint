import { PromptType } from './PromptType';

export class CodeParser{ 

 determinePromptType(input: string): PromptType {
    const conditionalKeywords = ['if', 'else if', 'else', 'switch', 'case'];
    const loopKeywords = ['for', 'while', 'do'];
  
    // Check if input contains both loops and conditionals
    if (loopKeywords.some(keyword => input.includes(keyword)) && conditionalKeywords.some(keyword => input.includes(keyword))) {
        return PromptType.Combinational;
    }
    
    // Check if input contains loop keywords
    if (loopKeywords.some(keyword => input.includes(keyword))) {
        return PromptType.Loop;
    }
    // Check if input contains conditional keywords
    if (conditionalKeywords.some(keyword => input.includes(keyword))) {
      return PromptType.Conditional;
    }
    
    // If neither, assume it is a single line
    return PromptType.SingleLine;
  }
}