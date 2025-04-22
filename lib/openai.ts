import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION,
  baseURL: process.env.NEXT_PUBLIC_OPENAI_BASE_URL,
});

export async function generateCVSuggestions(cvData: any) {
  try {
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

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating CV suggestions:', error);
    throw error;
  }
}

export async function enhanceCVContent(section: string, content: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional CV writer. Enhance the following ${section} content to be more impactful and professional.`
        },
        {
          role: "user",
          content
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error enhancing CV content:', error);
    throw error;
  }
}