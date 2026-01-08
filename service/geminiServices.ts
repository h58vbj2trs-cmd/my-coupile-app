
import { GoogleGenAI, Type } from "@google/genai";
import { GEMINI_MODEL } from "../constants";

export const fetchDailyQuestion = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: "커플을 위한 오늘의 질문을 하나 만들어줘. 사랑, 미래, 가치관 등에 대한 질문이어야 해. 한국어로 20자 내외로 짧고 예쁘게 만들어줘.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING }
          },
          required: ["question"]
        }
      }
    });
    const result = JSON.parse(response.text);
    return result.question || "오늘 우리가 가장 먹고 싶은 음식은?";
  } catch (error) {
    console.error("Error fetching daily question:", error);
    return "서로의 가장 예쁜 점은 무엇인가요?";
  }
};

export const getPetMessage = async (hunger: number, happiness: number, level: number) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `현재 다마고치 캐릭터 상태: 배고픔 ${hunger}/100, 행복도 ${happiness}/100, 레벨 ${level}. 이 상태에 맞는 아주 귀엽고 짧은 대사를 한국어로 하나만 해줘.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING }
          },
          required: ["message"]
        }
      }
    });
    const result = JSON.parse(response.text);
    return result.message || "안녕! 오늘 기분 최고야!";
  } catch (error) {
    return "주인님들 사랑해요! 뀨?";
  }
};
