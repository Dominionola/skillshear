"use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext(null);

export function ContextAuthProvider({ children }) {
  const [session, setSession] = useState(undefined);

  // --- SIGN UP ---
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
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
  const signInWithGoogle = async () => {
    const redirectTo = `${window.location.origin}/auth/callback`;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// --- HOOK ---
export const UserAuth = () => useContext(AuthContext);
