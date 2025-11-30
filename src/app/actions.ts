'use server';

import { realTimePaymentConfirmation, RealTimePaymentConfirmationInput } from '@/ai/flows/real-time-payment-confirmation';
import { z } from 'zod';

const FormSchema = z.object({
    transactionId: z.string().min(10, 'Transaction ID must be at least 10 characters.'),
    cryptoType: z.enum(['BTC', 'ETH', 'USDT']),
    amount: z.coerce.number().positive('Amount must be positive.'),
    usdValue: z.coerce.number(),
    walletAddress: z.string().min(20, 'Wallet address seems too short.'),
});

export type State = {
    errors?: {
        transactionId?: string[];
        cryptoType?: string[];
        amount?: string[];
        walletAddress?: string[];
    };
    message?: string | null;
    confirmation?: {
        confirmationMessage: string;
        isConfirmed: boolean;
    } | null;
}

export async function confirmPayment(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = FormSchema.safeParse({
        transactionId: formData.get('transactionId'),
        cryptoType: formData.get('cryptoType'),
        amount: formData.get('amount'),
        usdValue: formData.get('usdValue'),
        walletAddress: formData.get('walletAddress'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid input. Please check the fields.',
        };
    }
    
    try {
        const input: RealTimePaymentConfirmationInput = validatedFields.data;
        const result = await realTimePaymentConfirmation(input);
        return {
            message: 'Confirmation processed.',
            confirmation: result,
        }
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred while confirming the payment.' };
    }
}
