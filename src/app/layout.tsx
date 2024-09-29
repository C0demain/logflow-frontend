import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Log Flow",
  description: "Web Site Log Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`font-sans antialiased h-full bg-gradient-to-br from-slate-100 to-slate-300 text-black min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
