import type { Schema } from "../../data/resource"
import { getServerSideData } from "../../../app/lib/serverSideData"

export const handler: Schema["getDbData"]["functionHandler"] = async (event) => {
  return await getServerSideData()
}