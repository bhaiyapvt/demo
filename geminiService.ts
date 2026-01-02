
import { GoogleGenAI } from "@google/genai";

// Fixed: Correctly initialize GoogleGenAI using a named parameter and process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPerformanceFeedback = async (studentName: string, recentScores: any[]) => {
  const prompt = `
    Analyze the performance of student "${studentName}" based on these recent test scores:
    ${JSON.stringify(recentScores)}
    
    Provide a concise motivational feedback in Hindi (primary) and English. 
    Include:
    1. Weak areas to focus on.
    2. Strength areas.
    3. A custom study plan tip.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });
    // The response.text property directly returns the generated string output.
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "अध्ययन जारी रखें! कड़ी मेहनत ही सफलता की कुंजी है। Keep studying hard!";
  }
};
