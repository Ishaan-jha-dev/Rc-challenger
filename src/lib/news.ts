export type NewsArticle = {
  title: string;
  description: string;
  content: string;
  url: string;
  source: {
    name: string;
    url: string;
  };
};

export async function fetchDailyNews(category: string = 'general'): Promise<NewsArticle[]> {
  const apiKey = process.env.GNEWS_API_KEY;
  
  // If no API key is provided, return some fallback mock news so the app doesn't crash
  if (!apiKey) {
    console.warn("GNEWS_API_KEY is not set. Using fallback news data.");
    return [
      {
        title: "The Future of AI in Education",
        description: "How artificial intelligence is reshaping the learning landscape.",
        content: "Artificial intelligence is rapidly transforming various sectors, and education is no exception. From personalized learning algorithms to automated grading systems, AI promises to make education more accessible and efficient. However, critics argue that the over-reliance on technology might diminish the human element of teaching. The integration of AI requires careful consideration of ethical implications, including data privacy and the potential for algorithmic bias. As we move forward, striking a balance between technological innovation and traditional pedagogical values will be crucial.",
        url: "https://example.com/ai-education",
        source: { name: "Tech Daily", url: "https://example.com" }
      }
    ];
  }

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=5&apikey=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.articles as NewsArticle[];
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}
