// import OpenAI from 'openai';

// // this is an API Controller that uses the GPT API to generate responses to specific prompts.
// // This controller is the backbone of the extension and performs a lot of the computations for 
// // generating text for the user.


// // Set your OpenAI API key
// const apiKey = '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';
// const openai = new OpenAI({ apiKey });

// // Define a function to interact with the GPT-3.5 Turbo model
// export async function generateResponse(prompt: string, maxTokens: number = 50): Promise<string> {
//     const response = await openai.completions.create({
//         model: 'text-davinci-002', // Use GPT-3.5 Turbo engine
//         prompt: prompt,
//         max_tokens: maxTokens,
//         temperature:0.2
//     });

//     return response.choices[0].text.trim();
// }
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
              temperature: 0.2
          });
  
          return response.choices[0].text.trim();
      }
  }