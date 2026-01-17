import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/hooks/useProgress";
import { LanguageProvider } from "@/hooks/useLanguage";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#6366F1",
};

export const metadata: Metadata = {
  title: "LumiWorld STEAM",
  description: "Pre-K Educational PWA for 4-year-olds",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LumiWorld",
  },
  icons: {
    apple: [
      { url: "/assets/brand/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { ThemeApplier } from "@/components/ui/ThemeApplier";
import { AppInitializer } from "@/components/ui/AppInitializer";

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
            <ThemeApplier />
            <AppInitializer>
              {children}
            </AppInitializer>
          </LanguageProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
