import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import fonts from './fonts'
import { Config, getServerSideData } from "./lib/serverSideData";
import ServerSideDataProvider from "./contexts/ServerSideData";

const fontClasses = Object.values(fonts).map(({ variable }) => variable).join(' ');

export const metadata: Metadata = {
  title: "Takuma's portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { config } = await getServerSideData<{ config: Config }>()
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
