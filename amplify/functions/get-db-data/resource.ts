import { defineFunction } from '@aws-amplify/backend';

export const getDbData = defineFunction({
  name: 'get-db-data',
  layers: {
    "portfolio-prisma": "arn:aws:lambda:us-east-1:123456789012:layer:portfolio-prisma:1"
  },
})