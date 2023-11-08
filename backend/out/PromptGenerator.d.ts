import { PromptType } from './PromptType';
export declare class PromptGenerator {
    private customInstructions;
    constructor(fileType: string);
    generate(promptType: PromptType, code: string): string;
}
