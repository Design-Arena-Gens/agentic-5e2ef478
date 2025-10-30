import OpenAI from 'openai';
import axios from 'axios';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
    });
  }
  return openai;
}

export async function transcribeAudio(mediaUrl: string): Promise<string> {
  try {
    // Download the audio file from Twilio
    const auth = Buffer.from(
      `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
    ).toString('base64');

    const response = await axios.get(mediaUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      responseType: 'arraybuffer',
    });

    // Save to temporary file
    const tempPath = join('/tmp', `audio_${Date.now()}.ogg`);
    writeFileSync(tempPath, response.data);

    // Transcribe using OpenAI Whisper
    const transcription = await getOpenAI().audio.transcriptions.create({
      file: new Blob([response.data]) as any,
      model: 'whisper-1',
      language: 'en', // Change to 'hi' for Hindi or auto-detect
    });

    // Clean up temp file
    try {
      unlinkSync(tempPath);
    } catch (e) {
      // Ignore cleanup errors
    }

    return transcription.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Failed to transcribe audio');
  }
}
