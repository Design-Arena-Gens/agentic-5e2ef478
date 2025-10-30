import axios from 'axios';
import Tesseract from 'tesseract.js';

export async function extractTextFromImage(mediaUrl: string): Promise<string> {
  try {
    // Download the image from Twilio
    const auth = Buffer.from(
      `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
    ).toString('base64');

    const response = await axios.get(mediaUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      responseType: 'arraybuffer',
    });

    // Use Tesseract.js for OCR
    const result = await Tesseract.recognize(
      Buffer.from(response.data),
      'eng', // Language
      {
        logger: (m) => console.log(m),
      }
    );

    return result.data.text;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw new Error('Failed to extract text from image');
  }
}
