import { GoogleGenAI, Type, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { SearchResult } from '../types';

// Initialize the Gemini client
// NOTE: In a real deployment, this key should be proxied or handled securely.
// For this frontend demo, we assume the environment variable is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const queryGemini = async (query: string): Promise<SearchResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "A direct, professional answer to the user's query about science or policy."
            },
            relatedTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 related specific policy topics or keywords."
            }
          },
          required: ["answer", "relatedTopics"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as SearchResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for demo purposes if API key is missing or fails
    return {
      answer: "We are currently unable to process your request. Please ensure a valid API key is set or try again later.",
      relatedTopics: ["AI Safety", "Web Performance", "System Design"]
    };
  }
};

export const generateArticleAudio = async (text: string): Promise<string | undefined> => {
  try {
    // Strip HTML tags to get clean text for TTS
    const cleanText = text.replace(/<[^>]*>?/gm, ' ').substring(0, 4000); // Limit length for demo

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return undefined;
  }
};

// Helper to decode Base64 string to Uint8Array
export const decodeBase64 = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Helper to decode raw PCM data from Gemini to AudioBuffer
export const decodePCM = (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): AudioBuffer => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};