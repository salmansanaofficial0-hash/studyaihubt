/**
 * Backend API Route: /api/ai/stream
 * Streams content generation from Google AI API in real-time
 */

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

    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response('Invalid request: messages array required', {
        status: 400,
      });
    }

    // Create a readable stream
    const stream = new ReadableStream(async (controller) => {
      try {
        const model = await getGenerativeModel();

        // Format messages for Gemini API
        const contents = body.messages.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));

        // Stream content
        const result = await model.generateContentStream({
          contents: contents as any,
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
          },
        });

        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }

        controller.close();
      } catch (error) {
        console.error('Stream error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        controller.error(new Error(errorMessage));
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('AI Stream error:', error);
    return new Response('Failed to stream content', { status: 500 });
  }
}
