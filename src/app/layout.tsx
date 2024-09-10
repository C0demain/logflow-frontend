import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased bg-gradient-to-br from-slate-50 to-slate-400 h-screen text-black`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
