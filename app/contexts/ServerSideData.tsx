'use client'

import React from "react";
import { Config } from "../lib/serverSideData";

const ServerSideDataContext = React.createContext<{
  config: Config,
}>({
  config: '',
})

export default function ServerSideDataProvider({
  children,
  config,
}: {
  children: React.ReactNode,
  config: Config,
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