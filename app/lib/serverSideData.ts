import prisma from "./prismaClient"

type ConfigEntity = Awaited<ReturnType<typeof prisma.config.findMany>>[number]
type Config = {
  [key in ConfigEntity['name']]: ConfigEntity['value']
}
export type ServerSideData = {
  config: Config
}
export const initServerSideData: ServerSideData = {
  config: {},
}

export const getServerSideData = async (): Promise<ServerSideData> => {
  const configRaw = await prisma.config.findMany()
  const config = Object.fromEntries(configRaw.map(({ name, value }) => [name, value]))
  return { config }
}
