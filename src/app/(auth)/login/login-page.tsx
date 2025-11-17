'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GoogleIcon, EmpowerAILogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginRole, setLoginRole] = useState('user');
    const [signupRole, setSignupRole] = useState('user');

    const handleAuthAction = () => {
        setIsLoading(true);

        if (email === 'admin' && password === 'admin') {
            setTimeout(() => {
                router.push(`/dashboard?role=${loginRole}`);
            }, 1000);
        } else {
            toast({
                variant: 'destructive',
                title: 'Invalid Credentials',
                description: 'Please check your username and password and try again.',
            });
            setIsLoading(false);
        }
    }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
            <Link href="/onboarding" className="mb-4">
              <EmpowerAILogo className="h-10 w-10 text-primary" />
            </Link>
            <h1 className="font-headline text-3xl font-bold">Welcome to Empower AI</h1>
            <p className="text-muted-foreground">Your journey to career empowerment starts here.</p>
        </div>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className={cn("shadow-none border")}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials below to login to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>I am a...</Label>
                <RadioGroup value={loginRole} onValueChange={setLoginRole} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="login-role-user" />
                    <Label htmlFor="login-role-user">Job Seeker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recruiter" id="login-role-recruiter" />
                    <Label htmlFor="login-role-recruiter">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-login">User ID</Label>
                <Input id="email-login" type="text" placeholder="admin" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Password</Label>
                <Input id="password-login" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button className="w-full" onClick={handleAuthAction} disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Or continue with</p>
              <Button variant="outline" className="w-full">
                <GoogleIcon className="mr-2 h-4 w-4" />
                Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className={cn("shadow-none border")}>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create an account to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-signup">Full Name</Label>
                <Input id="name-signup" placeholder="Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" required />
              </div>
               <div className="space-y-2">
                <Label>I am a...</Label>
                <RadioGroup value={signupRole} onValueChange={setSignupRole} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="role-user" />
                    <Label htmlFor="role-user">Job Seeker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recruiter" id="role-recruiter" />
                    <Label htmlFor="role-recruiter">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button className="w-full" disabled={isLoading}>
                {'Create Account'}
              </Button>
               <p className="text-xs text-muted-foreground text-center">Or continue with</p>
              <Button variant="outline" className="w-full">
                <GoogleIcon className="mr-2 h-4 w-4" />
                Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
      </div>
    </div>
  );
}
