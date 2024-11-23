'use client'

import React from "react";
import { ServerSideData, initServerSideData } from "../lib/serverSideData"

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