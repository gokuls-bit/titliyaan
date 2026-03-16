import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arushi | A Moment of Calm",
  description: "A beautiful animated experience dedicated to Arushi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-black text-white`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
