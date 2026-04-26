'use server'

import { fetchDailyNews } from "@/lib/news";
import { generateRCFromNews } from "@/lib/ai";
import { RCPassage, mockRCs } from "@/data/mockRCs";

// In a real app, this would be a database call.
// For now, we cache it in memory during development.
let cachedDailyRCs: RCPassage[] | null = null;
let lastGenerationDate: string | null = null;

export async function getTodayRCs(): Promise<RCPassage[]> {
  const today = new Date().toISOString().split('T')[0];

  // Return cached RCs if already generated for today
  if (cachedDailyRCs && lastGenerationDate === today && cachedDailyRCs.length > 0) {
    return cachedDailyRCs;
  }

  try {
    // 1. Fetch 5 top news articles
    const articles = await fetchDailyNews('technology');
    
    // 2. If no API keys are set, the news and AI functions will fall back to mock data
    if (!articles || articles.length === 0) {
      console.log("No articles fetched. Using mock fallback.");
      return mockRCs;
    }

    // 3. Transform news articles into RCs concurrently with a strict 10s timeout to survive Vercel Serverless limits
    console.log(`Generating ${articles.length} RCs from news...`);
    
    // We only try to generate 2 to save time, and fill the rest with mocks
    const targetArticles = articles.slice(0, 2);
    
    const timeoutPromise = new Promise<RCPassage[]>((_, reject) => {
      setTimeout(() => reject(new Error('AI Generation Timeout')), 9000); // 9 seconds max
    });

    const generationTask = async () => {
      const promises = targetArticles.map(article => generateRCFromNews(article));
      const results = await Promise.all(promises);
      return results.filter((rc): rc is RCPassage => rc !== null);
    };

    let generatedRCs: RCPassage[] = [];
    try {
      generatedRCs = await Promise.race([generationTask(), timeoutPromise]);
    } catch (e) {
      console.warn("AI generation timed out or failed, falling back to mock data.", e);
      return mockRCs;
    }

    if (generatedRCs.length === 0) {
      return mockRCs;
    }

    // Fill remaining slots with mock data if we didn't generate 5
    while (generatedRCs.length < 5) {
      const randomMock = { ...mockRCs[Math.floor(Math.random() * mockRCs.length)] };
      randomMock.id = `mock-${Date.now()}-${generatedRCs.length}`;
      generatedRCs.push(randomMock);
    }

    // 4. Cache them
    cachedDailyRCs = generatedRCs;
    lastGenerationDate = today;

    return generatedRCs;
  } catch (error) {
    console.error("Failed to get today's RCs:", error);
    return mockRCs; // Fallback so the UI never breaks
  }
}
