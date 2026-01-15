import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/hooks/useProgress";
import { LanguageProvider } from "@/hooks/useLanguage";

export const metadata: Metadata = {
  title: "LumiWorld STEAM",
  description: "Pre-K Educational PWA for 4-year-olds",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <AnimatedBackground />
        <ProgressProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
