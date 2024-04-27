import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
   
// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(request: Request) {
  const { prompt } = (await request.json()) as {
    prompt?: string;
  };

  console.log("start:", prompt);

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const response = await openai.chat.completions.create({
    model: "mixtral-8x7b",
    max_tokens: 300,
    stream: true,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}