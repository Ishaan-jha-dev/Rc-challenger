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
  const apiKey = process.env.NVIDIA_API_KEY;

  if (!apiKey) {
    console.warn("No NVIDIA_API_KEY found. Using a fallback mock RC instead of generating a new one.");
    const fallbackRC = { ...mockRCs[Math.floor(Math.random() * mockRCs.length)] };
    fallbackRC.id = `rc-${Date.now()}`; // unique ID
    return fallbackRC;
  }

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'z-ai/glm-5.1',
        max_tokens: 4000,
        temperature: 0.7,
        top_p: 1,
        messages: [
          { role: 'system', content: MASTER_PROMPT },
          { role: 'user', content: `Generate a CAT RC based on this article:\n\nTitle: ${article.title}\n\nContent: ${article.content}` }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`NVIDIA API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let jsonString = data.choices[0].message.content;
    
    // Clean up potential markdown formatting (```json ... ```)
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const rcData = JSON.parse(jsonString);
    
    return {
      id: `gen-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...rcData
    };
  } catch (error) {
    console.error("AI Generation failed:", error);
    return null;
  }
}
