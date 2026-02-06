
import { db } from '../lib/firebase';
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { Platform } from '../types';
import { GoogleGenAI } from '@google/genai';

// Simulated Platform Linking
export const linkPlatform = async (userId: string, platform: Platform, username: string) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        connectedPlatforms: arrayUnion(platform),
        [`platform_${platform}`]: {
            username,
            connectedAt: new Date().toISOString(),
            status: 'active'
        }
    });
};

// Competitor Scanning Simulation using Gemini
export const scanCompetitors = async (niche: string, platform: Platform) => {
    //@ts-ignore
    const apiKey = localStorage.getItem('virality_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{
            role: 'user',
            parts: [{
                text: `Analyze the "${niche}" niche on ${platform}. 
        Identify 3 major competitors or high-performing accounts.
        For each competitor, provide:
        1. Account name
        2. Estimated follower count (realistic for the niche)
        3. Their current viral strategy (what kind of hooks or topics are working for them)
        4. One specific "Content Gap" (something they are missing that the user could exploit)
        
        Format the response as a JSON array of objects with keys: name, followers, strategy, gap.`
            }]
        }],
        config: {
            responseMimeType: "application/json"
        }
    });

    try {
        //@ts-ignore
        return JSON.parse(response.text);
    } catch (e) {
        console.error("Failed to parse competitors", e);
        return [];
    }
};

// Mock Data Seeding for Test User
export const seedMockData = async (userId: string) => {
    const mockInsights = [
        { type: 'reach', value: '1.2M', date: '2026-02-01' },
        { type: 'reach', value: '1.5M', date: '2026-02-02' },
        { type: 'reach', value: '2.1M', date: '2026-02-03' },
        { type: 'reach', value: '1.8M', date: '2026-02-04' },
        { type: 'reach', value: '2.4M', date: '2026-02-05' },
    ];

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        mockInsights,
        onboardingComplete: true,
        niche: "High-Performance Business & Fitness",
        connectedPlatforms: ['instagram', 'tiktok']
    });

    // Seed some initial competitor data
    const competitorsRef = doc(db, 'users', userId, 'scans', 'initial');
    await setDoc(competitorsRef, {
        timestamp: new Date().toISOString(),
        competitors: [
            { name: "OptimalPerformance", followers: "850K", strategy: "Hook-heavy scientific breakdowns", gap: "Practical implementation guides" },
            { name: "FounderFitness", followers: "1.2M", strategy: "B-roll lifestyle edits with voiceover", gap: "Deep-dive productivity technicals" }
        ]
    });
};
