/**
 * StreamingChatBox Component
 * Real-time streaming chat with Google AI
 */

import { useState, useRef, useEffect } from 'react';
import { streamAiContent, AIMessage } from '@/lib/googleAi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function StreamingChatBox() {
  const [messages, setMessages] = useState<(AIMessage & { streaming?: boolean })[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: AIMessage = {
      role: 'user',
      content: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      let fullContent = '';
      const modelMessageIndex = newMessages.length;

      // Add placeholder for streaming message
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: '', streaming: true },
      ]);

      // Stream the response
      for await (const chunk of streamAiContent({
        messages: newMessages,
        systemPrompt: 'You are a helpful study assistant for StudyAIHub.',
      })) {
        fullContent += chunk;

        // Update the streaming message in real-time
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[modelMessageIndex]) {
            updated[modelMessageIndex] = {
              role: 'model',
              content: fullContent,
              streaming: true,
            };
          }
          return updated;
        });
      }

      // Mark as complete
      setMessages((prev) => {
        const updated = [...prev];
        if (updated[modelMessageIndex]) {
          updated[modelMessageIndex].streaming = false;
        }
        return updated;
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: `Error: ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Messages Container */}
      <Card className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Start a conversation with StudyAI (Streaming)</p>
              <p className="text-sm mt-2">Watch responses appear in real-time!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.streaming && (
                    <span className="inline-block w-2 h-4 ml-1 bg-gray-500 animate-pulse"></span>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask StudyAI anything..."
          disabled={loading}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          {loading ? 'Streaming...' : 'Send'}
        </Button>
      </form>
    </div>
  );
}
