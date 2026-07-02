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
    default: "Taejoon — Intelligent Assistive Devices for Everyone",
    template: "%s | Taejoon",
  },
  description:
    "Taejoon's ALIF devices bring intelligent, affordable assistive communication to every individual. Explore our premium smart devices for accessibility and empowerment.",
  keywords: [
    "assistive technology",
    "ALIF device",
    "Taejoon",
    "communication aid",
    "accessibility",
    "smart assistive device",
    "speech assistance",
    "inclusive technology",
    "disability support",
  ],
  authors: [{ name: "Taejoon Inc.", url: "https://taejoon.com" }],
  creator: "Taejoon",
  publisher: "Taejoon Inc.",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Taejoon",
    title: "Taejoon — Intelligent Assistive Devices for Everyone",
    description:
      "Every voice deserves to be heard. Discover ALIF — affordable, intelligent assistive devices.",
    url: "https://taejoon.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taejoon — Intelligent Assistive Devices",
    description:
      "Every voice deserves to be heard. Discover ALIF — affordable, intelligent assistive devices.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification",
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
