'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { jobSuggestions } from '@/lib/placeholder-data';
import { aiSuggestedJobs } from '@/ai/flows/ai-suggested-jobs';
import type { AISuggestedJobsOutput } from '@/ai/flows/ai-suggested-jobs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Job = (typeof jobSuggestions)[0];

export default function JobsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestedJobsOutput['jobSuggestions'] | null>(jobSuggestions);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { toast } = useToast();

  const handleFindJobs = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuggestions(null);
    const formData = new FormData(e.currentTarget);
    const skills = formData.get('skills') as string;
    const location = formData.get('location') as string;
    const goals = formData.get('goals') as string;

    try {
      const result = await aiSuggestedJobs({
        skills: skills.split(',').map(s => s.trim()),
        locationPreference: location,
        careerGoals: goals,
      });
      setSuggestions(result.jobSuggestions);
    } catch (error) {
      console.error(error);
      toast({
          variant: "destructive",
          title: "Error finding jobs",
          description: "There was an issue with the AI suggestions. Please try again.",
      });
      setSuggestions(jobSuggestions); // Fallback to placeholder
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    toast({
        title: "Application Sent!",
        description: `Your application for ${selectedJob?.title} has been submitted.`,
    })
    setSelectedJob(null);
  }

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="flex items-center">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">AI Job Matching</h1>
      </div>
      <Card className={cn("shadow-none border")}>
        <CardHeader>
          <CardTitle className="font-headline">Find Your Next Opportunity</CardTitle>
          <CardDescription>Tell us what you're looking for, and our AI will find jobs that match your profile.</CardDescription>
        </CardHeader>
        <form onSubmit={handleFindJobs}>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Your Skills (comma separated)</Label>
                <Input name="skills" id="skills" placeholder="e.g., Figma, React, SEO" defaultValue="Frontend Development, React, UX Design" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location</Label>
                <Input name="location" id="location" placeholder="e.g., Remote, New York" defaultValue="Remote" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">Career Goals</Label>
                <Input name="goals" id="goals" placeholder="e.g., Grow into a leadership role" defaultValue="Find a fulfilling role in a growing tech company" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Finding Jobs...' : 'Find Jobs with AI'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="font-headline text-xl font-semibold">Suggested for you</h2>
        {isLoading && (
            <div className="grid gap-4 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className={cn("shadow-none border")}>
                        <CardHeader>
                            <div className="h-5 w-3/4 bg-muted rounded-md animate-pulse"></div>
                            <div className="h-4 w-1/2 bg-muted rounded-md animate-pulse"></div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
                            <div className="h-4 w-5/6 bg-muted rounded-md animate-pulse"></div>
                        </CardContent>
                        <CardFooter>
                             <div className="h-8 w-24 bg-muted rounded-md animate-pulse"></div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {suggestions?.map((job, index) => (
            <Card key={index} className={cn("shadow-none border flex flex-col")}>
              <CardHeader>
                <CardTitle className="font-headline">{job.title}</CardTitle>
                <CardDescription>{job.company} - {job.location}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                  <Badge variant="outline">{job.salary}</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedJob(job)}>View & Apply</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Sheet open={!!selectedJob} onOpenChange={(isOpen) => !isOpen && setSelectedJob(null)}>
        <SheetContent className="sm:max-w-lg w-[90vw] p-0">
            {selectedJob && (
                <>
                <SheetHeader className="p-6">
                    <SheetTitle className="font-headline text-2xl">{selectedJob.title}</SheetTitle>
                    <SheetDescription>{selectedJob.company} - {selectedJob.location}</SheetDescription>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {selectedJob.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                        <Badge variant="outline">{selectedJob.salary}</Badge>
                    </div>
                </SheetHeader>
                <div className="px-6 pb-6 text-sm text-muted-foreground overflow-y-auto h-[calc(100vh-200px)]">
                    <p>{selectedJob.description}</p>
                </div>
                <SheetFooter className="p-6 bg-card border-t">
                    <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
                    <Button onClick={handleApply}>Apply Now</Button>
                </SheetFooter>
                </>
            )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
