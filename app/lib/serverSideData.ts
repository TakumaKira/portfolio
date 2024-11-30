import prisma from "./prismaClient"

type ConfigEntity = Awaited<ReturnType<typeof prisma.config.findMany>>[number]
export type Config = {
  [key in ConfigEntity['name']]: ConfigEntity['value']
}
export type ServerSideData = {
  config: Config
}
export const initServerSideData: ServerSideData = {
  config: {},
}
