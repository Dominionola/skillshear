import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard';

  // Check if there's an OAuth error
  if (error) {
    console.error('OAuth error:', error, errorDescription);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  if (code) {
    const supabase = await createClient();

    // Exchange the code for session
    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('Error exchanging code for session:', sessionError);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    // Check for duplicate account with different provider
    const user = sessionData?.user;

    if (user && user.identities && user.identities.length > 0) {
      // Get all identity providers for this user
      const providers = user.identities.map(identity => identity.provider);
      const uniqueProviders = [...new Set(providers)];

      // If user has more than one unique provider, they're trying to link accounts
      if (uniqueProviders.length > 1) {
        // Find the most recently created identity (the one just added)
        const sortedIdentities = [...user.identities].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const newestIdentity = sortedIdentities[0];
        const newestProvider = newestIdentity.provider;

        // Check if this identity was just created (within last 30 seconds)
        const identityAge = (new Date() - new Date(newestIdentity.created_at)) / 1000;

        if (identityAge < 30) {
          // This is a new OAuth sign-in attempt with an email that already exists
          // with a different provider - we need to prevent this
          console.log(`Preventing account linking: ${user.email} tried to add ${newestProvider} to existing account`);

          // Sign out the user
          await supabase.auth.signOut();

          // Redirect to error page
          return NextResponse.redirect(`${origin}/auth/email-in-use`);
        }
      }
    }

    // Successfully authenticated, proceed with redirect
    const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
    const isLocalEnv = process.env.NODE_ENV === 'development';
    if (isLocalEnv) {
      // We can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
