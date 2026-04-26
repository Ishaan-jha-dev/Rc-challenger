'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, Shuffle } from 'lucide-react';
import { generateCustomRC } from '@/app/actions/rc.actions';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  'Science', 'Business', 'Health', 'Sports', 'World', 'Entertainment'
];

export function RCGeneratorUI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const router = useRouter();

  const handleGenerate = async (topic: string | null) => {
    setIsGenerating(true);
    setSelectedTopic(topic);
    
    try {
      const targetTopic = topic || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const newRC = await generateCustomRC(targetTopic);
      
      if (newRC) {
        router.push(`/rc/${newRC.id}`);
      } else {
        alert("Could not generate RC for this topic. Please try another.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="border-primary-100 bg-primary-50/30 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-500" />
              Custom Practice
            </h3>
            <p className="text-sm text-neutral-600">Fetch a new RC based on your specific field of interest.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Badge 
                key={cat}
                variant="outline"
                className={`cursor-pointer hover:bg-primary-100 hover:text-primary-700 transition-colors ${selectedTopic === cat ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-neutral-600'}`}
                onClick={() => !isGenerating && handleGenerate(cat)}
              >
                {cat}
              </Badge>
            ))}
            <Button 
              size="sm" 
              variant="default"
              disabled={isGenerating}
              onClick={() => handleGenerate(null)}
              className="rounded-full shadow-sm"
            >
              {isGenerating && !selectedTopic ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Shuffle className="w-4 h-4 mr-2" />
              )}
              Random
            </Button>
          </div>
        </div>
        
        {isGenerating && selectedTopic && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary-600 animate-pulse font-medium">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating CAT-standard RC for {selectedTopic}...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
