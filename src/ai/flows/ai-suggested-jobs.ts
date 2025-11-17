'use server';
/**
 * @fileOverview Provides AI-driven job suggestions based on user skills, location preferences, and career goals.
 *
 * - aiSuggestedJobs - A function that returns AI-powered job suggestions.
 * - AISuggestedJobsInput - The input type for the aiSuggestedJobs function.
 * - AISuggestedJobsOutput - The return type for the aiSuggestedJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISuggestedJobsInputSchema = z.object({
  skills: z.array(z.string()).describe('List of skills the user possesses.'),
  locationPreference: z.string().describe('Preferred job location.'),
  careerGoals: z.string().describe('User career goals and aspirations.'),
});
export type AISuggestedJobsInput = z.infer<typeof AISuggestedJobsInputSchema>;

const AISuggestedJobsOutputSchema = z.object({
  jobSuggestions: z.array(
    z.object({
      title: z.string().describe('Job title.'),
      company: z.string().describe('Company name.'),
      location: z.string().describe('Job location.'),
      description: z.string().describe('Brief job description.'),
      salary: z.string().describe('Salary range.'),
      tags: z.array(z.string()).describe('Relevant job tags (e.g., full-time, remote).'),
    })
  ).describe('List of job suggestions.'),
});
export type AISuggestedJobsOutput = z.infer<typeof AISuggestedJobsOutputSchema>;

export async function aiSuggestedJobs(input: AISuggestedJobsInput): Promise<AISuggestedJobsOutput> {
  return aiSuggestedJobsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSuggestedJobsPrompt',
  input: {schema: AISuggestedJobsInputSchema},
  output: {schema: AISuggestedJobsOutputSchema},
  prompt: `You are a career advisor providing job suggestions to unemployed women.

  Based on the following information, suggest suitable job opportunities:

  Skills: {{{skills}}}
  Location Preference: {{{locationPreference}}}
  Career Goals: {{{careerGoals}}}

  Provide job suggestions that match the user's skills, location preference, and career goals.
  Format the output as a list of job suggestions with title, company, location, description, salary, and tags.
  Make sure to set the output fields according to the output schema.  `,
});

const aiSuggestedJobsFlow = ai.defineFlow(
  {
    name: 'aiSuggestedJobsFlow',
    inputSchema: AISuggestedJobsInputSchema,
    outputSchema: AISuggestedJobsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
