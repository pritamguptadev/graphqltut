import {ApolloServer} from "@apollo/server";
import { prismaClient } from "../DB/lib/db";
import { User } from "../user";


// console.log(User);


export async function createApolloGraphqlServer(){
    const gqlServer=new ApolloServer({
        typeDefs:`
            ${User.typeDefs}
        type Query {
           ${User.Query}
        }
       type Mutation {
            ${User.Mutation}
        }`,
        resolvers:{
            Query:{
                ...User.resolvers.Query
            },
            Mutation:{
                ...User.resolvers.Mutation
                }
            }
        }
    )
    await gqlServer.start();
    return gqlServer
}

