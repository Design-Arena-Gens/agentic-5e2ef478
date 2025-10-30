import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { processMessage } from '@/lib/messageProcessor';

const MessagingResponse = twilio.twiml.MessagingResponse;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;
    const mediaUrl = formData.get('MediaUrl0') as string;
    const mediaContentType = formData.get('MediaContentType0') as string;
    const numMedia = parseInt(formData.get('NumMedia') as string || '0');

    console.log('Received message from:', from);
    console.log('Message type:', mediaContentType || 'text');

    // Process the message
    const responseText = await processMessage({
      from,
      body,
      mediaUrl,
      mediaContentType,
      numMedia
    });

    // Create Twilio response
    const twiml = new MessagingResponse();
    twiml.message(responseText);

    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: {
        'Content-Type': 'text/xml'
      }
    });

  } catch (error) {
    console.error('Error processing webhook:', error);

    const twiml = new MessagingResponse();
    twiml.message('Sorry, there was an error processing your request. Please try again.');

    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: {
        'Content-Type': 'text/xml'
      }
    });
  }
}

// Handle Twilio webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({ status: 'Webhook endpoint is active' });
}
