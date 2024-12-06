import { type ClientSchema, a, defineData } from "@aws-amplify/backend"
import { getDbData } from "../functions/get-db-data/resource"

const schema = a.schema({
  getDbData: a
    .query()
    .returns(a.json())
    .authorization((allow) => [allow.guest()])
    .handler(a.handler.function(getDbData)),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
})