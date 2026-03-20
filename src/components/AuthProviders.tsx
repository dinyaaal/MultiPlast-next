"use client";

import { SessionProvider } from "next-auth/react";


export const AuthProviders = ({ children }: { children: React.ReactNode }) => {




  return (

    <SessionProvider
      refetchInterval={240}
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  )
};
