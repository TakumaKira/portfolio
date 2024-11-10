import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import localFont from "next/font/local";

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
      <body className={`${permanentMarker.variable} ${caveat.variable}`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
