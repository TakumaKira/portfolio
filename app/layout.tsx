import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import localFont from "next/font/local";
import "./globals.scss";

const permanentMarker = localFont({
  src: "./fonts/PermanentMarker-Regular.ttf",
  variable: "--font-permanent-marker",
  weight: "400",
});
const caveat = localFont({
  src: "./fonts/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
  weight: "400 500 600 700",
});
const ptSerifRegular = localFont({
  src: "./fonts/PTSerif-Regular.ttf",
  variable: "--font-pt-serif",
  weight: "400",
});
const ptSerifBold = localFont({
  src: "./fonts/PTSerif-Bold.ttf",
  variable: "--font-pt-serif-bold",
  weight: "700",
});
const ptSerifItalic = localFont({
  src: "./fonts/PTSerif-Italic.ttf",
  variable: "--font-pt-serif-italic",
  weight: "400",
});
const ptSerifBoldItalic = localFont({
  src: "./fonts/PTSerif-BoldItalic.ttf",
  variable: "--font-pt-serif-bold-italic",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Takuma's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${permanentMarker.variable} ${caveat.variable} ${ptSerifRegular.variable} ${ptSerifBold.variable} ${ptSerifItalic.variable} ${ptSerifBoldItalic.variable}`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
