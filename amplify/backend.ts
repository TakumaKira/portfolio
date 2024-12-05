import { defineBackend } from '@aws-amplify/backend';
import { getDbData } from './functions/get-db-data/resource';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  getDbData,
  auth,
  data,
});
