import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundMusic } from "@/components/ui/background-music";
import { SplashScreen } from "@/components/ui/splash-screen";
import { SplashProvider } from "@/components/ui/splash-context";
import { SideNav } from "@/components/ui/side-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bitadev portfolio",
  description: "Portfolio website with love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-white text-black">
        <SplashProvider>
          <SplashScreen>
            <SideNav />
            <BackgroundMusic />
            {children}
          </SplashScreen>
        </SplashProvider>
      </body>
    </html>
  );
}
