'use server';

/**
 * @fileOverview An AI agent that suggests personalized learning paths based on user skills and job market demands.
 *
 * - personalizedLearningPath - A function that suggests personalized learning paths.
 * - PersonalizedLearningPathInput - The input type for the personalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The return type for the personalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  userSkills: z
    .string()
    .describe('A comma-separated list of the user\'s current skills.'),
  jobMarketDemands: z
    .string()
    .describe('A description of the current job market demands.'),
});
export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

const PersonalizedLearningPathOutputSchema = z.object({
  learningPaths: z
    .string()
    .describe(
      'A list of personalized learning paths based on the user skills and job market demands.'
    ),
});
export type PersonalizedLearningPathOutput = z.infer<
  typeof PersonalizedLearningPathOutputSchema
>;

export async function personalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are a career advisor specializing in helping unemployed women find relevant upskilling opportunities.

  Based on the user's current skills and the current job market demands, suggest personalized learning paths.

  User's Skills: {{{userSkills}}}
  Job Market Demands: {{{jobMarketDemands}}}

  Suggest specific learning paths that align with both the user's skills and the job market demands.
  Focus on providing actionable and relevant recommendations.
  Format your answer as a numbered list, with each item including the learning path and resources to accomplish it.  Make it short and sweet.
  `,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
