/**
 * Google AI Client Utility
 * Frontend-safe wrapper for calling Google AI API through our backend
 */

export interface AIMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GenerateContentRequest {
  messages: AIMessage[];
  systemPrompt?: string;
}

export interface GenerateContentResponse {
  content: string;
  error?: string;
}

/**
 * Call the Google AI API through our backend endpoint
 * This is safer than exposing the API key on the frontend
 */
export async function generateAiContent(
  request: GenerateContentRequest
): Promise<GenerateContentResponse> {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        content: '',
        error: error.message || 'Failed to generate content',
      };
    }

    const data = await response.json();
    return {
      content: data.content,
    };
  } catch (error) {
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Stream AI content response
 * Returns an async generator for real-time streaming
 */
export async function* streamAiContent(
  request: GenerateContentRequest
): AsyncGenerator<string> {
  try {
    const response = await fetch('/api/ai/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;

      if (value) {
        const text = decoder.decode(value);
        yield text;
      }
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error('Stream error');
  }
}
