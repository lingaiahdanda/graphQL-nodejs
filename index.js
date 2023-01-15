const {ApolloServer} = require('apollo-server')


const server = new ApolloServer({typeDefs, resolvers})


server.listen().then(({url})=>{
    console.log(`Your api is running.....:${url}`); 
})