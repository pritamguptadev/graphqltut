import {ApolloServer} from "@apollo/server";
import { prismaClient } from "../DB/lib/db";
import { User } from "../user";
import { Tweet } from "../todo";



// console.log(User);


export async function createApolloGraphqlServer(){
    const gqlServer=new ApolloServer({
        typeDefs:`
            ${User.typeDefs}
            ${Tweet.types}
           
           
            
        type Query {
           ${User.Query}
           ${Tweet.queries}
         
           
        }
       type Mutation {
            ${User.Mutation}
            ${Tweet.muatations}
        
        }`,
        resolvers:{
            Query:{
                ...User.resolvers.Query,
                ...Tweet.resolvers.queries
           
            },
            Mutation:{
                ...User.resolvers.Mutation,
                ...Tweet.resolvers.mutations
           
                },
                ...User.resolvers.extraResolvers,
                ...Tweet.resolvers.extraResolvers
            }
        }
    )
    await gqlServer.start();
    return gqlServer
}

