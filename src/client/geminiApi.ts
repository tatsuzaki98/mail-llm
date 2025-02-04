import { GoogleGenerativeAI } from "@google/generative-ai";
import { instructions } from "./llmConfig";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const performGemini = async (
  _: 'gemini',
  {arg}: {arg: {query: string, context: {text: string}[]}},
): Promise<string> => {
  const parts = [
    ...instructions.map((instruction) => ({text: instruction})),
    ...arg.context,
    {text: `input: ${arg.query}`},
    {text: 'output:'},
  ];

  console.log(parts);

  return new Promise((resolve, reject) => {
    model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    })
      .then((result) => {
        resolve(result.response.text());
      })
      .catch((error) => {
        reject(error);
      });
  });
};
