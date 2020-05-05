//Dependencias
import { ApolloServer, makeExecutableSchema } from 'apollo-server'


//Models video 2
import models from './models';

//Type Definition & resolvers video 3
import resolvers from './graphql/resolves'
import typeDefs from './graphql/types'

//schema (graphql) 
const schema = makeExecutableSchema({ //Para crear un schema de graphql
    typeDefs,
    resolvers
});

//Apollo Server
const apolloServer = new ApolloServer({
    schema,
    context: { //definir el contexto en este caso sequelize
        models
    }
});

//Running apollo-server
const alter = true;
const force = false; //true fuerza a crear bd sql pero borra si tenia datos

models.sequelize.sync({ alter, force }).then(() => { //Syncroniza sequelize xon graphql para consultas a travez de apollo
    apolloServer.listen(5000).then(({ url }) => console.log(`Running on ${url}`));
});