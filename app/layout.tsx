import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TCU Forum",
  description: "",
};

function Menu() {
  return(
    <nav className="flex w-full items-center justify-between p-2 bg-purple-900 text-white">
      <div className="text-2xl font-semibold">
        <a href="/">TCU Forum</a>
      </div>
      <div className="flex space-x-4">
        <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
        <a href="/submit" className="hover:text-orange-500 transition-colors">Submit</a>
        <a href="/about" className="hover:text-orange-500 transition-colors">About</a>
        <a href="/login" className="hover:text-orange-500 transition-colors">Login</a>
      </div>
    </nav>
  );
}

function Footer(){
  return(
    <footer className="flex w-full items-center justify-between p-4 bg-purple-900 text-white">
      <p className="text-xs">&copy; 2025 TCU Forum. All rights reserved.</p>
      <a href="https://www.ishaanbhagwat.com" className="text-xs">by Ishaan Bhagwat</a>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`font-sans ${inter.variable} h-full flex flex-col`}>
        <Menu/>
        <main className="flex-grow">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
