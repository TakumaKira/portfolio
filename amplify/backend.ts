import { defineBackend } from '@aws-amplify/backend';
import { sayHello } from './functions/say-hello/resource';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  sayHello,
  auth,
  data,
});
