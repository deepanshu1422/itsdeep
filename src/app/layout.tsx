import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "itsdeep — AI + Marketing for Entrepreneurs",
    template: "%s | itsdeep",
  },
  description:
    "Practical guides on AI-powered marketing, content strategy, and growth — by Deepanshu Udhwani. Learn to build smarter campaigns, automate workflows, and grow your business with AI.",
  metadataBase: new URL("https://itsdeep.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "itsdeep — AI + Marketing for Entrepreneurs",
    description:
      "Practical guides on AI-powered marketing, content strategy, and growth — by Deepanshu Udhwani.",
    url: "https://itsdeep.io",
    siteName: "itsdeep",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@deepaboraah",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "itsdeep",
              url: "https://itsdeep.io",
              description:
                "Practical guides on AI-powered marketing, content strategy, and growth — by Deepanshu Udhwani.",
              publisher: {
                "@type": "Person",
                name: "Deepanshu Udhwani",
                url: "https://itsdeep.io/about",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://itsdeep.io/guides?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
