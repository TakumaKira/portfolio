import type { Metadata } from "next";
import StyledComponentsRegistry from './lib/registry'
import fonts from './fonts'
// import { getServerSideData } from "./lib/serverSideData";
import ServerSideDataProvider from "./contexts/ServerSideData";

import type { Schema } from "../amplify/data/resource"
import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"
import { generateClient } from "aws-amplify/api"
import './lib/ref'

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
  // const { config } = await getServerSideData()
  const config = {}
  // console.log(client)
  // const res = await client.queries.sayHello({
  //   name: "Amplify",
  // })
  const res = await client.queries.getDbData()
  console.log(res)
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
