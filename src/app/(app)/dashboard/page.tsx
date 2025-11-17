'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { dashboardItems, userProfile } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Briefcase, UserPlus, FileText, PlusCircle } from 'lucide-react';

function UserDashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">
          Welcome back, {userProfile.name.split(' ')[0]}!
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardItems.map((item) => (
          <Link href={item.href} key={item.title}>
            <Card className={cn("shadow-none border hover:border-primary/50 hover:bg-secondary transition-colors h-full")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline text-primary">+</div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className={cn("lg:col-span-4 shadow-none border")}>
          <CardHeader>
            <CardTitle className="font-headline">Your Progress</CardTitle>
            <CardDescription>Keep up the great work on your career journey.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p className="font-medium">Profile Completion</p>
                <p className="text-muted-foreground">75%</p>
              </div>
              <Progress value={75} aria-label="75% profile completion" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p className="font-medium">Courses Completed</p>
                <p className="text-muted-foreground">2 / 5</p>
              </div>
              <Progress value={40} aria-label="2 of 5 courses completed" />
            </div>
             <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p className="font-medium">Job Applications</p>
                <p className="text-muted-foreground">5 Sent</p>
              </div>
              <Progress value={50} aria-label="5 job applications sent" />
            </div>
          </CardContent>
        </Card>
        <Card className={cn("lg:col-span-3 shadow-none border")}>
           <CardHeader>
            <CardTitle className="font-headline">Tip of the Day</CardTitle>
            <CardDescription>Quick advice to boost your confidence.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-secondary rounded-lg">
                <p className="text-sm font-medium">"Believe in your potential. Every step you take, no matter how small, is progress. You are capable, and you are worthy of a fulfilling career."</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function RecruiterDashboard() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-lg font-semibold md:text-2xl">
                    Recruiter Dashboard
                </h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Post a New Job
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <Card className={cn("shadow-none border")}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Job Postings</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">jobs currently active</p>
                    </CardContent>
                </Card>
                 <Card className={cn("shadow-none border")}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Applicants</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+45</div>
                        <p className="text-xs text-muted-foreground">in the last 7 days</p>
                    </CardContent>
                </Card>
                <Card className={cn("shadow-none border")}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,205</div>
                        <p className="text-xs text-muted-foreground">since last month</p>
                    </CardContent>
                </Card>
            </div>
             <Card className={cn("shadow-none border")}>
                <CardHeader>
                    <CardTitle className="font-headline">Recent Applicants</CardTitle>
                    <CardDescription>Review the latest candidates who applied to your job postings.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for recent applicants list */}
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No recent applicants to show.</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

function Dashboard() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'user';

  if (role === 'recruiter') {
    return <RecruiterDashboard />;
  }
  return <UserDashboard />;
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
        </Suspense>
    )
}