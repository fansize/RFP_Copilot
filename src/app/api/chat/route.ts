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

  const prompt = `Using this data, Client Name is John Simith. please reformat and summarize it into a structured format that is aligned with our analysis needs. Organize the summary into two main sections: 'Product Features' and 'Deadline Requirements'. Under 'Product Features', categorize the data by key attributes. Example:
  Client Summary: John Smith at Acme Corp

  John Smith, Procurement Manager at Acme Corp, is overseeing a significant upgrade of the company's computing hardware to enhance operational efficiency and support new software deployments. His focus is on securing high-performance laptops that meet stringent technical requirements to facilitate a seamless workflow. Cost-efficiency, reliability, and service support are pivotal, with a preference for solutions that offer the best long-term value in a high-end price segment.
  
  Product Features Required:
  
  Processor Type: Intel Core i7-1165G7 or better
  RAM: 16GB
  Storage Capacity: 512GB SSD
  Screen Size: 14 inches Full HD with anti-glare
  Battery Life: Minimum 10 hours
  Price Range: Competitive within premium sectors
  Operating System: Windows 10 Pro
  Graphics: Integrated
  Number of Products: 200 units
  Warranty: 3-year comprehensive warranty`;

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