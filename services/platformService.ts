
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

// --- NEW DIRECT DEPLOYMENT PROTOCOLS ---

/**
 * Directly posts content to a social platform node.
 * In a real production app, this would call the respective platform APIs (Meta Graph API, TikTok for Business API, etc.)
 */
export const postToPlatform = async (userId: string, platform: Platform, content: any) => {
    console.log(`[PROTOCOL] Direct Deployment Initiated for ${platform}`);

    // Simulate API network latency
    await new Promise(resolve => setTimeout(resolve, 2500));

    const postRecord = {
        userId,
        platform,
        content,
        deployedAt: new Date().toISOString(),
        status: 'published',
        reach: 0,
        engagement: 0,
        postId: `node_${Math.random().toString(36).substr(2, 9)}`
    };

    // Record the deployment in our database
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        postHistory: arrayUnion(postRecord)
    });

    return postRecord;
};

/**
 * Schedules content for future deployment.
 */
export const schedulePost = async (userId: string, platform: Platform, content: any, scheduleDate: string) => {
    console.log(`[PROTOCOL] Scheduling Node established for ${platform} at ${scheduleDate}`);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const scheduleRecord = {
        userId,
        platform,
        content,
        scheduledAt: scheduleDate,
        status: 'scheduled',
        nodeId: `sched_${Math.random().toString(36).substr(2, 9)}`
    };

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        scheduledNodes: arrayUnion(scheduleRecord)
    });

    return scheduleRecord;
};

/**
 * Fetches detailed performance metrics for a specific competitor.
 */
export const fetchCompetitorDetails = async (username: string, platform: Platform) => {
    //@ts-ignore
    const apiKey = localStorage.getItem('virality_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{
            role: 'user',
            parts: [{
                text: `Analyze the performance of the social media account "@${username}" on ${platform}. 
                Provide:
                1. Estimated follower count
                2. Engagement rate (percentage)
                3. Average views per post
                4. Primary content pillar
                5. Top 3 hashtags they use
                6. A viral review score (1-100) based on their latest patterns.
                
                Format the response as a JSON object with keys: name, followers, engagementRate, avgViews, contentPillar, topHashtags (array), viralScore.`
            }]
        }],
        config: {
            responseMimeType: "application/json"
        }
    });

    try {
        //@ts-ignore
        const data = JSON.parse(response.text);
        return { ...data, platform };
    } catch (e) {
        console.error("Failed to parse competitor details", e);
        return null;
    }
};
