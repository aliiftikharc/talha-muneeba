import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Walima Invitation | Talha & Muneeba",
  description: "Walima invitation for Talha Shahid and Muneeba Gulzar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
