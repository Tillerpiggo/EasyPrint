interface Response {
  choices: { text: string }[];
}

import OpenAI from 'openai';

export class APIController {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }
  
  async generateResponse(prompt: string, maxTokens: number = 100): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      /*prompt: prompt,
      max_tokens: maxTokens,
      temperature: 0.0,*/
      messages: [
        {"role": "system", "content": "You are EasyPrint, the world's best printing plugin."},
        {"role": "user", "content": prompt},
      ]
      //frequency_penalty: -1.0
    });

    if (response && response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
      return response.choices[0].message.content.trim();
    } else {
      return "FAIL";
    }
  }
}