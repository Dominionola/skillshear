"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const AuthContext = createContext({});

export function ContextAuthProvider({ children }) {
  const [session, setSession] = useState(undefined);

  // --- SIGN UP ---
  const signUpNewUser = async (email, password, firstName, lastName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    if (error) {
      console.error("Error signing up:", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  // --- SIGN IN ---
  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        // After clicking the email confirmation link, user is redirected here
        emailRedirectTo: `${location.origin}/signin`,
      },
    });

    if (error) {
      console.error("Error signing in:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  };

  // --- SESSION MANAGEMENT ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- SIGN OUT ---
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);
    else setSession(null);
  };


  // --- SIGN UP WITH GOOGLE ---
  const signInWithGoogle = async (options = {}) => {
    const queryParams = options.queryParams ? `?${new URLSearchParams(options.queryParams).toString()}` : '';
    const redirectTo = `${window.location.origin}/auth/callback${queryParams}`;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });
  }

  // --- SIGN IN WITH GITHUB ---
  const signInWithGitHub = async (options = {}) => {
    const queryParams = options.queryParams ? `?${new URLSearchParams(options.queryParams).toString()}` : '';
    const redirectTo = `${window.location.origin}/auth/callback${queryParams}`;
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo,
      },
    });
  }


  // --- RETURN PROVIDER ---
  return (
    <AuthContext.Provider
      value={{
        session,
        signUpNewUser,
        signInUser,
        signOut,
        signInWithGoogle,
        signInWithGitHub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// --- HOOK ---
export const UserAuth = () => useContext(AuthContext);
