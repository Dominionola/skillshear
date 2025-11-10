"use client";
import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext({ session: null, setSession: () => {} });

export function ContextAuthProvider({ children }) {
  const [session, setSession] = useState();



  // Sign up
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('there was a problem signing up:', error);
      return { success: false, error };
    }
    return { success: true, data };
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription?.unsubscribe();
  }, []);

  // Sign Out
  const Signout = () => {
    const {error} = supabase
  }
  
  return (
    <AuthContext.Provider value={{ session, signUpNewUser }}>{children}</AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
