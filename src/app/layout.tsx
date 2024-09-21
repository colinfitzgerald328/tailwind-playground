import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Track and Field Hub",
  description: "Your ultimate source for track and field athletes, events, and records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <header className="bg-blue-600 text-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                  Track and Field Hub
                </Link>
                <nav>
                  <ul className="flex space-x-4">
                    <li>
                      <Link href="/" className="hover:text-blue-200">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/athletes" className="hover:text-blue-200">
                        Athletes
                      </Link>
                    </li>
                    <li>
                      <Link href="/events" className="hover:text-blue-200">
                        Events
                      </Link>
                    </li>
                    <li>
                      <Link href="/records" className="hover:text-blue-200">
                        Records
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <footer className="bg-gray-200">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
              © {new Date().getFullYear()} Track and Field Hub. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}