'use server';
/**
 * @fileOverview AI-powered menu recommendation flow.
 *
 * This file defines a Genkit flow that provides personalized menu recommendations to users
 * based on their past order history and preferences.
 *
 * - `getPersonalizedMenuRecommendations` - An exported function that triggers the menu recommendation flow.
 * - `PersonalizedMenuRecommendationsInput` - The input type for the `getPersonalizedMenuRecommendations` function.
 * - `PersonalizedMenuRecommendationsOutput` - The output type for the `getPersonalizedMenuRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMenuRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  pastOrderHistory: z.array(z.string()).optional().describe('A list of the user\'s past order IDs, to understand the user preferences.'),
  dietaryRestrictions: z.array(z.string()).optional().describe('A list of the user\'s dietary restrictions, such as vegetarian, vegan, or gluten-free.'),
});
export type PersonalizedMenuRecommendationsInput = z.infer<typeof PersonalizedMenuRecommendationsInputSchema>;

const PersonalizedMenuRecommendationsOutputSchema = z.object({
  recommendedItems: z.array(z.string()).describe('A list of recommended menu item names.'),
  reasoning: z.string().describe('Explanation of why the items were recommended.'),
});
export type PersonalizedMenuRecommendationsOutput = z.infer<typeof PersonalizedMenuRecommendationsOutputSchema>;

export async function getPersonalizedMenuRecommendations(input: PersonalizedMenuRecommendationsInput): Promise<PersonalizedMenuRecommendationsOutput> {
  return personalizedMenuRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMenuRecommendationsPrompt',
  input: {schema: PersonalizedMenuRecommendationsInputSchema},
  output: {schema: PersonalizedMenuRecommendationsOutputSchema},
  prompt: `You are a menu recommendation expert for IKEA Eats.

  Based on the user's past order history and dietary restrictions, recommend menu items that the user might enjoy.
  The user's ID is {{{userId}}}.
  The user's past order history is: {{#each pastOrderHistory}}{{{this}}}, {{/each}}
  The user's dietary restrictions are: {{#each dietaryRestrictions}}{{{this}}}, {{/each}}

  Consider the popularity of menu items and current availability.

  Return a list of recommended menu items and a brief explanation of why each item was recommended.
  Format the output as a JSON object with "recommendedItems" and "reasoning" fields.

  Ensure that the recommended items are available at IKEA Eats.
  Make sure not to suggest items that violate the user's dietary restrictions.
  Avoid recommending the same items repeatedly if they are already in the user's order history.
  Focus on variety and new discoveries within the menu.
  If past order history is empty, recommend the most popular items.
  Be concise and provide direct recommendations.
`,
});

const personalizedMenuRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedMenuRecommendationsFlow',
    inputSchema: PersonalizedMenuRecommendationsInputSchema,
    outputSchema: PersonalizedMenuRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
