
import { GoogleGenAI } from "@google/genai";
import { Platform } from "../types";

// DEVELOPER: Replace this with your actual Gemini API Key
export const DEVELOPER_GEMINI_API_KEY = "REPLACE_WITH_YOUR_KEY";

const getApiKey = () => {
  // Priority: 1. Developer Hardcoded Key, 2. Local Storage (Legacy), 3. Env Var
  if (DEVELOPER_GEMINI_API_KEY && DEVELOPER_GEMINI_API_KEY !== "REPLACE_WITH_YOUR_KEY") {
    return DEVELOPER_GEMINI_API_KEY;
  }

  //@ts-ignore
  return localStorage.getItem('virality_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
};

const getAI = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("No Gemini API Key found. Content generation will fail.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeNiche = async (contentHistory: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{
      role: 'user', parts: [{
        text: `Analyze this user's social media history to identify their niche and audience patterns: ${JSON.stringify(contentHistory)}. 
    Return a JSON object with this structure: { niche_profile: { primary: { name: string, percentage: number, confidence: number }, secondary: [{ name: string, percentage: number }], keywords: string[] } }` }]
    }],
    config: {
      responseMimeType: "application/json"
    }
  });
  //@ts-ignore
  return JSON.parse(response.text);
};

export const generateContentIdeas = async (niche: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{
      role: 'user', parts: [{
        text: `Generate 3 viral content ideas for a social media account in the ${niche} niche.
    Return a JSON array of objects with this structure: [{ id: string, platform: string, format: string, topic: string, priority: "high"|"medium"|"low", bestTime: string, reasoning: string }]` }]
    }],
    config: {
      responseMimeType: "application/json"
    }
  });
  //@ts-ignore
  return JSON.parse(response.text);
};

export const fetchViralTrends = async (niche: string) => {
  const ai = getAI();
  // Using google_search tool if supported in the 2026 version of the SDK
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ role: 'user', parts: [{ text: `Search for currently viral trends, topics, or sounds in the ${niche} niche for social media (TikTok, Instagram, LinkedIn). Provide specific, actionable trends.` }] }],
    config: {
      //@ts-ignore
      tools: [{ google_search: {} }],
    },
  });

  const structuredResponse = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    //@ts-ignore
    contents: [{
      role: 'user', parts: [{
        text: `Based on this search data: "${response.text}", extract exactly 4 trending topics. 
    Format as JSON array of objects: { "name": string, "urgency": "hot"|"rising", "relevance": number, "suggestion": string, "reach": string }` }]
    }],
    config: {
      responseMimeType: "application/json"
    }
  });

  //@ts-ignore
  return JSON.parse(structuredResponse.text);
};

export const generatePostFromIdea = async (idea: any, platform: Platform) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{
      role: 'user', parts: [{
        text: `Adapt this content idea into a full post for ${platform}: ${JSON.stringify(idea)}. Maintain a viral tone.
    Return a JSON object with this structure: { caption: string, hashtags: string[], visual_prompt: string, video_script: { hook: string, body: string[], cta: string } }` }]
    }],
    config: {
      responseMimeType: "application/json"
    }
  });
  //@ts-ignore
  return JSON.parse(response.text);
};

export const reviewExternalPost = async (content: string, platform: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{
      role: 'user', parts: [{
        text: `Act as a world-class social media strategist. Analyze this post content from ${platform} and provide a viral review.
    Content: "${content}"
    Return a JSON object with this structure: { viralityScore: number, strengths: string[], weaknesses: string[], hookImprovement: string, estimatedEngagement: string, verdict: string }` }]
    }],
    config: {
      responseMimeType: "application/json"
    }
  });
  //@ts-ignore
  return JSON.parse(response.text);
};

export const generateImage = async (prompt: string, aspectRatio: string = "1:1") => {
  // Mock image generation for now, or connect to an actual image gen API if you have one
  const keywords = prompt.split(' ').slice(0, 3).join(',');
  return `https://images.unsplash.com/photo-1620336655174-32585934524c?auto=format&fit=crop&w=800&q=80&sig=${Math.random()}`;
};
