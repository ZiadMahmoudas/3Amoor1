import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/components/ui/toaster";
import { ReactLenis } from "lenis/react";
import Providers from "./providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "هوّك | Hook Agency - أفضل وكالة تسويق إلكتروني",
  description:
    "هوّك Hook Agency أفضل وكالة تسويق إلكتروني في مصر والوطن العربي. نقدم خدمات التسويق الرقمي، تصميم المتاجر الإلكترونية، إدارة الحملات الإعلانية، تحسين محركات البحث SEO، تصميم الهوية البصرية، وإدارة السوشيال ميديا. اصطد عملائك مع هوّك!",
  keywords: [
    "هوك",
    "Hook Agency",
    "تسويق إلكتروني",
    "تسويق رقمي",
    "تصميم متاجر",
    "SEO",
    "إعلانات",
    "سوشيال ميديا",
    "هوية بصرية",
    "تحسين محركات البحث",
    "تجارة إلكترونية",
    "مصر",
    "وكالة تسويق",
  ],
  authors: [{ name: "Hook Agency - هوّك" }],
  icons: {
    icon: "/hook-logo.png",
  },
  openGraph: {
    title: "هوّك | Hook Agency - اصطد عملائك",
    description:
      "أفضل وكالة تسويق إلكتروني في مصر والوطن العربي. خدمات متكاملة لنمو مشروعك الرقمي.",
    url: "https://hookagency.com",
    siteName: "هوّك | Hook Agency",
    type: "website",
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "هوّك | Hook Agency - اصطد عملائك",
    description:
      "أفضل وكالة تسويق إلكتروني. خدمات متكاملة لنمو مشروعك الرقمي.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "هوّك - Hook Agency",
                  url: "https://hookagency.com",
                  logo: "https://hookagency.com/hook-logo.png",
                  description:
                    "أفضل وكالة تسويق إلكتروني في مصر والوطن العربي",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "EG",
                    addressLocality: "القاهرة",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["Arabic", "English"],
                  },
                  sameAs: [
                    "https://facebook.com/hookagency",
                    "https://instagram.com/hookagency",
                    "https://twitter.com/hookagency",
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "هوّك - Hook Agency",
                  url: "https://hookagency.com",
                  inLanguage: "ar",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://hookagency.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "'Cairo', 'Geist', sans-serif" }}
        suppressHydrationWarning
      >
           <Providers>{children}</Providers>

        <Toaster />
      </body>
    </html>
  );
}
