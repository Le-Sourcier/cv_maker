import OpenAI from 'openai';

const hasValidConfig = () => {
  return !!(
    process.env.OPENAI_API_KEY &&
    process.env.OPENAI_ORGANIZATION &&
    process.env.OPENAI_BASE_URL
  );
};

// Only initialize OpenAI on the server side
const openai = typeof window === 'undefined' && hasValidConfig() 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
      baseURL: process.env.OPENAI_BASE_URL,
    })
  : null;

export async function generateCVSuggestions(cvData: any) {
  if (typeof window !== 'undefined') {
    return "AI suggestions are only available server-side. Please use our API endpoint.";
  }

  if (!openai) {
    return "AI suggestions are not available. Please configure OpenAI credentials.";
  }

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
    return "Failed to generate suggestions. Please try again later.";
  }
}

export async function enhanceCVContent(section: string, content: string) {
  if (typeof window !== 'undefined') {
    return "AI enhancement is only available server-side. Please use our API endpoint.";
  }

  if (!openai) {
    return "AI enhancement is not available. Please configure OpenAI credentials.";
  }

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
    return "Failed to enhance content. Please try again later.";
  }
}