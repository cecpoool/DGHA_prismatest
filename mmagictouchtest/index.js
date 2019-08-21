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


// // A `main` function so that we can use async/await
// async function main() {
//   // Create a new user with a new post
//   const newUser = await prisma.createUser({
//     username: 'Bob3',
//     email: 'bob@prisma.io',
//     password: "ABSOLE"
//   })
//   console.log(`Created new user: ${newUser.username} (ID: ${newUser.id}, password: ${newUser.password})`)

//   // Read all users from the database and print them to the console
//   const allUsers = await prisma.users()
//   console.log(allUsers)

//   const allPosts = await prisma.posts()
//   console.log(allPosts)
// }

// main().catch(e => console.error(e))