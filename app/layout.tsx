import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import fonts from './fonts'
import "./app-globals.scss";
import "./globals.css";

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
      <body className={`${fonts.permanentMarker.variable} ${fonts.caveat.variable} ${fonts.ptSerifRegular.variable} ${fonts.ptSerifBold.variable} ${fonts.ptSerifItalic.variable} ${fonts.ptSerifBoldItalic.variable}`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
