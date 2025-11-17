'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Siren, Phone, MessageSquare, MapPin } from 'lucide-react';

export function SosDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-red-400 to-accent"
          aria-label="SOS Emergency"
        >
          <Siren className="h-7 w-7 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-red-100 via-rose-100 to-pink-100 dark:from-red-900/50 dark:via-rose-900/50 dark:to-pink-900/50">
        <DialogHeader className="items-center text-center">
          <div className="rounded-full bg-destructive/10 p-3 mb-2">
            <Siren className="h-8 w-8 text-destructive" />
          </div>
          <DialogTitle className="font-headline text-2xl text-destructive">Emergency SOS</DialogTitle>
          <DialogDescription className="text-destructive-foreground/80">
            Are you in an emergency situation? Use the options below to get help quickly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button variant="destructive" size="lg" className="w-full justify-start gap-3">
            <Phone className="h-5 w-5" />
            <span>Call Emergency Services</span>
          </Button>
          <Button variant="destructive" size="lg" className="w-full justify-start gap-3">
            <MessageSquare className="h-5 w-5" />
            <span>Message Emergency Contact</span>
          </Button>
          <Button variant="destructive" size="lg" className="w-full justify-start gap-3">
            <MapPin className="h-5 w-5" />
            <span>Send My Location</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-center">
            <p className="text-xs text-muted-foreground">Your safety is our priority.</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
