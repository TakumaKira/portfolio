import type { Schema } from "@/amplify/data/resource"
import { Amplify } from "aws-amplify"
import outputs from "@/amplify_outputs.json"
import { generateClient } from "aws-amplify/api"
import { ServerSideData } from "@/app/contexts/ServerSideData"

Amplify.configure(outputs)

const client = generateClient<Schema>()

export async function getData(): Promise<ServerSideData> {
  const { data } = await client.queries.getDbData()
  return data !== null && typeof data === 'string' ? JSON.parse(data) : { config: {} }
}
