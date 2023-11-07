import { PromptType } from './PromptType';
export declare class PromptGenerator {
    private customInstructions;
    generate(promptType: PromptType, code: string): string;
}
