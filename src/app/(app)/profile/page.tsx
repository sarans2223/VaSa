'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { userProfile } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { Edit, Sparkles, Upload, Loader2, Info } from 'lucide-react';
import { useState } from 'react';
import { getProfileCreationGuidance } from '@/ai/flows/profile-creation-guidance';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guidance, setGuidance] = useState('');
  const { toast } = useToast();

  const handleGetGuidance = async () => {
    setIsLoading(true);
    setGuidance('');
    try {
        const profileDetails = `
            Bio: ${userProfile.bio}
            Skills: ${userProfile.skills.join(', ')}
            Experience: ${userProfile.experience.map(e => `${e.role} at ${e.company}`).join('; ')}
        `;
        const result = await getProfileCreationGuidance({ profileDetails });
        setGuidance(result.guidance);
    } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "Error getting guidance",
            description: "There was an issue with the AI suggestions. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  }


  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">Your Profile</h1>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          <Edit className="mr-2 h-4 w-4" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <Card className={cn("shadow-none border")}>
        <CardHeader className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8">
                    <Upload className="h-4 w-4"/>
                    <span className="sr-only">Upload new picture</span>
                </Button>
                )}
            </div>
            <div className="text-center md:text-left">
                <CardTitle className="font-headline text-2xl">{userProfile.name}</CardTitle>
                <CardDescription>{userProfile.email}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue={userProfile.bio} readOnly={!isEditing} rows={4}/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" defaultValue={userProfile.skills.join(', ')} readOnly={!isEditing}/>
             </div>
        </CardContent>
      </Card>

        <Card className={cn("shadow-none border")}>
            <CardHeader>
                <CardTitle className="font-headline">AI Profile Assistant</CardTitle>
                <CardDescription>Get AI-powered tips to make your profile stand out.</CardDescription>
            </CardHeader>
            <CardContent>
                {guidance && (
                    <Alert className="mb-4 bg-secondary">
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle>AI Guidance</AlertTitle>
                        <AlertDescription className="whitespace-pre-wrap">{guidance}</AlertDescription>
                    </Alert>
                )}
                {isLoading && (
                    <div className="flex items-center text-sm text-muted-foreground p-4 justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating feedback...
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 <Button onClick={handleGetGuidance} disabled={isLoading}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Improve My Profile with AI
                </Button>
            </CardFooter>
        </Card>

      <div className="space-y-4">
        <Card className={cn("shadow-none border")}>
          <CardHeader>
            <CardTitle className="font-headline">Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.experience.map((exp, i) => (
              <div key={i} className={cn(i > 0 && "mt-4 pt-4 border-t")}>
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.period}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={cn("shadow-none border")}>
          <CardHeader>
            <CardTitle className="font-headline">Education</CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.education.map((edu, i) => (
              <div key={i} className={cn(i > 0 && "mt-4 pt-4 border-t")}>
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.university}</p>
                <p className="text-xs text-muted-foreground">{edu.period}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

       {isEditing && (
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={() => {
                    setIsEditing(false);
                    toast({title: "Profile Updated", description: "Your changes have been saved."});
                }}>Save Changes</Button>
            </div>
        )}
    </div>
  );
}
