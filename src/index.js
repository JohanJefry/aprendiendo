//Dependencias
import { ApolloServer, makeExecutableSchema } from 'apollo-server'


//Models video 2
import models from './models';

//Type Definition & resolvers
import resolvers from './graphql/resolves'
import typeDefs from './graphql/types'

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
const alter = true;
const force = false; //fuerza a crear bd sql pero borra si tenia datos

models.sequelize.sync({ alter, force }).then(() => {
    apolloServer.listen(5000).then(({ url }) => console.log(`Running on ${url}`));
});