import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Chat Flow",
  description: "Chat flow builder from Bite Speed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center"/>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
