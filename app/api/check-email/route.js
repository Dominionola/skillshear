import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Try to get user by email using a workaround
        // Since we can't directly query auth.users without admin privileges,
        // we'll use the sign-in attempt to check if email exists
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: 'dummy-password-that-will-fail-' + Math.random(),
        });

        // If we get "Invalid login credentials", the email exists
        // If we get "Email not confirmed", the email exists
        // If we get other errors, we need to handle them

        if (error) {
            // Check error message to determine if email exists
            const errorMessage = error.message.toLowerCase();

            if (errorMessage.includes('invalid login credentials') ||
                errorMessage.includes('email not confirmed') ||
                errorMessage.includes('user not found') === false) {
                // Email exists
                return NextResponse.json({ exists: true });
            }

            // Email doesn't exist or other error
            return NextResponse.json({ exists: false });
        }

        // If somehow successful (shouldn't happen with random password)
        return NextResponse.json({ exists: true });

    } catch (error) {
        console.error('Error checking email:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
