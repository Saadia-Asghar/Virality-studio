
import { GoogleGenAI, Type } from "@google/genai";
import { Platform } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeNiche = async (contentHistory: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this user's social media history to identify their niche and audience patterns: ${JSON.stringify(contentHistory)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          niche_profile: {
            type: Type.OBJECT,
            properties: {
              primary: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  percentage: { type: Type.NUMBER },
                  confidence: { type: Type.NUMBER }
                }
              },
              secondary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    percentage: { type: Type.NUMBER }
                  }
                }
              },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateContentIdeas = async (niche: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 viral content ideas for a social media account in the ${niche} niche.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            platform: { type: Type.STRING },
            format: { type: Type.STRING },
            topic: { type: Type.STRING },
            priority: { type: Type.STRING },
            bestTime: { type: Type.STRING },
            reasoning: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const fetchViralTrends = async (niche: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Search for currently viral trends, topics, or sounds in the ${niche} niche for social media (TikTok, Instagram, LinkedIn). Provide specific, actionable trends.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  
  const structuredResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this search data: "${response.text}", extract exactly 4 trending topics. 
    Format as JSON array of objects: { "name": string, "urgency": "hot"|"rising", "relevance": number, "suggestion": string, "reach": string }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            urgency: { type: Type.STRING },
            relevance: { type: Type.NUMBER },
            suggestion: { type: Type.STRING },
            reach: { type: Type.STRING }
          }
        }
      }
    }
  });
  
  return JSON.parse(structuredResponse.text);
};

export const generatePostFromIdea = async (idea: any, platform: Platform) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Adapt this content idea into a full post for ${platform}: ${JSON.stringify(idea)}. Maintain a viral tone.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          caption: { type: Type.STRING },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          visual_prompt: { type: Type.STRING },
          video_script: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING },
              body: { type: Type.ARRAY, items: { type: Type.STRING } },
              cta: { type: Type.STRING }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const reviewExternalPost = async (content: string, platform: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a world-class social media strategist. Analyze this post content from ${platform} and provide a viral review.
    Content: "${content}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          viralityScore: { type: Type.NUMBER, description: "Score from 1-100" },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          hookImprovement: { type: Type.STRING },
          estimatedEngagement: { type: Type.STRING },
          verdict: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateImage = async (prompt: string, aspectRatio: string = "1:1") => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: { aspectRatio }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
