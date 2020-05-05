//Dependencias
import { ApolloServer, makeExecutableSchema } from 'apollo-server'


//Models video 2
import models from './models';

//Type Definition
const typeDefs = `
    type Hello {
        message: String!
    }

    type Query {
        sayHello(name: String!): Hello        
    }
`;
//resolvers
const resolvers = {
    Query: {
        sayHello: (_, args) => {
            return {
                message: `Hello ${args.name || 'world'}`
            }
        }
    }
};

//schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//Apollo Server
const apolloServer = new ApolloServer({
    schema,
    context: {
        models
    }
});

//Running apollo-server
models.sequelize.sync({ force: true }).then(() => {
    apolloServer.listen(5000).then(({ url }) => console.log(`Running on ${url}`));
});