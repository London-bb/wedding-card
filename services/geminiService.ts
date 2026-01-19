import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWeddingWish = async (
  relationship: string,
  tone: string,
  coupleName: string
): Promise<string> => {
  try {
    const prompt = `
      Write a short, heartwarming wedding wish (max 40 words) for a guestbook.
      The couple's name is ${coupleName}.
      The guest's relationship to the couple is: ${relationship}.
      The desired tone is: ${tone}.
      Return ONLY the message text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster response
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });

    return response.text?.trim() || "Wishing you a lifetime of love and happiness!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Wishing you a lifetime of love and happiness!";
  }
};
