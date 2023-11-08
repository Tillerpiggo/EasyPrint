"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptGenerator = void 0;
const PromptType_1 = require("./PromptType");
class PromptGenerator {
    constructor() {
        this.customInstructions = 'Only respond with code in Java and no extra characters.';
    }
    generate(promptType, code) {
        let prompt = '';
        switch (promptType) {
            case PromptType_1.PromptType.SingleLine:
                prompt = `Write a print statement after this line of code "${code}". The print statement should display the variables involved and their values. Respond with the exact code plus your print statement.`;
                break;
            case PromptType_1.PromptType.Conditional:
                prompt = `Add a print statement at the start of each branch in this conditional statement: "${code}". The print statement should show the values of the variables being checked in the condition.`;
                break;
            case PromptType_1.PromptType.Loop:
                prompt = `Place a print statement at the beginning and end of this loop: "${code}". These print statements should show the loop variable's initial value and final value respectively. Respond with the exact code plus your print statement.`;
                break;
            case PromptType_1.PromptType.VariableTracking:
                prompt = `Add a print statement when the variable is initialized and each time its value changes within this code: "${code}". The print statement should display the current value of the variable.`;
                break;
            default:
                return 'Invalid prompt type.';
        }
        return prompt + this.customInstructions;
    }
}
exports.PromptGenerator = PromptGenerator;
//# sourceMappingURL=PromptGenerator.js.map