import type { Schema } from "../../data/resource"
import { PrismaClient } from "portfolio-prisma"

const prisma = new PrismaClient()

export const handler: Schema["getDbData"]["functionHandler"] = async (event) => {
  const configRaw = await prisma.config.findMany()
  const config = Object.fromEntries(configRaw.map(({ name, value }) => [name, value]))
  return { config }
}