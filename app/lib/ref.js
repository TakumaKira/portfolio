import schema from '../prisma/schema.prisma'
import x from '../node_modules/.prisma/client/libquery_engine-linux-openssl-1.0.x.so.node'

if (process.env.NODE_ENV !== 'production') {
  console.debug(schema, x)
}
