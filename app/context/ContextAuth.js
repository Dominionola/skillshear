"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({ session: null, setSession: () => {} });

export function ContextAuthProvider({ children }) {
  const [session, setSession] = useState();

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
