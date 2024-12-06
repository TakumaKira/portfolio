import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import fonts from './fonts'
import ServerSideDataProvider from "./contexts/ServerSideData";
import { getData } from "./lib/backend"

const fontClasses = Object.values(fonts).map(({ variable }) => variable).join(' ');

export const metadata: Metadata = {
  title: "Takuma's portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { config } = await getData()
  return (
    <html lang="en">
      <body className={fontClasses}>
        <ServerSideDataProvider config={config}>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </ServerSideDataProvider>
      </body>
    </html>
  );
}
