import { defineFunction } from '@aws-amplify/backend';

const prismaLambdaLayerArn = process.env.PRISMA_LAMBDA_LAYER_ARN
if (!prismaLambdaLayerArn) {
  throw new Error("PRISMA_LAMBDA_LAYER_ARN is not set")
}

export const getDbData = defineFunction({
  name: 'get-db-data',
  layers: {
    "portfolio-prisma": prismaLambdaLayerArn
  },
})