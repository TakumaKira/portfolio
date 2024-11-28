import { type ClientSchema, a, defineData } from "@aws-amplify/backend"
import { sayHello } from "../functions/say-hello/resource"
import { getDbData } from "../functions/get-db-data/resource"

const schema = a.schema({
  sayHello: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .authorization((allow) => [allow.guest()])
    .handler(a.handler.function(sayHello)),
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