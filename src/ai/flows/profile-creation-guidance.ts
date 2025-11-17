'use server';
/**
 * @fileOverview Provides AI guidance during profile creation to build trust and credibility.
 *
 * - getProfileCreationGuidance - A function that provides guidance for profile creation.
 * - ProfileCreationGuidanceInput - The input type for the getProfileCreationGuidance function.
 * - ProfileCreationGuidanceOutput - The return type for the getProfileCreationGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileCreationGuidanceInputSchema = z.object({
  profileDetails: z
    .string()
    .describe('Details about the user profile, including work experience, skills, and education.'),
  jobDescription: z
    .string()
    .optional()
    .describe('The job description the user is applying for. Optional, but including it improves guidance.'),
});
export type ProfileCreationGuidanceInput = z.infer<typeof ProfileCreationGuidanceInputSchema>;

const ProfileCreationGuidanceOutputSchema = z.object({
  guidance: z.string().describe('AI-generated guidance for improving the profile to build trust and credibility.'),
});
export type ProfileCreationGuidanceOutput = z.infer<typeof ProfileCreationGuidanceOutputSchema>;

export async function getProfileCreationGuidance(
  input: ProfileCreationGuidanceInput
): Promise<ProfileCreationGuidanceOutput> {
  return profileCreationGuidanceFlow(input);
}

const profileCreationGuidancePrompt = ai.definePrompt({
  name: 'profileCreationGuidancePrompt',
  input: {schema: ProfileCreationGuidanceInputSchema},
  output: {schema: ProfileCreationGuidanceOutputSchema},
  prompt: `You are an AI career coach providing guidance to unemployed women to create effective profiles that build trust and credibility for job applications.

  Provide actionable advice to improve the user's profile details, specifically in the context of the job description if provided. Focus on enhancing clarity, completeness, and trustworthiness.

  Profile Details: {{{profileDetails}}}
  Job Description: {{#if jobDescription}}{{{jobDescription}}}{{else}}Not provided{{/if}}
  `,
});

const profileCreationGuidanceFlow = ai.defineFlow(
  {
    name: 'profileCreationGuidanceFlow',
    inputSchema: ProfileCreationGuidanceInputSchema,
    outputSchema: ProfileCreationGuidanceOutputSchema,
  },
  async input => {
    const {output} = await profileCreationGuidancePrompt(input);
    return output!;
  }
);
