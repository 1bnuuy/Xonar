import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

//https://docs.fontawesome.com/web/use-with/react/use-with - large icon hydration errors
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import UIProvider from "@/comp/assets/UI";
import PlayerProvider from "@/comp/music/handler";
import Music from "@/comp/music/main";
import Wrapper from "@/comp/wrapper/main";
import Sidebar from "@/comp/sidebar/main";
import DataProvider from "@/comp/logic/get";

const Font = Comfortaa({
  variable: "--CustomFont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XONAR",
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
        className={`${Font.variable} bg-primary flex items-start antialiased`}
      >
        <DataProvider>
          <UIProvider>
            <PlayerProvider>
              <Music />
              <Sidebar />

              <Wrapper>{children}</Wrapper>
            </PlayerProvider>
          </UIProvider>
        </DataProvider>
      </body>
    </html>
  );
}
