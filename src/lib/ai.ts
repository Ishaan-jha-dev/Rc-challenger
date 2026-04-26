import { NewsArticle } from "./news";
import { RCPassage, mockRCs } from "@/data/mockRCs";

// This is the master prompt from the PRD
const MASTER_PROMPT = `SYSTEM:
You are an expert CAT VARC passage creator with 15+ years of experience designing Reading Comprehension questions for India's top MBA entrance exam.

Your task: Transform the provided news article into a CAT-standard RC passage with 4 questions.

STRICT REQUIREMENTS:
PASSAGE:
- Length: 450-750 words
- Transform news into analytical prose (remove all news markers: dates, quotes, breaking news tone)
- Maintain factual core but add abstract reasoning layer
- Structure: 4-5 paragraphs with clear logical flow
- Tone: analytical/critical/descriptive
- Complexity: Flesch-Kincaid Grade 13-14

QUESTIONS (EXACTLY 4):
Q1 - CENTRAL IDEA (Medium-Hard)
Q2 - INFERENCE (Hard)
Q3 - INFERENCE/DETAIL (Medium-Hard)
Q4 - TONE/ATTITUDE or INFERENCE (Medium)

OUTPUT FORMAT (JSON ONLY, NO MARKDOWN TAGS):
{
  "title": "Generated Title",
  "passage": "Generated passage...",
  "difficulty": "Medium",
  "topicCategory": "Contemporary Issues",
  "wordCount": 500,
  "estimatedTimeMinutes": 8,
  "questions": [
    {
      "id": "q1",
      "questionNumber": 1,
      "questionText": "...",
      "questionType": "central_idea",
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "correctAnswer": "A",
      "explanation": {
        "whyCorrect": "...",
        "whyWrong": { "A": "...", "B": "...", "C": "...", "D": "..." },
        "commonTrap": "...",
        "strategyTip": "..."
      }
    }
  ]
}
`;

export async function generateRCFromNews(article: NewsArticle): Promise<RCPassage | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("No AI API key found. Using a fallback mock RC instead of generating a new one.");
    // In production, you would return null or throw an error. 
    // Here we return a randomized mock RC to ensure the app continues to work for the demo.
    const fallbackRC = { ...mockRCs[Math.floor(Math.random() * mockRCs.length)] };
    fallbackRC.id = `rc-${Date.now()}`; // unique ID
    return fallbackRC;
  }

  try {
    // Example of how the Claude API call would look:
    /*
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 4000,
        system: MASTER_PROMPT,
        messages: [
          { role: 'user', content: `Generate a CAT RC based on this article:\n\nTitle: ${article.title}\n\nContent: ${article.content}` }
        ]
      })
    });
    
    const data = await response.json();
    const jsonString = data.content[0].text;
    const rcData = JSON.parse(jsonString);
    
    return {
      id: `gen-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...rcData
    };
    */
    
    // For now, since we're using a placeholder, we just return the mock.
    // Replace the above block when you add your actual API key!
    return mockRCs[0];
  } catch (error) {
    console.error("AI Generation failed:", error);
    return null;
  }
}
