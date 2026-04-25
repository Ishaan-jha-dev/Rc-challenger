import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { mockRCs } from '@/data/mockRCs';
import { CheckCircle, Flame, Clock, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-500" />
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">RC DAILY</h1>
          </div>
          <div className="flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full font-medium text-sm">
            <Flame className="w-4 h-4 fill-primary-500 text-primary-500" />
            <span>5 Day Streak</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Today's Challenge</h2>
          <p className="text-neutral-600">{todayDate}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {mockRCs.map((rc, index) => {
            // Mock completion status
            const isCompleted = index === 0; 
            
            return (
              <Card key={rc.id} className="hover:shadow-lg transition-all border-neutral-200 group flex flex-col h-full bg-white">
                <CardHeader className="pb-3 flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <Badge 
                        variant="secondary" 
                        className={
                          rc.difficulty === 'Hard' 
                            ? 'bg-error/10 text-error hover:bg-error/20' 
                            : 'bg-warning/10 text-warning hover:bg-warning/20'
                        }
                      >
                        {rc.difficulty}
                      </Badge>
                      <h3 className="text-lg font-semibold text-neutral-900 leading-tight group-hover:text-primary-700 transition-colors">
                        RC {index + 1}: {rc.title}
                      </h3>
                      <p className="text-sm text-neutral-500">{rc.topicCategory}</p>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="text-success w-6 h-6 shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>{rc.questions.length} questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{rc.estimatedTimeMinutes} min</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href={`/rc/${rc.id}`} className="w-full">
                    <Button 
                      className="w-full font-medium" 
                      variant={isCompleted ? "outline" : "default"}
                    >
                      {isCompleted ? 'Review Results' : 'Start RC'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="bg-primary-50 rounded-xl p-6 border border-primary-100 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="font-semibold text-neutral-900 mb-1">Your Weekly Progress</h3>
            <p className="text-sm text-neutral-600">You've completed 15 out of 20 RCs this week. Keep it up!</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-primary-500">15/20</span>
          </div>
        </div>
      </main>
    </div>
  );
}
