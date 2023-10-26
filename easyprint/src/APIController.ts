import OpenAI from 'openai';

// Set your OpenAI API key
const apiKey = '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';
const openai = new OpenAI({ apiKey });

// Define a function to interact with the GPT-3.5 Turbo model
async function generateResponse(prompt: string, maxTokens: number = 50): Promise<string> {
    const response = await openai.completions.create({
        model: 'text-davinci-002', // Use GPT-3.5 Turbo engine
        prompt: prompt,
        max_tokens: maxTokens,
    });

    return response.choices[0].text.trim();
}

// Example prompt
const prompt = "Translate the following English text to French: 'Hello, how are you?'";

// Send a request to GPT-3.5 Turbo and receive a response
generateResponse(prompt)
    .then((response) => {
        // Print the generated response
        console.log(response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });