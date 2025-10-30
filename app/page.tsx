import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            📱 WhatsApp Quote Automation
          </h1>

          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Automated quotation system for building materials. Send your requirements via WhatsApp and receive instant quotes!
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <h2 className="text-xl font-semibold text-green-800 mb-2">✅ System Active</h2>
              <p className="text-green-700">
                The webhook is ready to receive messages from WhatsApp.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Send Your Requirements</h3>
                  <p className="text-gray-600">
                    Send text, voice notes, or images of your material list via WhatsApp
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Processing</h3>
                  <p className="text-gray-600">
                    Our AI transcribes voice, reads images, and extracts items with quantities
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Instant Quote</h3>
                  <p className="text-gray-600">
                    Receive a detailed quote with prices and totals within seconds
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Supported Formats</h2>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Text Messages:</strong> "I need 100 bags of cement and 500 12mm TMT bars"</li>
              <li><strong>Voice Notes:</strong> Record your requirements naturally</li>
              <li><strong>Images/PDFs:</strong> Take a photo of your material list</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <h3 className="font-semibold text-lg mb-2">🔧 Setup Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Configure your environment variables (see .env.example)</li>
                <li>Set up a Twilio WhatsApp Business account</li>
                <li>Create a Google Sheet with your price list (ItemName, Keywords, Price, Unit columns)</li>
                <li>Point your Twilio webhook to: <code className="bg-gray-200 px-2 py-1 rounded">/api/webhook</code></li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🎤 Voice Recognition</h4>
                <p className="text-sm text-gray-600">OpenAI Whisper transcription</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📸 OCR Processing</h4>
                <p className="text-sm text-gray-600">Extract text from images</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🤖 GPT-4 Intelligence</h4>
                <p className="text-sm text-gray-600">Smart item extraction</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📊 Google Sheets Integration</h4>
                <p className="text-sm text-gray-600">Real-time price lookup</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-600">
          <p>Powered by Next.js, OpenAI, and Twilio</p>
        </footer>
      </div>
    </main>
  );
}
