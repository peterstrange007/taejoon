import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Taejoon — Intelligent Assistive Devices",
    template: "%s | Taejoon",
  },
  description:
    "Taejoon creates intelligent, affordable ALIF assistive devices that empower individuals to communicate, learn, and thrive. Discover ALIF Core, Voice, Vision, and Solar editions.",
  keywords: [
    "assistive technology",
    "ALIF device",
    "Taejoon",
    "communication aid",
    "accessibility",
    "smart assistive device",
  ],
  authors: [{ name: "Taejoon" }],
  creator: "Taejoon",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Taejoon",
    title: "Taejoon — Intelligent Assistive Devices",
    description:
      "Redefining assistive technology with intelligent, affordable devices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taejoon — Intelligent Assistive Devices",
    description:
      "Redefining assistive technology with intelligent, affordable devices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fafafa",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: { primary: "#ff6b00", secondary: "#fff" },
              },
            }}
          />
          <Navbar />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
