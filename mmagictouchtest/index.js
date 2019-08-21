const { prisma } = require('./generated/prisma-client')
const {GraphQLServer} = require('graphql-yoga')

const resolvers = {
  Query:{
    createdUsers(root, args,context){
      return context.prisma.users
    }
  },
  Mutation:{
    createUser(root, args,context){
      return context.prisma.createUser({
        username: args.username,
        password: args.password,
        email: args.email })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})
server.start(() => console.log('Server is running on http://localhost:4000'))


