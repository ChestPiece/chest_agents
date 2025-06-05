import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import { LoginProvider } from "@/context/login-context";
import ModalContainer from "@/components/modal-container";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/lib/theme-script";
import { SupabaseProvider } from "@/context/supabase-context";
import PageTransition from "@/components/layout/page-transition";
import { ClientScript } from "./client-script";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Chest Piece AI Agents",
  description: "AI agents that automate tasks and transform businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SupabaseProvider>
            <LoginProvider>
              <PageTransition>{children}</PageTransition>
              <ModalContainer />
              <ClientScript />
            </LoginProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
