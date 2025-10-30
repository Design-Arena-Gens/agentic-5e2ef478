import { transcribeAudio } from './transcription';
import { extractTextFromImage } from './ocr';
import { extractItemsWithGPT } from './gptProcessor';
import { lookupPrices } from './priceList';
import { formatQuote } from './quoteFormatter';

interface MessageData {
  from: string;
  body: string;
  mediaUrl?: string;
  mediaContentType?: string;
  numMedia: number;
}

export async function processMessage(data: MessageData): Promise<string> {
  let extractedText = '';

  try {
    // Step 1: Extract text from different input types
    if (data.numMedia > 0 && data.mediaUrl) {
      if (data.mediaContentType?.startsWith('audio/')) {
        // Voice note - transcribe using Whisper
        console.log('Processing voice note...');
        extractedText = await transcribeAudio(data.mediaUrl);
      } else if (data.mediaContentType?.startsWith('image/') ||
                 data.mediaContentType?.includes('pdf')) {
        // Image or PDF - extract text using OCR
        console.log('Processing image/PDF...');
        extractedText = await extractTextFromImage(data.mediaUrl);
      }
    } else if (data.body) {
      // Plain text message
      extractedText = data.body;
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return 'Sorry, I could not understand your message. Please send your requirements as text, voice note, or an image of your list.';
    }

    console.log('Extracted text:', extractedText);

    // Step 2: Use GPT to extract items and quantities
    const items = await extractItemsWithGPT(extractedText);

    if (!items || items.length === 0) {
      return 'I could not identify any building materials from your message. Please provide a list of materials with quantities (e.g., "100 bags of cement, 500 TMT bars 12mm").';
    }

    console.log('Extracted items:', items);

    // Step 3: Look up prices in Google Sheets
    const itemsWithPrices = await lookupPrices(items);

    // Step 4: Format and return the quote
    const quote = formatQuote(itemsWithPrices);

    return quote;

  } catch (error) {
    console.error('Error processing message:', error);
    return 'Sorry, there was an error processing your request. Please try again or contact us directly.';
  }
}
