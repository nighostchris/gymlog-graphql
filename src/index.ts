import { ApolloServer } from 'apollo-server';
import typeDefs from './types';
import resolvers from './resolvers';
import models from './models';
import connectDatabase from './config/database';

connectDatabase();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}.`);
});
