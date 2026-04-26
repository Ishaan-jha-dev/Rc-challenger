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

    // 3. Transform news articles into RCs concurrently
    console.log(`Generating ${articles.length} RCs from news...`);
    const generationPromises = articles.slice(0, 5).map(article => generateRCFromNews(article));
    const generatedRCs = (await Promise.all(generationPromises)).filter((rc): rc is RCPassage => rc !== null);

    if (generatedRCs.length === 0) {
      return mockRCs;
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
