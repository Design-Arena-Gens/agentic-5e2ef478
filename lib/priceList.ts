import { GoogleSpreadsheet } from 'google-spreadsheet';
import { ExtractedItem } from './gptProcessor';

export interface ItemWithPrice extends ExtractedItem {
  price?: number;
  totalPrice?: number;
  found: boolean;
  matchedName?: string;
}

let cachedDoc: GoogleSpreadsheet | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getSpreadsheet(): Promise<GoogleSpreadsheet> {
  const now = Date.now();

  if (cachedDoc && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedDoc;
  }

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID!,
    {
      apiKey: process.env.GOOGLE_API_KEY || '',
    }
  );

  await doc.loadInfo();
  cachedDoc = doc;
  cacheTimestamp = now;

  return doc;
}

export async function lookupPrices(items: ExtractedItem[]): Promise<ItemWithPrice[]> {
  try {
    const doc = await getSpreadsheet();
    const sheet = doc.sheetsByIndex[0]; // Use first sheet

    await sheet.loadHeaderRow();
    const rows = await sheet.getRows();

    const itemsWithPrices: ItemWithPrice[] = [];

    for (const item of items) {
      let found = false;
      let price: number | undefined;
      let matchedName: string | undefined;

      // Search through all rows
      for (const row of rows) {
        const itemName = (row.get('ItemName') || '').toLowerCase();
        const keywords = (row.get('Keywords') || '').toLowerCase();
        const priceStr = row.get('Price');
        const unit = row.get('Unit') || item.unit;

        // Check if the item matches
        const searchTerm = item.item.toLowerCase();

        if (
          itemName.includes(searchTerm) ||
          searchTerm.includes(itemName) ||
          keywords.split(',').some((kw: string) => {
            const keyword = kw.trim();
            return searchTerm.includes(keyword) || keyword.includes(searchTerm);
          })
        ) {
          found = true;
          price = parseFloat(priceStr);
          matchedName = row.get('ItemName');
          break;
        }
      }

      itemsWithPrices.push({
        ...item,
        price,
        totalPrice: price ? price * item.quantity : undefined,
        found,
        matchedName: matchedName || item.item,
      });
    }

    return itemsWithPrices;
  } catch (error) {
    console.error('Error looking up prices:', error);

    // Return items with found=false if lookup fails
    return items.map((item) => ({
      ...item,
      found: false,
    }));
  }
}
