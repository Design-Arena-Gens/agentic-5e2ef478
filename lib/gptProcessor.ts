import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
    });
  }
  return openai;
}

export interface ExtractedItem {
  item: string;
  quantity: number;
  unit: string;
}

export async function extractItemsWithGPT(text: string): Promise<ExtractedItem[]> {
  try {
    const prompt = `You are a helpful assistant for a building materials shop. From the following customer request, extract the building materials and their quantities into a clean JSON array.

Rules:
- Ignore greetings and pleasantries
- If a quantity isn't mentioned, assume 1
- Standardize units (e.g., "bags", "pieces", "tons", "meters", "kg")
- Recognize common building materials: cement, TMT bars, steel, bricks, sand, gravel, paint, etc.
- Handle various ways customers might refer to items (e.g., "sariya" = "TMT bars", "cement bags" = "cement")
- Extract size/grade information (e.g., "12mm TMT bars", "53 grade cement")

Return ONLY a valid JSON array in this exact format:
[
  {"item": "cement", "quantity": 100, "unit": "bags"},
  {"item": "12mm TMT bars", "quantity": 500, "unit": "pieces"}
]

Customer's text: ${text}`;

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at extracting structured data from text. Always return valid JSON only, no explanations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const responseText = completion.choices[0].message.content || '[]';

    // Extract JSON from response (handle cases where GPT adds extra text)
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    const jsonText = jsonMatch ? jsonMatch[0] : '[]';

    const items: ExtractedItem[] = JSON.parse(jsonText);

    return items;
  } catch (error) {
    console.error('Error extracting items with GPT:', error);
    return [];
  }
}
