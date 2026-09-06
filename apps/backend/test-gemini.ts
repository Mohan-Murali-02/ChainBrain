import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

console.log('TEST 1: script started');
console.log(
    'TEST 2: API key exists:',
    !!process.env.GEMINI_API_KEY,
);

async function main() {
    console.log('TEST 3: entering main');

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    console.log('TEST 4: Gemini client created');

    const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: 'Reply with exactly: ChainBrain Gemini test successful',
    });

    console.log('TEST 5: response received');
    console.log(response.text);
}

main().catch((error) => {
    console.error('TEST ERROR:', error);
});