import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function POST(request: Request) {
  try {
    const cvData = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional CV writer and career advisor. Analyze the provided CV data and suggest improvements."
        },
        {
          role: "user",
          content: JSON.stringify(cvData)
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return NextResponse.json({ suggestions: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error generating CV suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions. Please try again later.' },
      { status: 500 }
    );
  }
}