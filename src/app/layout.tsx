import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";

const Font = Afacad({
  variable: "--CustomFont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strøm",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Font.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
