import OpenAI from 'openai';

export class APIController {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }
  
  async *generateResponse(prompt: string, maxTokens: number = 100): AsyncGenerator<string, void, unknown> {
    const stream = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {"role": "system", "content": "You are EasyPrint, the world's best printing plugin."},
        {"role": "user", "content": prompt},
      ],
      stream: true,
      temperature: 0.3
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0 && chunk.choices[0].delta && chunk.choices[0].delta.content) {
        const text = chunk.choices[0].delta.content;
        yield text;
      }
    }
  }
}