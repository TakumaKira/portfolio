import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import fonts from './fonts'
import ServerSideDataProvider from "./contexts/ServerSideData";

import type { Schema } from "../amplify/data/resource"
import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"
import { generateClient } from "aws-amplify/api"
import { Config } from "./lib/serverSideData"

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
  return (
    <html lang="en">
      <body className={fontClasses}>
        <ServerSideDataProvider config={data !== null && typeof data === 'object' && 'config' in data ? data.config as Config : {}}>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </ServerSideDataProvider>
      </body>
    </html>
  );
}
