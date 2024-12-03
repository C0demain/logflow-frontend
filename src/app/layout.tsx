import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "./context/auth";
import { Providers } from "@/app/providers";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "LogFlow",
  description: "Web Site Log Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="light">
      <body
        className={`font-sans antialiased h-full bg-slate-300 text-black min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <GoogleOAuthProvider
            clientId={
              process.env.CLIENT_ID || ""
            }
          >
            <Providers>{children}</Providers>
            <Toaster position="bottom-right" />
          </GoogleOAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
