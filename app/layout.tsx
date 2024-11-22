import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import fonts from './fonts'

const fontClasses = Object.values(fonts).map(({ variable }) => variable).join(' ');

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
      <body className={fontClasses}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
