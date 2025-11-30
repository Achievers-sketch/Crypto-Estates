'use server';

/**
 * @fileOverview A real-time payment confirmation AI agent.
 *
 * - realTimePaymentConfirmation - A function that handles the payment confirmation process.
 * - RealTimePaymentConfirmationInput - The input type for the realTimePaymentConfirmation function.
 * - RealTimePaymentConfirmationOutput - The return type for the realTimePaymentConfirmation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RealTimePaymentConfirmationInputSchema = z.object({
  transactionId: z.string().describe('The ID of the cryptocurrency transaction.'),
  cryptoType: z.enum(['BTC', 'ETH', 'USDT']).describe('The type of cryptocurrency used (Bitcoin, Ethereum, or USDT).'),
  amount: z.number().describe('The amount of cryptocurrency sent.'),
  usdValue: z.number().describe('The equivalent USD value of the cryptocurrency.'),
  walletAddress: z.string().describe('The recipient wallet address.'),
});
export type RealTimePaymentConfirmationInput = z.infer<typeof RealTimePaymentConfirmationInputSchema>;

const RealTimePaymentConfirmationOutputSchema = z.object({
  confirmationMessage: z.string().describe('A confirmation message to display to the user.'),
  isConfirmed: z.boolean().describe('Whether the transaction has been confirmed.'),
});
export type RealTimePaymentConfirmationOutput = z.infer<typeof RealTimePaymentConfirmationOutputSchema>;

export async function realTimePaymentConfirmation(
  input: RealTimePaymentConfirmationInput
): Promise<RealTimePaymentConfirmationOutput> {
  return realTimePaymentConfirmationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimePaymentConfirmationPrompt',
  input: {schema: RealTimePaymentConfirmationInputSchema},
  output: {schema: RealTimePaymentConfirmationOutputSchema},
  prompt: `You are an expert in cryptocurrency transactions. You will receive information about a transaction and determine whether it has been successfully confirmed on the blockchain.

Transaction ID: {{{transactionId}}}
Cryptocurrency Type: {{{cryptoType}}}
Amount: {{{amount}}}
USD Value: {{{usdValue}}}
Recipient Wallet Address: {{{walletAddress}}}

Based on this information, generate a confirmation message for the user and indicate whether the transaction is confirmed. Consider factors like transaction ID validity and sufficient funds transferred. If the transaction is valid, provide a positive confirmation message, set isConfirmed to true, and indicate next steps.
`,
});

const realTimePaymentConfirmationFlow = ai.defineFlow(
  {
    name: 'realTimePaymentConfirmationFlow',
    inputSchema: RealTimePaymentConfirmationInputSchema,
    outputSchema: RealTimePaymentConfirmationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
