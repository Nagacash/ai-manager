import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Log API key status (first few chars only for security)
    console.log('API Key found:', apiKey.substring(0, 10) + '...');

    // System message to define the assistant's personality
    const systemMessage = {
      role: 'system',
      content: `You are Maie, a helpful and friendly AI assistant created by Naga Codex. You are the assistant for Maurice Holda, a Certified AI Manager and web design expert.

Your role is to ONLY answer questions about:
- Maurice Holda's services (AI automation, web design, AI image/video creation, cybersecurity consulting)
- Maurice's portfolio, work, and projects
- Naga Codex services and offerings
- Maurice's certifications (CompTIA Security+, CCNA, AI Manager certification)
- Maurice's background, education, and expertise
- How to contact Maurice or start a project
- Information about AI management, automation systems, and related services that Maurice provides

IMPORTANT: If someone asks about topics NOT related to Maurice's services, work, or Naga Codex, politely redirect them. Say something like: "I'm here to help you learn about Maurice Holda's services and work at Naga Codex. Is there something specific about his AI management, web design, or automation services you'd like to know?"

Keep your responses concise, clear, and engaging. Always be professional and helpful when discussing Maurice's services.`
    };

    // Filter out system messages from user messages and combine
    const userMessages = messages.filter(msg => msg.role !== 'system');
    const conversationMessages = [systemMessage, ...userMessages];
    
    console.log('Sending to OpenAI:', {
      messageCount: conversationMessages.length,
      model: 'gpt-4o-mini'
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using gpt-4o-mini for cost efficiency, can be changed to gpt-4o
        messages: conversationMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      return NextResponse.json(
        { 
          error: errorData.error?.message || `OpenAI API error: ${response.statusText}`,
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response from assistant' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: assistantMessage.content,
      role: assistantMessage.role,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

