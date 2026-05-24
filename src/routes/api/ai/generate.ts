/**
 * Backend API Route: /api/ai/generate
 * Generates content using Google AI API
 * Never expose the API key to the frontend - keep it server-side only
 */

import { json } from '@tanstack/react-start';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface RequestBody {
  messages: Message[];
  systemPrompt?: string;
}

/**
 * Initialize Google Generative AI
 * Note: You need to install @google/generative-ai package
 * Run: npm install @google/generative-ai
 */
async function getGenerativeModel() {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY environment variable is not set');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    // Validate input
    if (!body.messages || !Array.isArray(body.messages)) {
      return json(
        { message: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    // Get the model
    const model = await getGenerativeModel();

    // Format messages for Gemini API
    const contents = body.messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Generate content
    const result = await model.generateContent({
      contents: contents as any,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    const response = result.response;
    const text = response.text();

    return json({
      content: text,
      finishReason: response.candidates?.[0]?.finishReason,
    });
  } catch (error) {
    console.error('AI Generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return json(
      { message: 'Failed to generate content', error: errorMessage },
      { status: 500 }
    );
  }
}
