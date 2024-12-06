'use client'

import React from "react";

import { PrismaClient } from 'portfolio-prisma'

type ConfigEntity = Awaited<ReturnType<PrismaClient['config']['findMany']>>[number]
export type Config = {
  [key in ConfigEntity['name']]: ConfigEntity['value']
}
export type ServerSideData = {
  config: Config
}
const initServerSideData: ServerSideData = {
  config: {},
}

const ServerSideDataContext = React.createContext<ServerSideData>(initServerSideData)

export default function ServerSideDataProvider({
  children,
  config,
}: {
  children: React.ReactNode,
  config: ServerSideData['config'],
}) {
  return (
    <ServerSideDataContext.Provider value={{ config }}>
      {children}
    </ServerSideDataContext.Provider>
  )
}

export function useServerSideData() {
  return React.useContext(ServerSideDataContext)
}