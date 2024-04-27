import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { input_messages } = await req.json();

  const prompt = `Using this data, please reformat and summarize it into a structured format that is aligned with our analysis needs. Organize the summary into two main sections: 'Product Features' and 'Deadline Requirements'. Under 'Product Features', categorize the data by key attributes Including:-
    processor type
    RAM
    storage capacity
    screen size
    battery life
    price range
    operating system
    graphics
    For 'Deadline Requirements', clearly outline any specified delivery timelines`;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": prompt},
      // {"role": "user", "content": input_messages},
    ]
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}