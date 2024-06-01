import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="bg-yellow dark:bg-gray-dark text-black dark:text-white relative">
          <Toaster />
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
