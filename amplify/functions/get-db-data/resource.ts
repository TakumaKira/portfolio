import { defineFunction } from '@aws-amplify/backend';

export const getDbData = defineFunction({
  name: 'get-db-data',
  layers: {
    "portfolio-prisma": process.env.PRISMA_LAMBDA_LAYER_ARN
  },
})