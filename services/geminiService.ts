import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTextResponse = async (
  prompt: string, 
  systemInstruction?: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Lower temperature for more factual/clinical responses
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to generate response. Please check your API key or connection.";
  }
};

export const analyzeMedicalImage = async (
  base64Image: string, 
  mimeType: string, 
  prompt: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Capable of multimodal tasks
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType
            }
          },
          {
            text: prompt
          }
        ]
      }
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    return "Error: Unable to analyze image.";
  }
};

export const searchMockFHIRData = async (
  query: string, 
  patientData: string
): Promise<string> => {
  try {
    const systemInstruction = `You are a specialized search assistant for a Hospital Information System. 
    You have access to a JSON dataset of patients (FHIR-like structure). 
    Your job is to interpret the user's natural language query and extract relevant patient information from the provided dataset.
    Do not invent data. If no patient matches, say so.
    Format your answer as a clean, readable list.`;

    const fullPrompt = `Dataset: ${patientData}\n\nUser Query: ${query}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction
      }
    });
    return response.text || "No results found.";
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return "Error processing search query.";
  }
};
