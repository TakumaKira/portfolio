import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import fonts from './fonts'
import ServerSideDataProvider, { Config } from "./contexts/ServerSideData";

import type { Schema } from "../amplify/data/resource"
import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"
import { generateClient } from "aws-amplify/api"

Amplify.configure(outputs)

const client = generateClient<Schema>()

const fontClasses = Object.values(fonts).map(({ variable }) => variable).join(' ');

export const metadata: Metadata = {
  title: "Takuma's portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await client.queries.getDbData()
  const config = data !== null && typeof data === 'string' ? JSON.parse(data).config as Config : {}
  console.log('config on layout', config)
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
