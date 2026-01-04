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

    // System message to define the assistant's personality.
    // We prepend this before sending to n8n so the workflow
    // can pass it straight into the LLM / agent node.
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

    // Filter out any system messages from client and prepend our own
    const userMessages = messages.filter((msg: any) => msg.role !== 'system');
    const conversationMessages = [systemMessage, ...userMessages];

    // n8n webhook URL – this is what the workflow listens on.
    const webhookUrl =
  'https://ki-automatisierung.startplatz-ai-hub.de/webhook/794a4bb7-cc28-4afe-a211-dc648afa9085';

    console.log('Sending to n8n webhook:', {
      messageCount: conversationMessages.length,
      url: webhookUrl,
    });

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: conversationMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('n8n Webhook Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return NextResponse.json(
        {
          error:
            (errorData as any)?.error?.message ||
            `n8n webhook error: ${response.statusText}`,
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json().catch(() => null);

    // n8n usually returns an array of items: [{ reply: "..." }]
    // Normalize both array and object shapes.
    const firstItem = Array.isArray(data) ? (data as any)[0] : data;

    // Expect n8n to return a simple JSON like: { reply: "assistant text" }
    const reply =
      (firstItem as any)?.reply ??
      (firstItem as any)?.message ??
      (typeof firstItem === 'string' ? firstItem : null);

    if (!reply) {
      return NextResponse.json(
        { error: 'Invalid response format from n8n webhook', raw: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: reply,
      role: 'assistant',
    });
  } catch (error) {
    console.error('Chat API error (n8n integration):', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

