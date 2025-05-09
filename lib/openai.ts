// This file is now only used for type definitions and constants
// All OpenAI functionality has been moved to the API route

export interface OpenAIConfig {
  apiKey: string;
  organization: string;
  baseURL: string;
}

export interface AIResponse {
  suggestions: string;
  error?: string;
}