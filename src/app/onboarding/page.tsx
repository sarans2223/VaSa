'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { onboardingSteps } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { EmpowerAILogo } from '@/components/icons';

export default function OnboardingPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <EmpowerAILogo className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-semibold">Empower AI</span>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/login">Skip</Link>
        </Button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6">
        <Carousel setApi={setApi} className="w-full max-w-md lg:max-w-xl">
          <CarouselContent>
            {onboardingSteps.map((step) => (
              <CarouselItem key={step.id} className="flex flex-col items-center">
                <div className="w-full aspect-video p-6">
                    <Image
                    src={step.image.imageUrl}
                    alt={step.image.description}
                    width={800}
                    height={600}
                    data-ai-hint={step.image.imageHint}
                    className="w-full h-full object-contain rounded-lg"
                    />
                </div>
                <div className="p-4 space-y-2">
                  <h2 className="font-headline text-2xl font-bold tracking-tight">{step.title}</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">{step.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
      <footer className="p-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                current === i + 1 ? 'w-4 bg-primary' : 'bg-secondary'
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        {current === count ? (
          <Button size="lg" className="w-full max-w-xs" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        ) : (
          <Button size="lg" className="w-full max-w-xs" onClick={() => api?.scrollNext()}>
            Next
          </Button>
        )}
      </footer>
    </div>
  );
}
