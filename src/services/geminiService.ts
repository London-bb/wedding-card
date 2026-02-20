import { GoogleGenAI } from "@google/genai";

// Vite 환경 변수에서 API 키 로드 (없으면 프로세스 환경변수 시도)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

// API 키가 있을 때만 초기화하여 앱 크래시 방지
let ai: any = null;
if (API_KEY) {
  try {
    // @ts-ignore
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (e) {
    console.error("Failed to initialize Gemini AI:", e);
  }
}

const RELATIONSHIP_MAP: Record<string, string> = {
  Friend: '친한 친구',
  Family: '가족',
  Colleague: '직장 동료',
  Relative: '친척/사촌',
};

const TONE_MAP: Record<string, string> = {
  Heartfelt: '감동적이고 따뜻한',
  Funny: '유머러스하고 재치있는 (친한 사이)',
  Formal: '정중하고 예의바른 (존댓말)',
  Poetic: '시적이고 아름다운 표현',
};

export const generateWeddingWish = async (
  relationship: string,
  tone: string,
  coupleName: string
): Promise<string> => {
  try {
    const relKor = RELATIONSHIP_MAP[relationship] || '지인';
    const toneKor = TONE_MAP[tone] || '따뜻한';

    const prompt = `
      당신은 결혼식 하객을 대신하여 방명록에 남길 축하 메시지를 작성하는 센스 있는 AI 도우미입니다.
      아래 정보를 바탕으로, 신랑신부(${coupleName})에게 전할 자연스러운 한국어 축하 메시지를 1개 작성해주세요.

      [정보]
      - 작성자와의 관계: ${relKor}
      - 원하는 분위기(말투): ${toneKor}

      [작성 규칙]
      1. 번역투가 아닌, 한국인이 실제로 사용하는 자연스러운 구어체로 작성하세요.
      2. 관계와 분위기에 맞는 적절한 높임말이나 반말을 사용하세요.
         - (예: 친구/유머러스 -> "야 너가 가다니! ㅋㅋㅋ", 직장동료/정중 -> "결혼 진심으로 축하드립니다.")
      3. 적절한 이모지를 1~2개 섞어서 생동감을 주세요.
      4. 길이는 2~3문장 이내(공백 포함 50~80자)로담백하게 작성하세요.
      5. 오직 메시지 내용만 출력하세요. (따옴표 제외)
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 150,
        temperature: 0.8, // 창의성과 다양성을 위해 약간 높임
      },
    });

    return response.text?.trim() || "결혼 진심으로 축하드립니다! 두 분의 앞날에 행복만 가득하시길 바랍니다. 🌸";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "결혼 축하드립니다! 행복하게 잘 사세요! 🎉";
  }
};
