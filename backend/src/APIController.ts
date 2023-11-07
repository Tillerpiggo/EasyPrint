interface Response {
  choices: { text: string }[];
}

import OpenAI from 'openai';

export class APIController {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }
  
  async generateResponse(prompt: string, maxTokens: number = 50): Promise<string> {
    const response: Response = await this.openai.completions.create({
      model: 'text-davinci-002',
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: 0.0
    });
    return response.choices[0].text.trim();
  }
}