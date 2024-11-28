import { defineFunction } from '@aws-amplify/backend';

export const getDbData = defineFunction({
  name: 'get-db-data',
  entry: './handler.ts'
})