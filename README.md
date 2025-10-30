# WhatsApp Quote Automation System

An intelligent automated quotation system for building materials businesses. Customers send their requirements via WhatsApp (text, voice, or images), and receive instant AI-generated quotes.

## Features

- 🎤 **Voice Note Processing**: Transcribes audio using OpenAI Whisper
- 📸 **Image OCR**: Extracts text from photos/PDFs using Tesseract.js
- 🤖 **GPT-4 Intelligence**: Smart extraction of items and quantities
- 📊 **Google Sheets Integration**: Real-time price lookup from your catalog
- 💬 **WhatsApp Integration**: Seamless communication via Twilio

## How It Works

1. Customer sends requirements via WhatsApp (text/voice/image)
2. System processes input and extracts material list
3. Prices are looked up from Google Sheets
4. Formatted quote is sent back instantly

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-...

# Twilio Credentials
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Google Sheets
GOOGLE_SHEETS_CLIENT_EMAIL=...
GOOGLE_SHEETS_PRIVATE_KEY=...
GOOGLE_SHEET_ID=...
```

### 2. Google Sheets Setup

Create a sheet with these columns:

| ItemName | Keywords | Price | Unit |
|----------|----------|-------|------|
| Ambuja Cement OPC 53 | cement, ambuja, opc, 53 grade | 380 | bag |
| 12mm TMT Bars | tmt, sariya, steel, 12mm | 650 | piece |

### 3. Twilio WhatsApp Setup

1. Sign up at https://www.twilio.com/
2. Get a WhatsApp Business number
3. Configure webhook URL: `https://your-domain.com/api/webhook`

### 4. Install & Run

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
npm start
```

## Deployment to Vercel

```bash
vercel deploy --prod
```

Set environment variables in Vercel dashboard.

## API Endpoint

`POST /api/webhook` - Receives WhatsApp messages from Twilio

## Tech Stack

- **Next.js 14**: React framework with App Router
- **OpenAI**: GPT-4 for text extraction, Whisper for transcription
- **Twilio**: WhatsApp Business API integration
- **Google Sheets**: Price list database
- **Tesseract.js**: OCR for images
- **TypeScript**: Type-safe development

## Example Usage

**Customer sends:**
> "I need 100 bags of cement and 500 pieces of 12mm TMT bars"

**System responds:**
```
📋 Your Quote

• Ambuja Cement: 100 bags × ₹380 = ₹38,000
• 12mm TMT Bars: 500 pieces × ₹650 = ₹325,000

━━━━━━━━━━━━━━━━━━━
Total: ₹363,000
━━━━━━━━━━━━━━━━━━━

📝 Note: Prices are indicative. Final price and availability will be confirmed upon order.

💬 Reply with any changes or confirm your order!
```

## License

MIT
